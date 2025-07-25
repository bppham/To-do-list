<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'name',
        'color',
    ];

    public function todos()
    {
        return $this->belongsToMany(Todo::class, 'tag_todo');
    }
}
