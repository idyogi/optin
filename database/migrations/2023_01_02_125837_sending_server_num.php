<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('sending_servers', function (Blueprint $table) {
            $table->string('number');
        });
    }

    public function down()
    {
        Schema::table('sending_servers', function (Blueprint $table) {
            //
        });
    }
};