<?php

namespace App\Models;

use App\Traits\WithUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class submission extends Model
{
    protected $guarded = [];

    public function form() : BelongsTo
    {
        return $this->belongsTo(form::class);
    }
    public function meta() : HasMany
    {
        return $this->hasMany(submission_meta::class);
    }
}
