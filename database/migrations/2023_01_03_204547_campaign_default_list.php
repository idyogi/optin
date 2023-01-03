<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('campaigns', function (Blueprint $table) {
            $table->integer('default_list_id')->change()->nullable();
        });
    }

    public function down()
    {
        Schema::table('campaigns', function (Blueprint $table) {
            //
        });
    }
};