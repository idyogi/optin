<?php

namespace App\Http\Controllers;

use App\Http\Resources\CampaignCollection;
use App\Http\Resources\CampaignResource;
use App\Models\Campaign;
use App\Models\Lists;
use App\Models\SendingServer;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class CampaignsController extends Controller
{
    public function index()
    {
        $list_count = Lists::count();
        $sender_count = SendingServer::count();
        $campaigns = Campaign::latest()->with('lists')
            ->when(request('search'), function ($query) {
                $query->where(DB::raw('lower(name)'), 'like', '%' . strtolower(request('search')) . '%');
            })
            ->paginate(10)->withQueryString();
        $campaignsCollection = (new CampaignCollection($campaigns))->jsonSerialize();
        return inertia('Panel/Campaigns/Campaigns', [
            'campaigns' => $campaignsCollection,
            'list_count' => $list_count,
            'sender_count' => $sender_count,
            'campaignsCollection' => $campaignsCollection,
        ]);
    }

    public function create()
    {
        //create campaign and redirect to edit page
        $campaign = new Campaign();
        $campaign->name = 'New Campaign';
        $campaign->text = 'Hai, live Facebook jam 9 pagi ya';
        $campaign->scheduled_at = now()->addHours(9);
        $campaign->user_id = auth()->id();
        $campaign->save();
        return redirect()->route('panel.campaigns.edit', $campaign->uuid);
    }

    public function store(Request $request)
    {
    }

    public function show(Campaign $campaign)
    {
    }

    public function edit(Campaign $campaign)
    {
        //campaign with lists
        $lists = $campaign->lists()->get();
        $allLists = \App\Models\Lists::with('contacts')->get();
        //devices with status connected
        $devices = SendingServer::where('status', SendingServer::DEVICE_STATUS_CONNECTED)->get();
        if($devices->count() === 0){
            return redirect()->route('panel.campaigns.index')->with('error', 'No connected devices found');
        }
        return inertia('Panel/Campaigns/ManageCampaign', [
            'campaign' => (new CampaignResource($campaign))->jsonSerialize(),
            'lists' => $lists,
            'allLists' => $allLists,
        ]);
    }

    public function update(Request $request, Campaign $campaign)
    {
        $validated = $request->validate([
            'name' => 'required',
            'text' => 'required',
            'default_list_id' => 'nullable',
            'lists' => 'required',
            'scheduled_at' => 'required',
            'is_schedule' => 'required',
        ]);
        $validated['scheduled_at'] = date('Y-m-d h:i:s', strtotime($validated['scheduled_at']));
        $campaign->update($validated);
        $campaign->lists()->sync($validated['lists']);
        if ($validated['is_schedule']) {
            $campaign->schedule();
            return redirect()->route('panel.campaigns.index');

        }
        $campaign->status = 'draft';
        $campaign->save();
        return redirect()->route('panel.campaigns.index')->with('success', 'Campaign updated');

    }

    public
    function delete(Campaign $campaign)
    {
        $campaign->delete();
        return redirect()->route('panel.campaigns.index');
    }

    public
    function destroy(Campaign $campaign)
    {
    }

    public
    function draft(Request $request, Campaign $campaign)
    {
        $validated = $request->validate([
            'name' => 'required',
            'text' => 'required',
            'default_list_id' => 'nullable',
            'lists' => 'required',
            'scheduled_at' => 'required',
        ]);
        $campaign->update($validated);

        $campaign->pause();
        $campaign->status = 'new';
        $campaign->lists()->sync($validated['lists']);
        if ($campaign->save()) {
            return redirect()->route('panel.campaigns.index')->with('success', 'Campaigns saved successfully');
        }
        return redirect()->route('panel.campaigns.index')->withErrors(['error' => 'Something went wrong']);
    }

//dupicate campaign
    public
    function duplicate(Request $request, Campaign $campaign)
    {
        $newCampaign = $campaign->replicate();
        $newCampaign->name = $newCampaign->name . ' (copy)';
        $newCampaign->status = Campaign::STATUS_NEW;
        $newCampaign->save();
        $newCampaign->lists()->sync($campaign->lists()->pluck('lists.id'));
        //route to update
        return redirect()->route('panel.campaigns.edit', $newCampaign);
    }
}