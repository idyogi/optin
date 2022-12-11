<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('form_meta', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\form::class);
            $table->string('meta_key');
            $table->longText('value')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('form_meta');
    }
};
