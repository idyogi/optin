<?php

namespace App\Http\Controllers;

use App\Exports\LeadExport;
use App\Http\Requests\FormLeadRequest;
use App\Http\Resources\FormCollection;
use App\Http\Resources\FormResource;
use App\Models\form;
use App\Models\Lists;
use App\Models\submission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

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

        $filtered = $form->getAllLeads($request);
        $paginator = $filtered->paginate(20)
            ->withQueryString();
        $leads = $paginator->getCollection()->reject(function ($lead) {
            return !json_decode($lead->response);
        });

        $data = $leads->map(function ($lead) {
            $meta = $lead->meta->mapWithKeys(function ($item) {
                //if met_key is phone then add +
                if ($item->meta_key === 'phone') {
                     return ['phone' => '+'.$item->value];
                }
                return [$item->meta_key => $item->value];
            })->reject(function ($value) {
                return $value === null;
            })->toArray();
            //add created_at to meta
            $meta['created_at'] = date('Y-m-d H:i:s', strtotime($lead->created_at));
            return $meta;
        });
        $filteredColumns = $form->columns();
        $dataFields = $data->map(function ($item) {
            return collect($item)->map(function ($value,) {
                return $value;
            })->toArray();
        });
        if($request->has('export')){
            return Excel::download(new LeadExport($filteredColumns,$dataFields), $form->slug.'-leads.xlsx');
        }
        return inertia('Panel/Forms/Leads', [
            'leads' => $dataFields,
            'form' => $form,
            'filteredColumns' => $filteredColumns,
            'filtered' => $paginator,
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

    public function frontendSave($request, $form)
    {
        $list = $form->list;

        if ($form->list == null) {
            // Create a new list with the form name
            $list = Lists::create([
                'name' => $form->title,
                'user_id' => $form->user_id,
            ]);
        }
        $form->list_id = $list->id;
        $form->save();


        try {
            // Create contact
            list($validator, $contact) = $list->addContact($request, Lists::SOURCE_EMBEDDED_FORM);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage()
            ], 400);
        }

        // if fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        return response()->json([
            'message' => 'OK',
        ]);
    }

    public function lead(FormLeadRequest $request, $slug)
    {

        $validated = $request->validated();

        $form = form::where('slug', $slug)->first();
        $fields = $form->fields()['fields'];
        if (count($fields) != count($validated['fields'])) {
            return back()->withErrors(['fields' => 'Invalid fields']);
        }
        foreach ($fields as $key => $field) {
            if (isset($field['required']) && $field['required'] == true && !$validated['fields'][$key]['value']) {
                return back()->withErrors(['fields' => 'Silahkan isi form yang tersedia']);
            }
        }
        $data['response'] = json_encode($validated['fields']);
        if (array_key_exists('reference', $validated)) {
            $data['ref'] = (int)$validated['reference'];
        }
        DB::beginTransaction();
        $submisson = $form->leads()->create($data);
        Cookie::queue('Selviform_submitted_cks', $submisson->id, 1);//only 1 minute
        $submisson_metas = [];
        $redirectTo = false;
        foreach ($validated['fields'] as $field) {
            if ($field['name'] === 'phone') {
                //if not number, then return error
                if (!is_numeric($field['value'])) {
                    DB::rollBack();
                    return back()->withErrors(['fields' => 'Nomor telepon tidak valid']);
                }
                //if value is "08" then add 62
                $phone = $field['value'];
                if (substr($phone, 0, 2) === '08') {
                    $phone = '62' . substr($phone, 1);
                }
                // if value is "8" then add 62
                if (substr($phone, 0, 1) === '8') {
                    $phone = '62' . $phone;
                }
                //if not start with 0 or 8 then return error
                if (!preg_match('/^0|8/', $field['value'])) {
                    DB::rollBack();
                    return back()->withErrors(['fields' => 'Nomor telepon tidak valid']);
                }
                //if phone length is not between 12-15 then return error
                if (strlen($phone) < 11 || strlen($phone) > 15) {
                    DB::rollBack();
                    return back()->withErrors(['fields' => 'Nomor telepon tidak valid']);
                }
                $field['value'] = $phone;


            }
            if ($field['name'] === 'whatsapp_rotator') {
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

        $addToList = $this->frontendSave($validated['fields'], $form);
        DB::commit();
        if ($redirectTo) {
            return back()->with('success', ['submission_id' => $submisson->id, 'redirectTo' => $redirectTo]);

        }
        return back()->with('success', ['submission_id' => $submisson->id]);


    }

    public function show(Request $request, $slug)
    {
        $form = form::where('slug', $slug)->firstOrFail();
        if ($request->has('ref')) {
            $reference = ($request->ref);
        }
        $fields = $form->fields();
        $responseFields = $form->response_fields();

        $metas = $form->metas();
        $settings = json_decode(($metas->where('meta_key', 'formSettings')->first())->value, true);
        if (!array_key_exists('enableCookies', $settings)) {
            $settings['enableCookies'] = true;
        }
        $form->setFormMeta('total_views', 1, 'increment');
        $form->setFormMeta('total_views_' . date('Y-m-d'), 1, 'increment');

        if (Cookie::has('Selviform_submitted_cks') && $settings['enableCookies']) {
            $submission_id = Cookie::get('Selviform_submitted_cks');
            $submission = submission::where('id', $submission_id)->first();
            if (!$submission) {
                $submission = false;
            } else {
                if ($form->id != $submission->form_id) {
                    $submission = false;
                } else {
                    $submission = $submission_id;
                }

            }


        }
        return inertia('Web/Forms/ViewForm', [
            'form' => $form,
            'fields' => $fields['fields'],
            'responseFields' => $responseFields,
            'submitButton' => $fields['submitButton'],
            'settings' => $settings,
            'reference' => $reference ?? null,
            'submission' => $submission ?? false,
        ]);
    }

    public function edit(form $form)
    {
        $fields = $form->fields();
        $responseFields = $form->response_fields();
        $metas = $form->metas();
        $settings = json_decode(($metas->where('meta_key', 'formSettings')->first())->value, true);
        if (!array_key_exists('enableCookies', $settings)) {
            $settings['enableCookies'] = true;
        }
        return inertia('Panel/Forms/EditForm', [
            'form' => $form,
            'fields' => $fields['fields'],
            'settings' => $settings,
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
            'response' => 'required|array',
            'settings' => 'required|array',
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
        $form->response_fields = json_encode($validated['response']);
        $form->title = $validated['settings']['title'];
        $form->slug = $validated['settings']['slug'];
        $form->setFormMeta('formSettings', json_encode($validated['settings']['settings']));
        if ($form->save()) {
//            dd($form);
            return redirect()->route('panel.forms.edit', $form->uuid)->with('success', 'Form Updated Successfully');
        }
        return back()->withErrors(['error' => 'Something went wrong']);
    }

    public function changeSlug(Request $request, form $form)
    {
        $validated = request()->validate([
            'slug' => 'required|string',
        ]);
        $form->slug = $validated['slug'];
        //check slug is unique, if not return error message
        if ($form->save()) {
            return back()->with('success', 'Slug Updated Successfully');
        }
        return back()->withErrors(['error' => 'Slug already exists']);
    }

    public function destroy(form $form)
    {
        if ($form->delete()) {
            return redirect()->route('panel.forms.index')->with('success', 'Form Deleted Successfully');
        }
        return redirect()->route('panel.forms.index')->withErrors(['error' => 'Something went wrong']);
    }

    public function delete($uuid)
    {
        $form = form::where('uuid', $uuid)->firstOrFail();
        if ($form->user_id != auth()->id()) {
            die('Unauthorized');
        }
        if ($form->delete()) {
            return redirect()->route('panel.forms.index')->with('success', 'Form Deleted Successfully');
        }
        return redirect()->route('panel.forms.index')->withErrors(['error' => 'Something went wrong']);
    }

    public function duplicate($uuid)
    {
        $form = form::where('uuid', $uuid)->firstOrFail();
        if ($form->user_id != auth()->id()) {
            die('Unauthorized');
        }
        //duplicate form and metas
        $newForm = $form->replicate();
        $newForm->uuid = Str::uuid();
        $newForm->title = $newForm->title . ' (copy)';
        $newForm->slug = $newForm->slug();
        $newForm->save();
        $metas = $form->metas;

        foreach ($metas as $meta) {
            $newMeta = $meta->replicate();
            //if meta key is total_views or total_leads, set it to 0
            if ($newMeta->meta_key == 'total_views' || $newMeta->meta_key == 'total_leads') {
                $newMeta->value = 0;
            }
            $newMeta->form_id = $newForm->id;
            $newMeta->save();
        }

        return redirect()->route('panel.forms.edit', $newForm->uuid)->with('success', 'Form Duplicated Successfully');
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

    public function export(Request $request, form $form)
    {
        $leads = $form->getAllLeads($request)->get();
        return Excel::download($leads, $form->slug.'-all-leads.xlsx');
    }
}
