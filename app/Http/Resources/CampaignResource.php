<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Campaign */
class CampaignResource extends JsonResource
{
    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request)
    {
        $logs = $this->logSent()->get();
        $log_failed = $logs->where('status', 'failed')->count();
        $log_sent = $logs->where('status', 'sent')->count();

        //merge the data from the collection with the data from the resource
        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'name' => $this->name,
            'status' => $this->status,
            'text' => $this->text,
            'scheduled_at' => $this->scheduled_at,
            'SubscriberCount' => $this->contacts()->count(),
            'contact_count' => $this->contacts()->count(),
            'log_count' => $logs->count(),
            'log_failed' => $log_failed,
            'log_sent' => $log_sent,
            'log_failed_percentage' => ($log_sent > 0 ? round(($log_sent / $logs->count()) * 100) : 0). '%',
        ];

    }
}
