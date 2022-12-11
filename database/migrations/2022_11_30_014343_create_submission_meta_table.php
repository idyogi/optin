<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('submission_meta', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\submission::class);
            $table->string('meta_key')->nullable();
            $table->longText('value')->nullable();
            $table->string('status')->nullable();
            $table->foreignIdFor(\App\Models\User::class)->nullable();
            $table->string('name')->nullable();


            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('submission_meta');
    }
};
