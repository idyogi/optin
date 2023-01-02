<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


trait WithUuid
{
    protected static function bootWithUuid()
    {
        static::creating(function ($model) {
            if (!$model->getKey()) {
                $model->uuid = (string)Str::orderedUuid();
            }
        });
    }

    public static function findByUuid(string $uuid): ?Model
    {
        return static::where('uuid', $uuid)->first();
    }

    public static function findBySku(string $sku): ?Model
    {
        return static::where('sku', $sku)->first();
    }

    public function getRouteKeyName(): string
    {
        return 'uuid';
    }

    public function getPrimaryKey(): string
    {
        return 'uuid';
    }

    public function getUid(): ?string
    {
        return $this->uuid;
    }

}
