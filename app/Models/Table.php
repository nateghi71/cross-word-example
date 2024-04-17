<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    use HasFactory;

    protected $fillable = ['name' , 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function rows()
    {
        return $this->hasMany(Row::class);
    }

    public function solvers()
    {
        return $this->hasMany(Solver::class);
    }

}
