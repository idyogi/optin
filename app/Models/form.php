<?php

namespace App\Models;

use App\Traits\WithUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class form extends Model implements HasMedia
{
    use HasFactory;
    use WithUuid;
    use InteractsWithMedia;

    protected $guarded = [];
    protected $casts = [
        'updated_at' => 'datetime',
    ];

    public function getFormatFields()
    {
        return
            [
                'input_text' =>
                    [
                        "title" => "Text Input",
                        "element" => "input_text",
                        "label" => "Name",
                        "value" => "",
                        "placeholder" => "Enter text here",
                        "required" => true,
                        "uniqElKey" => Str::uuid()
                    ],
                'phone' => [
                    "title" => "Phone",
                    "element" => "phone",
                    "label" => "Mobile Phone",
                    "placeholder" => "Enter your phone here",
                    "required" => true,
                    "value" => "",
                    'code' => '+62',
                    "uniqElKey" => Str::uuid()
                ],
                'share' => [
                    "title" => "Share",
                    "element" => "share",
                    "action_cooldown" => 0,
                    "points" => 0,
                    "share_cta" => "Share to Facebook",
                    "share_to" => "facebook",
                    "text_share" =>
                        "yuk isi form berikut : [url]",
                    "uniqElKey" => Str::uuid()
                ],
                'countdown' => [
                    "title" => "Countdown",
                    "element" => "countdown",
                    "countdown_type" => 'evergreen',
                    "evergreen_time" => 120,
                    "fixed_time" => now()->format('Y-m-d H:i:s'),
                    "uniqElKey" => Str::uuid()
                ],
                'custom_html' => [
                    "title" => "Custom HTML",
                    "element" => "custom_html",
                    "html_codes" => '<h3><span style="color: #ff0000;">Some description</span> about this section</h3>',
                    "uniqElKey" => Str::uuid()
                ],
                'whatsapp_rotator' => [
                    "title" => "WhatsApp Rotator",
                    "element" => "whatsapp_rotator",
                    "type" => "submit_button",
                    "label" => "Chat via Whatsapp",
                    "numbers" => [
                        [
                            "number" => "6281234567890",
                            "name" => "CS",
                            'portion' => 1,
                            "current_lead" => 0,
                            "text" => "Hello, I want to ask about this product",
                            "pause" => false,
                        ],
                    ],
                    "uniqElKey" => Str::uuid()
                ]
            ];
    }

    public static function getDefaultFields()
    {
        $data['fields'] = [
            [
                "element" => "custom_html",
                "html_codes" => "<h3><span style=\"color: #ff0000;\">Some description</span> about this section</h3>",
                "uniqElKey" => Str::uuid()
            ],
        ];
        $data['submitButton'] = [
            "label" => "Submit",
            "background_color" => "#ff0000",
            "text_color" => "#ffffff",
        ];
        return $data;

    }

    public static function getFormatResponseFields()
    {
        return
            [
                [
                    "title" => "Text",
                    "element" => "custom_html",
                    "html_codes" => '<h3>Thank you for your submission.</h3>',
                    "uniqElKey" => Str::uuid()
                ],
            ];
    }

    public
    function settings(): array
    {
        return [
            'formSettings' => [
                'confirmation' => [
                    'redirectTo' => 'same-page',
                    'message' => 'Thank you for your submission.',
                ],
                'enableCookies' => true,
            ],
            'double_optin_settings' => [
                'enabled' => false,
                'subject' => 'Please confirm your subscription',
                'message' => 'Please confirm your subscription by clicking the link below.',
                'button_text' => 'Confirm Subscription',
                'redirect_to' => 'same-page',
                'redirect_url' => '',
                'confirmation_message' => 'Thank you for confirming your subscription.',
            ],
            'template_name' => 'basic_contact_form'
        ];
    }

    public
    function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function list(): BelongsTo
    {
        return $this->belongsTo(Lists::class);
    }

    //get form meta
    public function getFormMeta($key)
    {
        $meta = $this->metas->where('meta_key', $key)->first();
        if ($meta) {
            return $meta->value;
        }
        return null;
    }

    //set form meta
    public function setFormMeta($key, $value, $type = null)
    {
        $meta = $this->metas->where('meta_key', $key)->first();

        if ($meta) {

            if ($type === 'increment') {
                $meta->value = (int)$meta->value + 1;
                $meta->save();
                return;
            }

            $meta->value = $value;
            $meta->save();
        } else {
            $this->metas()->create([
                'meta_key' => $key,
                'value' => $value,
            ]);
        }
    }

    //get random number from rotator
    public function rotators()
    {
        $rotator = json_decode($this->getFormMeta('whatsapp_rotator'), true);
        $total = 0;
        $total_lead = 0;
        foreach ($rotator['numbers'] as $key => $number) {
            $total += $number['portion'];
            $total_lead += $number['current_lead'];
        }

        foreach ($rotator['numbers'] as $key => $number) {
            $percentage_limit = $number['portion'] / $total * 100;
            $percentage_lead = ($number['current_lead']) / ($total_lead + 1) * 100;

            $is_reached = $percentage_limit <= $percentage_lead;
            //if pause is true, then skip this number
            $number['pause'] = $number['pause'] ?? false;
            if ($number['pause'] || $is_reached) {
                continue;
            }
            if (!$is_reached) {
                $number['current_lead'] += 1;
                $rotator['numbers'][$key] = $number;
                break;
            }
        }

        $shuffle = collect($rotator['numbers'])->reject(function ($item) {
            return $item['pause'] ?? false;
        })->shuffle();
        $rotator['numbers'] = $shuffle->toArray();
        $this->setFormMeta('whatsapp_rotator', json_encode($rotator));
        $this->setFormMeta('total_leads', $total_lead);
        return $shuffle->first();
    }

    public
    function fields()
    {
        return json_decode($this->form_fields, true);
    }

    public function response_fields()
    {
        return json_decode($this->response_fields, true);
    }

    public
    function columns()
    {

        $collection = collect($this->fields()['fields'])->reject(function ($field) {
            return $field['element'] === 'custom_html';
        })->map(function ($field) {
            if ($field['element'] === 'whatsapp_rotator') {
                return [
                    'name' => 'whatsapp_rotator',
                    'label' => 'WA Rotator',
                ];
            }
            return [
                'name' => $field['element'],
                'label' => $field['label'],
            ];
        });
        //add created at
        $collection->push([
            'name' => 'created_at',
            'label' => 'Created At',
        ]);
        $values = $collection->values();

        return $values->all();
    }

    public
    function leads()
    {
        return $this->hasMany(submission::class);
    }
    //get lead per 2 seconds in 30 minutes by 30 rows
    //sample return ['2021-01-01 00:00:00' => '1 lead', '2021-01-01 00:00:02' => '0 lead,, '2021-01-01 00:00:04' => '3 lead', '2021-01-01 00:00:06' => '0 lead']
    static public function getLeadsPerMinutes($minutes = 1, $byDay = false)
    {
        $data = [];
        $start = Carbon::now()->subMinutes($minutes);
        $end = Carbon::now();
        $interval = 2;
        $total = 0;
        $leads = submission::whereBetween('created_at', [$start, $end])->get();
        $total = $leads->count();
        $leads = $leads->groupBy(function ($item) use ($interval, $byDay) {
            if ($byDay) {
                return Carbon::parse($item->created_at)->format('Y-m-d');
            }
            return Carbon::parse($item->created_at)->format('Y-m-d H:i:s');
        });
        $leads = $leads->map(function ($item) {
            return $item->count();
        });
        $leads = $leads->toArray();
        $start = $start->format('Y-m-d H:i:s');
        $end = $end->format('Y-m-d H:i:s');
        $time = strtotime($start);
        $endTime = strtotime($end);
        while ($time <= $endTime) {
            if ($byDay) {
                $data[date('Y-m-d', $time)] = $leads[date('Y-m-d', $time)] ?? 0;
            } else {
                $data[date('Y-m-d H:i:s', $time)] = $leads[date('Y-m-d H:i:s', $time)] ?? 0;
            }
            $time += $interval;
        }
        return $data;
    }

    //get leads from meta
    public function getLeads()
    {
        $leads = $this->leads()->orderBy('id', 'desc')->get();
        $leads = $leads->map(function ($lead) {

            $lead->meta = $lead->meta->mapWithKeys(function ($item) {
                return [$item->meta_key => $item->value];
            });
            return $lead;
        });
        return $leads;
    }

    public
    function metas()
    {
        return $this->hasMany(form_meta::class);
    }

    public
    static function slug()
    {
        //string random 6 characters
        $unique = substr(str_shuffle(str_repeat($x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil(6 / strlen($x)))), 1, 6);
        $check = form::where('slug', $unique)->first();

        if ($check) {
            return form::slug();
        }

        return $unique;
    }

}
