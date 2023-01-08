<?php

namespace App\Http\Controllers;

use App\Models\form;

class DashboardController extends Controller
{
    public function index()
    {
        //get lead per 2 seconds in 30 minutes. [%datetime% => 0, %datetime% =>3]
        $lead = form::getLeadsPerMinutes();
        //get only values from array
        $lead = array_values($lead);
        return inertia('Panel/Dashboard', [
            'lead' => $lead,
        ]);

    }

    public function fetch()
    {
        //get lead per 2 seconds in 30 minutes. [%datetime% => 0, %datetime% =>3]
        $lead = form::getLeadsPerMinutes();
        //get only values from array
        $lead = array_values($lead);
        return response()->json($lead);
    }

    public function fetch30d()
    {
        $lead = form::getLeadsPerMinutes(30*24*60, true);
        $lead = array_values($lead);
        return response()->json($lead);
    }
}
