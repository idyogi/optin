<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use Illuminate\Http\Request;

class CampaignsController extends Controller
{
    public function index()
    {
        return inertia('Panel/Campaigns/Campaigns', [
            'campaigns' => Campaign::latest()->get(),
        ]);
    }

    public function create()
    {
        return inertia('Panel/Campaigns/ManageCampaign', [
            'campaign' => new Campaign(),
        ]);
    }

    public function store(Request $request)
    {
    }

    public function show(Campaign $campaign)
    {
    }

    public function edit(Campaign $campaign)
    {
    }

    public function update(Request $request, Campaign $campaign)
    {
    }

    public function destroy(Campaign $campaign)
    {
    }
}