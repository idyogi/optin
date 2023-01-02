<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ListContact extends Model
{
    protected $table = 'list_contacts';
    protected $fillable = [
        'list_id',
        'contact_id',
    ];
}