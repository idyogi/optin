<?php

namespace App\Exports;

use App\Models\form;
use Maatwebsite\Excel\Cell;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\WithCustomValueBinder;
use Maatwebsite\Excel\DefaultValueBinder;
use PhpOffice\PhpSpreadsheet\Cell\DataType;

class ContactListExport extends DefaultValueBinder implements WithCustomValueBinder, FromView
{
    //constractor
    public function __construct($collection)
    {
        $this->collection = $collection;
    }
    public function view(): \Illuminate\Contracts\View\View
    {
        return view('ContactListExport', ['datas' => $this->collection['data']]);
    }
    public function bindValue(\PhpOffice\PhpSpreadsheet\Cell\Cell $cell, $value)
    {
        if (is_numeric($value)) {
            $cell->setValueExplicit($value, DataType::TYPE_STRING);

            return true;
        }

        // else return default behavior
        return parent::bindValue($cell, $value);
    }

}
