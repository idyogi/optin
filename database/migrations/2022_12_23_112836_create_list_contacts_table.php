<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('list_contacts', function (Blueprint $table) {
            $table->foreignIdFor(\App\Models\Lists::class, 'list_id')->constrained()->cascadeOnDelete();
            $table->foreignIdFor(\App\Models\Contact::class, 'contact_id')->constrained()->cascadeOnDelete();
        });
    }

    public function down()
    {
        Schema::dropIfExists('list_contacts');
    }
};