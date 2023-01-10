<?php

namespace App\Imports;

use App\Models\Contact;
use App\Models\Lists;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Row;

class ContactsImport implements OnEachRow,WithHeadingRow
{
    public function __construct(Lists $list)
    {
        $this->list = $list;
    }

    public function onRow(Row $row)
    {
        $row      = $row->toArray();
        $name = '';
        $phone = '';
        $email = '';
        foreach ($row as $key => $value) {
            if ($this->isPhone($value) && $phone == '') {
                $phone = $value;
            }
            if ($this->isEmail($value)) {
                $email = $value;
            }
            if ($this->isName($value)) {
                $name = $value;
            }
        }
        try {
            $contact = Contact::create([
                'name' => $name,
                'phone' => $phone,
                'email' => $email,
                'user_id' => 1,
            ]);
            $this->list->contacts()->attach($contact->id);
        } catch (\Exception $e) {
            dd($e->getMessage());
        }

        return $contact;
    }

    private function isPhone($phone)
    {
        //pattern +62, 62, 08, 8
        $pattern = '/^(\+62|62|08|8)/';
        return preg_match($pattern, $phone);
    }

    private function isEmail($email)
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    private function isName($name)
    {
        return preg_match('/^([a-zA-Z]+)(\s[a-zA-Z]+)*$/', $name);
    }
}
