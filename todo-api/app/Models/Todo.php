<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'start_date',
        'end_date',
        'repeat',
        'is_done',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function tags(){
        return $this->belongsToMany(Tag::class, 'tag_todo');
    }
}
