<?php

namespace App\Models;

use App\Traits\WithUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class submission extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function form() : BelongsTo
    {
        return $this->belongsTo(form::class);
    }
    public function meta() : HasMany
    {
        return $this->hasMany(submission_meta::class);
    }
    //find name from lead meta
    public function getName()
    {
        $meta = submission_meta::where('meta_key', 'name')->first();
        return $meta->value ?? '';
    }
    //find phone from lead meta
    public function getPhone()
    {
        $meta = submission_meta::where('meta_key', 'phone')->first();
        return $meta->value ?? '';
    }
}
