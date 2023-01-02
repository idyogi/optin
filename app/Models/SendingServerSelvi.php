<?php

namespace App\Models;

use App\Traits\WithUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;

class SendingServerSelvi extends SendingServer
{
    protected $table = 'sending_servers';

    /**
     * Send the provided message.
     *
     *
     */

}