<?php

namespace App\Http\Controllers;

use App\Http\Resources\ContactCollection;
use App\Imports\ContactsImport;
use App\Models\Lists;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class ListsController extends Controller
{
    public function index()
    {
        $lists = Lists::latest()->with('contacts')->get();
        return inertia('Panel/Lists/Lists', [
            'lists' => $lists,
        ]);
    }

    public function create()
    {
        //create list and redirect to edit page
        $list = new Lists();
        $list->name = 'New List';
        $list->user_id = auth()->id();
        $list->save();
        return redirect()->route('panel.lists.edit', $list->uuid);
    }

    public function store(Request $request)
    {
    }

    public function show($id)
    {
    }

    public function edit(Request $request, Lists $list)
    {
        $contacts = $list->contacts()->latest()
            ->when(request('search'), function ($query) {
                $query->where(DB::raw('lower(name)'), 'like', '%' . strtolower(request('search')) . '%');
            })
            ->when($request['startDate'], function ($query) use ($request) {
                $query->where('created_at', '>=', $request['startDate'] . ' 00:00:00');
            })
            ->when($request['endDate'], function ($query) use ($request) {
                $query->where('created_at', '<=', $request['endDate'] . ' 23:59:59');
            })
            ->paginate(100)->withQueryString();
        $collection = (new ContactCollection($contacts))->jsonSerialize();
        //all forms pluck title and id
        $forms = auth()->user()->forms()->get();
        return inertia('Panel/Lists/ManageLists', [
            'list' => $list,
            'contacts' => $collection,
            'forms' => $forms,
        ]);
    }

    public function update(Request $request, Lists $list)
    {
        $validated = $request->validate([
            'name' => 'required',
        ]);
        $list->update($validated);
        return redirect()->route('panel.lists.index');
    }

    public function destroy($id)
    {
    }

    //import from form leads
    public function import(Request $request)
    {
        $validated = $request->validate([
            'lead_form_id' => 'required',
            'list_id' => 'required',
        ]);
        $form = \App\Models\Form::where('uuid', $validated['lead_form_id'])->first();
        $list = Lists::where('uuid', $validated['list_id'])->first();
        //leads collection
        $leads = $form->getLeads();
        foreach ($leads as $lead) {
            $meta = $lead->meta;
            //if phone is not in meta array then skip
            if (!isset($meta['phone'])) {
                continue;
            }
            //if phone is empty or null then skip
            if (empty($meta['phone'])) {
                continue;
            }
            //check if contact exists
            $contact = \App\Models\Contact::where('phone', $meta['phone'])->first();
            if (!$contact) {
                $input_text = isset($meta['input_text']) ? $meta['input_text'] : '';
                $name = isset($meta['name']) ? $meta['name'] : $input_text;
                $email = isset($meta['email']) ? $meta['email'] : '';
                $contact = \App\Models\Contact::create([
                    'phone' => $meta['phone'],
                    'name' => $name,
                    'email' => $email,
                ]);
            }
            //dd($list->contacts, $contact->id, $list->id);
            //check if contact is already in list
            $contactInList = $list->contacts()->where('contact_id', $contact->id)->first();
            if (!$contactInList) {
                $list->contacts()->attach($contact->id);
            }
        }

        return redirect()->route('panel.lists.edit', $list->uuid);
    }

    public function importFile(Request $request, Lists $list)
    {
        $request->validate([
            'file' => 'required|max:50000|mimes:xlsx'
        ]);
        Excel::import(new ContactsImport($list), request()->file('file'));

        return redirect()->back()->with('success', 'All good!');
    }
}