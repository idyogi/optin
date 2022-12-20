<?php

namespace App\Http\Controllers;

use App\Models\submission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubmissionsController extends Controller
{
    public function index()
    {

    }

    public function create()
    {
    }

    public function store(Request $request)
    {
    }

    public function show(submission $submission)
    {
    }

    public function edit(submission $submission)
    {
    }

    public function update(Request $request, submission $submission)
    {
    }

    public function destroy(submission $submission)
    {
    }

    public function whatsappRotator(Request $request, $submissionId)
    {
        $submission = submission::where('id', $submissionId)->firstOrFail();
        $form = $submission->form;
        $rotator = $form->rotators();
        $redirectTo = 'https://wa.me/' . $rotator['number'] . '?text=' . urlencode($rotator['text']);
        $submisson_metas[] = [
            'submission_id' => $submission->id,
            'meta_key' => 'whatsapp_rotator',
            'value' => $rotator['number'],
            'user_id' => auth()->id() ?? null,
        ];
        $submission->meta()->createMany($submisson_metas);

        return Inertia::location($redirectTo);

//        return back()->with('success', ['submission_id' => $submission->id, 'redirectTo' => $redirectTo]);
    }
}
