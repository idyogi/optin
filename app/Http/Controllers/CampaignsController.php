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
        $list = Lists::create([
            'name' => 'List ' . Carbon::now()->format('Y-m-d H:i:s'),
            'user_id' => auth()->id(),
        ]);
        //create campaign and redirect to edit page
        $campaign = new Campaign();
        $campaign->name = 'New Campaign';
        $campaign->text = 'Hai, live Facebook jam 9 pagi ya';
        $campaign->scheduled_at = now()->addHours(9);
        $campaign->user_id = auth()->id();
        $campaign->default_list_id = $list->id;
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
        $allLists = \App\Models\Lists::all();
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
        ]);
        $validated['scheduled_at'] = Carbon::create($validated['scheduled_at']);
        $campaign->update($validated);
        $campaign->lists()->sync($validated['lists']);
        $campaign->schedule();
        return redirect()->route('panel.campaigns.index');
    }

    public function destroy(Campaign $campaign)
    {
    }

    //dupicate campaign
    public function duplicate(Request $request, Campaign $campaign)
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