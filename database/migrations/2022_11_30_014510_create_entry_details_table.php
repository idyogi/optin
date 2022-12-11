<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('entry_details', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('form_id')->nullable();
            $table->bigInteger('submission_id')->nullable();
            $table->string('field_name')->nullable();
            $table->string('sub_field_name')->nullable();
            $table->longText('field_value')->nullable();


            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('entry_details');
    }
};
