<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\form::class);
            $table->integer('serial_number')->nullable();
            $table->longText('response')->nullable();
            $table->string('source_url')->nullable();
            $table->foreignIdFor(\App\Models\User::class)->nullable();
            $table->foreignIdFor(\App\Models\submission::class, 'ref')->nullable();
            $table->string('status')->default('unread');
            $table->tinyInteger('is_favourite')->default(0);
            $table->string('browser')->nullable();
            $table->string('device')->nullable();
            $table->string('ip')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->string('payment_status')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('payment_type')->nullable();
            $table->string('currency')->nullable();
            $table->float('total_paid')->nullable();


            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('submissions');
    }
};
