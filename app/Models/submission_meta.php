<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class submission_meta extends Model
{
    protected $table = 'submission_meta';
    protected $guarded = [];

    public function submission()
    {
        return $this->belongsTo(submission::class);
    }

    //map array key to value
    public function getMetaValueAttribute()
    {
        $meta = $this->meta;
        $meta_value = $this->meta_value;
        $meta_value = json_decode($meta_value, true);
        $meta_value = array_map(function ($item) use ($meta) {
            return $meta[$item];
        }, $meta_value);
        return $meta_value;
    }
}
