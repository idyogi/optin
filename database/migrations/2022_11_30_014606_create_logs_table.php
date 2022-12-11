<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->id();
            $table->integer('parent_source_id')->nullable();
            $table->string('source_type')->nullable();
            $table->integer('source_id')->nullable();
            $table->string('component')->nullable();
            $table->char('status')->nullable()->comment('success/failed/info/error');
            $table->string('title')->nullable();
            $table->longText('description')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('logs');
    }
};
