<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FormLeadRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'fields' => 'required|array',
            'reference' => 'nullable|string',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }

    public function messages()
    {
        return [
            'fields.required' => 'Silahkan isi form yang tersedia'
        ];
    }
}