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
    // Tabel Radiographs (Tempat menyimpan foto panoramik)
    Schema::create('radiographs', function (Blueprint $table) {
        $table->string('id_radiograph', 20)->primary();
        $table->unsignedBigInteger('id_dokter')->nullable();
        $table->foreign('id_dokter')->references('id')->on('users')->onDelete('set null');

        $table->unsignedBigInteger('id_radiografer')->nullable();
        $table->foreign('id_radiografer')->references('id')->on('users')->onDelete('set null');

        $table->string('patient_nik', 16); // Relasi ke tabel patients
        $table->string('image', 100); // Path file foto
        $table->enum('status', ['waiting', 'verified'])->default('waiting'); // Status deteksi
        $table->timestamps();

        $table->foreign('patient_nik')->references('nik')->on('patients')->onDelete('cascade');
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('radiographs');
    }
};
