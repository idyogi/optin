<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('form_analytics', function (Blueprint $table) {
            $table->id();
            $table->integer('form_id')->nullable();
            $table->integer('user_id')->nullable();
            $table->string('source_url')->nullable();
            $table->char('platform')->nullable();
            $table->char('browser')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->char('ip')->nullable();
            $table->integer('count')->default(1);


            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('form_analytics');
    }
};
