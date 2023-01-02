<?php

namespace App\Http\Controllers;

use App\Http\Resources\DeviceCollection;
use App\Models\SendingServer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class SendingServersController extends Controller
{
    public function index()
    {
        $servers = SendingServer::latest()
            ->when(request('search'), function ($query) {
                $query->where(DB::raw('lower(name)'), 'like', '%' . strtolower(request('search')) . '%');
            })
            ->paginate(10)->withQueryString();
        $deviceCollections = new DeviceCollection($servers);
        return inertia('Panel/Devices/Devices', [
            'devices' => $deviceCollections,
        ]);
    }

    public function create()
    {
        //create new device
        $device = SendingServer::factory()->create([
            'name' => 'New Device CS #' . substr(md5(microtime()), random_int(0, 26), 5),
            'number' => random_int(1000000000, 9999999999),
            'status' => 'disconnected',
        ]);
        return redirect()->route('panel.devices.edit', $device->uuid);
    }
    public function store(Request $request)
    {
    }

    public function show(SendingServer $sendingServers)
    {
    }

    public function edit(SendingServer $device)
    {
        //call https://api.adminselvi.com/find-device?api_key=awCnq3n2no7IWCiSYgE3xDbcQKTphd&number=
        $url = 'https://api.adminselvi.com/find-device';
        $number = Http::withOptions(['verify' => false])->asForm()->get($url,
            [
                'api_key' => 'awCnq3n2no7IWCiSYgE3xDbcQKTphd&number=',
                'number' => $device->number,
            ]);
        return inertia('Panel/Devices/ManageDevice', [
            'device' => $device,
            'number' => $number->body(),
        ]);
    }

    public function update(Request $request, SendingServer $device)
    {
        $validated = $request->validate([
            'name' => 'required',
            'status' => 'required',
        ]);
        $device->update($validated);
        return back()->with('success', 'Device updated');
    }

    public function destroy(SendingServer $device)
    {
        $device->delete();
        return redirect()->route('panel.devices.index')->with('success', 'Device deleted');
    }
}