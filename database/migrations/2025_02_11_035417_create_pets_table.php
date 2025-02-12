<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('pets', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('species', 50);
            $table->string('breed', 50)->nullable();
            $table->integer('age')->nullable();
            $table->decimal('price', 10, 2);
            $table->enum('status', ['available', 'sold']);
            $table->string('detail', 250);
            $table->string('photo', 100)->nullable();
            
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pets');
    }
};
