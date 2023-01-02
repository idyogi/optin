<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\User::class)->nullable();
            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone');
            $table->string('from')->nullable();
            $table->string('ip')->nullable();
            $table->dateTime('unsubscribed_at')->nullable();
            $table->string('status')->default(\App\Models\Contact::STATUS_SUBSCRIBED);
            $table->boolean('subscribe_confirmation')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('contacts');
    }
};