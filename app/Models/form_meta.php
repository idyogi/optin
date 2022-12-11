<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class form_meta extends Model
{
    protected $table = 'form_meta';
    protected $guarded = [];
    //default meta response

    public function form()
    {
        return $this->belongsTo(form::class);
    }

}
