<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\form */
class FormResource extends JsonResource
{
    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'slug' => $this->slug,
            'title' => $this->title,
            'status' => $this->status,
            'appearance_settings' => $this->appearance_settings,
            'form_fields' => $this->form_fields,
            'has_payment' => $this->has_payment,
            'type' => $this->type,
            'conditions' => $this->conditions,
            'total_leads' => $this->getFormMeta('total_leads') ?? 0,
            'total_views' => $this->getFormMeta('total_views') ?? 0,
            'created_by' => $this->created_by,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
