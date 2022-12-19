<?php

namespace App\Http\Controllers;

use App\Http\Resources\FormCollection;
use App\Http\Resources\FormResource;
use App\Models\form;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FormsController extends Controller
{
    public function index()
    {
        $forms = FormResource::collection(form::latest()->get())->toArray(request());
        return inertia('Panel/Forms/Index', [
            'forms' => $forms,
        ]);
    }

    public function leads(Request $request, $uuid)
    {
        $form = form::where('uuid', $uuid)->firstOrFail();

        $leads = $form->leads()->latest()->with('meta')->paginate(10)
            ->withQueryString();

        $filteredColumns = $form->columns();
        return inertia('Panel/Forms/Leads', [
            'leads' => $leads,
            'form' => $form,
            'filteredColumns' => $filteredColumns,
        ]);
    }

    public function create()
    {
        $form = form::factory()->create([
            'title' => 'Form ',
            'user_id' => auth()->id(),
        ]);
        foreach ($form->settings() as $key => $value) {
            $form_metas[] = [
                'form_id' => $form->id,
                'meta_key' => $key,
                'value' => json_encode($value),
            ];
        }
        $form->metas()->createMany($form_metas);
        return redirect()->route('panel.forms.edit', $form->uuid);
    }

    public function store(Request $request)
    {
    }

    public function lead(Request $request, $slug)
    {

        $validated = $request->validate([
            'fields' => 'required|array',
        ]);

        $form = form::where('slug', $slug)->first();
        $fields = $form->fields()['fields'];
        if (count($fields) != count($validated['fields'])) {
            return back()->withErrors(['fields' => 'Invalid fields']);
        }
        $submisson = $form->leads()->create([
            'response' => json_encode($validated['fields']),
        ]);
        $submisson_metas = [];
        $redirectTo = false;
        foreach ($validated['fields'] as $field) {
            //if field name is whatsapp rotator
            if ($field['name'] === 'whatsapp_rotator') {
                //get random number from rotator
                $rotator = $form->rotators();
                $redirectTo = 'https://wa.me/' . $rotator['number'] . '?text=' . urlencode($rotator['text']);
                $submisson_metas[] = [
                    'submission_id' => $submisson->id,
                    'meta_key' => 'whatsapp_rotator',
                    'value' => $rotator['number'],
                    'user_id' => auth()->id() ?? null,
                ];
            } else {
                $submisson_metas[] = [
                    'submission_id' => $submisson->id,
                    'meta_key' => $field['name'],
                    'value' => $field['value'] ?? null,
                    'user_id' => auth()->id() ?? null,
                ];
            }

        }
        $submisson->meta()->createMany($submisson_metas);

        if ($redirectTo) {
            return Inertia::location($redirectTo);
        }
        return back()->with('success', 'Form submitted successfully');
    }

    public function show($slug)
    {
        $form = form::where('slug', $slug)->firstOrFail();
        $fields = $form->fields();
        $metas = $form->metas();
        $settings = $metas->where('meta_key', 'formSettings')->first();
        $form->setFormMeta('total_views', 1, 'increment');
        return inertia('Web/Forms/ViewForm', [
            'form' => $form,
            'fields' => $fields['fields'],
            'submitButton' => $fields['submitButton'],
            'settings' => json_decode($settings->value, true),
        ]);
    }

    public function edit(form $form)
    {
        $fields = $form->fields();
        $responseFields = $form->response_fields();
        return inertia('Panel/Forms/EditForm', [
            'form' => $form,
            'fields' => $fields['fields'],
            'responseFields' => $responseFields,
            'submitButton' => $fields['submitButton'],
            'formatFields' => $form->getFormatFields(),
        ]);
    }

    public function update(Request $request, form $form)
    {
        $validated = $request->validate([
            'fields' => 'required|array',
            'submitButton' => 'required|array',
        ]);
        $rotator = collect($validated['fields'])->filter(function ($field, $key) {
            return $field['element'] === 'whatsapp_rotator';
        })->first();
        if ($rotator) {
            $form->setFormMeta('whatsapp_rotator', json_encode($rotator));
        }
        $form->form_fields = json_encode([
            'fields' => $validated['fields'],
            'submitButton' => $validated['submitButton'],
        ]);
        $form->save();
        return redirect()->route('panel.forms.edit', $form->uuid)->with('success', 'Form Updated Successfully');
    }

    public function destroy(form $form)
    {
    }

    public function upload(Request $request)
    {

        $request->validate([
            'files' => 'required',
        ]);
        $media = auth()->user()->addMedia($request->file('files'))->toMediaCollection('files');
        return response()->json([
            'message' => 'File uploaded successfully.',
            'url' => $media->getUrl()
        ]);
    }
}
