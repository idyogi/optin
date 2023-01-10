<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    public const STATUS_SUBSCRIBED = 'subscribed';
    public const STATUS_UNSUBSCRIBED = 'unsubscribed';
    public const STATUS_BLACKLISTED = 'blacklisted';
    public const STATUS_SPAM_REPORTED = 'spam-reported';
    public const STATUS_UNCONFIRMED = 'unconfirmed';

    public const SUBSCRIPTION_TYPE_ADDED = 'added';
    public const SUBSCRIPTION_TYPE_DOUBLE_OPTIN = 'double';
    public const SUBSCRIPTION_TYPE_SINGLE_OPTIN = 'single';
    public const SUBSCRIPTION_TYPE_IMPORTED = 'imported';

    public const VERIFICATION_STATUS_DELIVERABLE = 'deliverable';
    public const VERIFICATION_STATUS_UNDELIVERABLE = 'undeliverable';
    public const VERIFICATION_STATUS_UNKNOWN = 'unknown';
    public const VERIFICATION_STATUS_RISKY = 'risky';
    public const VERIFICATION_STATUS_UNVERIFIED = 'unverified';

    protected $dates = ['unsubscribed_at'];

    public static $rules = [
        'phone' => ['required'],
    ];
    protected $table = 'contacts';
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'from',
        'ip',
        'unsubscribed_at',
        'status',

    ];

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function lists()
    {
        return $this->belongsToMany(\App\Models\Lists::class, 'list_contacts', 'contact_id', 'list_id');
    }

    public function getPhone()
    {
        return $this->phone;
    }

    public function scopeSubscribed($query)
    {
        return $query->where('contacts.status', self::STATUS_SUBSCRIBED);
    }

    public function isSubscribed()
    {
        return $this->status == self::STATUS_SUBSCRIBED;
    }

    public function isUnsubscribed()
    {
        return $this->status == self::STATUS_UNSUBSCRIBED;
    }

    /**
     * Check if the subscriber is listed in the Blacklist database.
     */
    public function isListedInBlacklist()
    {
        // @todo Filter by current user only
        return Blacklist::where('phone', '=', $this->phone)->exists();
    }

    /**
     * Update fields from request.
     */
    public function updateFields($params)
    {
        foreach ($params as $tag => $value) {
            {
                // update email attribute of subscriber
                if ($tag === 'phone') {
                    $this->phone = $value;
                    $this->save();
                }
                if ($tag === 'name' || $tag === 'input_text') {
                    $this->name = $value;
                    $this->save();
                }
                if ($tag === 'email') {
                    $this->email = $value;
                    $this->save();
                }
            }
        }
    }
    //remove duplicate phone number
    public function removeDuplicatePhone($request)
    {
        $phone = $request->phone;
        $user = auth()->user();
        $contact = Contact::where('phone', $phone)->where('user_id', $user->id)->first();
        if ($contact) {
            $contact->delete();
        }
    }
}