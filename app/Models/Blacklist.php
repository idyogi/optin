<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blacklist extends Model
{
    public const IMPORT_TEMP_DIR = 'app/tmp';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'phone', 'reason',
    ];
        /**
     * Get all items.
     *
     */
    public static function getAll()
    {
        return self::select('blacklists.*');
    }
}