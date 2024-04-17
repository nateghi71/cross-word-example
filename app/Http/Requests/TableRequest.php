<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TableRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "name" => "required",
            "rows" => 'required',
            "rows.question.*" => 'required',
            "rows.answer.*" => 'required',
            "rows.keyword1.*" => 'nullable|integer',
            "rows.keyword2.*" => 'nullable|integer',
            "rows.keyword3.*" => 'nullable|integer',
        ];
    }
}
