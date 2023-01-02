<?php

namespace App\Models;

use App\Events\ListUpdatedEvent;
use App\Traits\WithUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;

class Lists extends Model
{
    use HasFactory, WithUuid;

    public const SOURCE_EMBEDDED_FORM = 'embedded-form';
    protected $table = 'lists';
    protected $fillable = [
        'user_id',
        'list_id',
        'name',
        'sort_order',
    ];

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function contacts()
    {
        return $this->belongsToMany(\App\Models\Contact::class, 'list_contacts', 'list_id', 'contact_id');
    }

    public function campaigns()
    {
        return $this->belongsToMany(\App\Models\Campaign::class, 'list_campaigns');
    }


    public function addContact($request, $source)
    {
        // Validation

        $messages = [];

        $messages['phone.required'] = trans('messages.list.validation.required', ['field' => 'phone']);


        // List rules
        $rules = [
            'phone' => ['required'],
        ];

        // Do not allow duplicate email if added by admin (throw an exception)
        // If imported / api / web / embedded-form THEN just overwrite
        if ($source == Contact::SUBSCRIPTION_TYPE_ADDED) {
            // @important
            // DO NOT USE "UNIQUE" validator of Laravel
            // Otherwise, it will fails after the subscriber with given email address is added
            $rules['phone'] = [
                'required',
                'phone',
                Rule::unique('contacts')->where(function ($query) {
                    return $query->where('list_id', $this->id);
                }),
            ];
        }
        //remove empty values
        $arr = array_filter($request, function ($item) {
            return !empty($item['value']);
        });
        // arr map to key value
        $arr = array_map(function ($item) {
            return [$item['name'] => $item['value']];
        }, $arr);
        // arr to key value
        $arr = array_reduce($arr, 'array_merge', []);
        $validator = \Validator::make($arr, $rules);
        // Validated, proceed
        $contact = $this->contacts()->firstOrCreate([
            'phone' => $arr['phone'],
        ], [
            'user_id' => $this->user_id,
            'status' => Contact::STATUS_SUBSCRIBED,
            'from' => $source,
            'unsubscribed_at' => null,
        ]);
        // Check if subscriber already in blacklist
        if ($contact->isListedInBlacklist()) {
            // validate service
            $validator->after(function ($validator) {
                $validator->errors()->add('phone', trans('messages.subscriber.blacklisted'));
            });
        }

        if ($validator->fails()) {
            return [$validator, null];
        }

        if ($source == Contact::SUBSCRIPTION_TYPE_ADDED) {
            $contact->status = 'subscribed';
        } elseif ($this->subscribe_confirmation) {
            if ($contact->isSubscribed()) {
                //
            } else {
                $contact->status = 'unconfirmed';
            }
        } else {
            $contact->status = 'subscribed';
        }
//        $contact->ip = $request->ip();
//        $contact->save();

        // @IMPORTANT
        // After the $subscriber->save(), $validator->fails() becomes TRUE!!!!
        // Because the email address is now not available
        // This is a problem of Laravel

        $contact->updateFields($arr);

        // update list cache
        ListUpdatedEvent::dispatch($this);


        return [$validator, $contact];
    }

}