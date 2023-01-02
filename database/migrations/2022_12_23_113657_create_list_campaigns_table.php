<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('list_campaigns', function (Blueprint $table) {
            $table->foreignIdFor(\App\Models\Lists::class);
            $table->foreignIdFor(\App\Models\Campaign::class);
        });
    }

    public function down()
    {
        Schema::dropIfExists('list_campaigns');
    }
};