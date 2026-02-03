<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up(): void
{
    Schema::create('patients', function (Blueprint $table) {
        $table->string('nik', 16)->primary(); 
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        $table->string('birth_place'); // Tambah ini
        $table->date('birth_date');    // Tambah ini
        $table->text('address');       // Tambah ini
        $table->integer('age');
        $table->enum('gender', ['male', 'female']);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
