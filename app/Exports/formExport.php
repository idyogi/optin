<?php

namespace App\Exports;

use App\Models\form;
use Maatwebsite\Excel\Concerns\FromCollection;

class formExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return form::all();
    }
}
