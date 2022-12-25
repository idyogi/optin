<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('log_sents', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Contact::class);
            $table->foreignIdFor(\App\Models\Campaign::class);
            $table->dateTime('sent_at');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('log_sents');
    }
};