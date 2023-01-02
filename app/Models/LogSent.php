<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LogSent extends Model
{
    protected $table = 'log_sents';
    protected $fillable = [
        'contact_id',
        'campaign_id',
        'sending_server_id',
        'status',
        'error_message',
        'sent_at',
    ];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    public function sendingServer()
    {
        return $this->belongsTo(SendingServer::class);
    }
}