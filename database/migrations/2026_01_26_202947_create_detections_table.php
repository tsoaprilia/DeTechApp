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
        Schema::create('detections', function (Blueprint $table) {
        $table->id('id_detection');
        $table->string('id_radiograph', 20);
        $table->integer('no_fdi'); // Nomor Gigi Susu
        $table->string('analysis', 100); // Koordinat atau hasil analisis
        $table->timestamps();

        $table->foreign('id_radiograph')->references('id_radiograph')->on('radiographs')->onDelete('cascade');
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detections');
    }
};
