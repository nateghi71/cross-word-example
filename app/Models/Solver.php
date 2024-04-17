<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solver extends Model
{
    use HasFactory;

    protected $fillable = ['name' , 'number', 'table_id'];

    public function table()
    {
        return $this->belongsTo(Table::class);
    }

}
