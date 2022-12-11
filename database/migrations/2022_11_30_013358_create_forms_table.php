<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('forms', function (Blueprint $table) {
            $table->id();

            $table->uuid('uuid')->unique();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('status')->default('draft');
            $table->text('appearance_settings')->nullable();
            $table->longText('form_fields')->nullable();
            $table->tinyInteger('has_payment')->default(0);
            $table->string('type')->nullable();
            $table->text('conditions')->nullable();
            $table->foreignIdFor(\App\Models\User::class);

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('forms');
    }
};
