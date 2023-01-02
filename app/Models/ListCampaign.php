<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ListCampaign extends Model
{
    protected $table = 'list_campaigns';
    protected $fillable = [
        'list_id',
        'campaign_id',
    ];
}