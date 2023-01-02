<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('sending_servers', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->string('name');
            $table->enum('type',['selvi', 'starsender', 'webhook']);
            $table->string('webhook_url')->nullable();
            $table->string('api_key')->nullable();
            $table->enum('status',['connected', 'disconnected']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sending_servers');
    }
};