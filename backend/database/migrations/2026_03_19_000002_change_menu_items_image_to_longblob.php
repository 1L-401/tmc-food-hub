<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Use raw SQL to change to LONGBLOB
        DB::statement('ALTER TABLE menu_items MODIFY image LONGBLOB NULL');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Use raw SQL to revert to BINARY
        DB::statement('ALTER TABLE menu_items MODIFY image BINARY(255) NULL');
    }
};
