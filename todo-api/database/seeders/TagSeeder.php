<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $tags = [
            ['name' => 'Work', 'color' => '#f87171'],      // Red
            ['name' => 'School', 'color' => '#60a5fa'],    // Blue
            ['name' => 'Study', 'color' => '#34d399'],     // Green
            ['name' => 'Shopping', 'color' => '#facc15'],  // Yellow
            ['name' => 'Sports', 'color' => '#a78bfa'],    // Purple
            ['name' => 'Game', 'color' => '#f472b6'],      // Pink
            ['name' => 'Relax', 'color' => '#38bdf8'],     // Sky Blue
            ['name' => 'Urgent', 'color' => '#ef4444'],    // Strong Red
        ];
        foreach ($tags as $tag) {
            Tag::create($tag);
        }
    }
}
