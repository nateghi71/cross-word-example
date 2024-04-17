<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Row extends Model
{
    use HasFactory;

    protected $fillable = ['question' , 'answer', 'keyword1', 'keyword2', 'keyword3', 'table_id'];

    public function table()
    {
        return $this->belongsTo(Table::class);
    }

    protected function answer(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => preg_replace('/\s/', '', $value),
        );
    }
}
