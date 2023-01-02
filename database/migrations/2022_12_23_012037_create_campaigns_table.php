<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->foreignIdFor(\App\Models\User::class);//owner
            $table->foreignIdFor(\App\Models\Lists::class, 'default_list_id');
            $table->string('name');
            $table->text('text');
            $table->text('last_error')->nullable();
            $table->dateTime('scheduled_at');
            $table->dateTime('delivery_at')->nullable();
            $table->string('status')->default(\App\Models\Campaign::STATUS_NEW);
            $table->timestamps();
        });

        Schema::table('campaigns', function (Blueprint $table) {
            $table->integer('running_pid')->default(null)->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('campaigns');
    }
};