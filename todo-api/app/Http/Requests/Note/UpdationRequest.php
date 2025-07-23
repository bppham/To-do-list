<?php

namespace App\Http\Requests\Note;

use Illuminate\Foundation\Http\FormRequest;

class UpdationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'start_date'  => 'sometimes|nullable|date|after_or_equal:today',
            'end_date'    => 'sometimes|nullable|date|after_or_equal:start_date',
            'repeat'      => 'sometimes|nullable|in:none,everyday,monday,tuesday,wednesday,thursday,friday,saturday,sunday',
        ];
    }
}
