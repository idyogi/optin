<?php

namespace App\Models;

use App\Traits\WithUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
                        "index" => 0,
                        "element" => "input_text",
                        "attributes" => [
                            "type" => "text",
                            "name" => "subject",
                            "value" => "",
                            "class" => "",
                            "placeholder" => "",
                            "maxlength" => ""
                        ],
                        "settings" => [
                            "container_class" => "",
                            "label" => "",
                            "label_placement" => "",
                            "admin_field_label" => "",
                            "help_message" => "",
                            "validation_rules" => [
                                "required" => [
                                    "value" => false,
                                    "message" => "This field is required"
                                ]
                            ],
                            "conditional_logics" => [
                                "type" => "any",
                                "status" => false,
                                "conditions" => [
                                    [
                                        "field" => "",
                                        "value" => "",
                                        "operator" => ""
                                    ]
                                ]
                            ],
                            "is_unique" => "no",
                            "unique_validation_message" => "This field value need to be unique.",
                            "prefix_label" => "",
                            "suffix_label" => ""
                        ],
                        "editor_options" => [
                            "title" => "Simple Text",
                            "icon_class" => "ff-edit-text",
                            "template" => "inputText"
                        ],
                        "uniqElKey" => Str::uuid()
                    ],
                'phone' => [
                    "index" => 0,
                    "element" => "phone",
                    "attributes" => [
                        "name" => "phone",
                        "class" => "",
                        "value" => "",
                        "type" => "tel",
                        "placeholder" => "Mobile Number"
                    ],
                    "settings" => [
                        "container_class" => "",
                        "placeholder" => "",
                        "auto_select_country" => "no",
                        "label" => "Phone/Mobile",
                        "label_placement" => "",
                        "help_message" => "",
                        "admin_field_label" => "",
                        "phone_country_list" => [
                            "active_list" => "all",
                            "visible_list" => [
                            ],
                            "hidden_list" => [
                            ]
                        ],
                        "default_country" => "",
                        "validation_rules" => [
                            "required" => [
                                "value" => false,
                                "message" => "This field is required"
                            ],
                            "valid_phone_number" => [
                                "value" => false,
                                "message" => "Phone number is not valid"
                            ]
                        ],
                        "conditional_logics" => [
                        ]
                    ],
                    "editor_options" => [
                        "title" => "Phone/Mobile Field",
                        "icon_class" => "el-icon-phone-outline",
                        "template" => "inputText"
                    ],
                    "uniqElKey" => Str::uuid()
                ],
                'share' => [
                    "element" => "share",
                    "action_cooldown" => 0,
                    "points" => 0,
                    "share_cta" => "Share to Facebook",
                    "share_to" => "facebook",
                    "text_share" =>
                        "yuk isi form berikut : [url]",
                    "settings" => [
                        "container_class" => "",
                        "placeholder" => "",
                        "auto_select_country" => "no",
                        "label" => "Phone/Mobile",
                        "label_placement" => "",
                        "help_message" => "",
                        "admin_field_label" => "",
                        "phone_country_list" => [
                            "active_list" => "all",
                            "visible_list" => [
                            ],
                            "hidden_list" => [
                            ]
                        ],
                        "default_country" => "",
                        "validation_rules" => [
                            "required" => [
                                "value" => false,
                                "message" => "This field is required"
                            ],
                            "valid_phone_number" => [
                                "value" => false,
                                "message" => "Phone number is not valid"
                            ]
                        ],
                        "conditional_logics" => [
                        ]
                    ],
                    "uniqElKey" => Str::uuid()
                ],
                'countdown' => [
                    "element" => "countdown",
                    "countdown_type" => 'evergreen',
                    "evergreen_time" => 120,
                    "fixed_time" => now()->format('Y-m-d H:i:s'),
                    "settings" => [
                        "container_class" => "",
                        "placeholder" => "",
                        "auto_select_country" => "no",
                        "label" => "Phone/Mobile",
                        "label_placement" => "",
                        "help_message" => "",
                        "admin_field_label" => "",
                        "phone_country_list" => [
                            "active_list" => "all",
                            "visible_list" => [
                            ],
                            "hidden_list" => [
                            ]
                        ],
                        "default_country" => "",
                        "validation_rules" => [
                            "required" => [
                                "value" => false,
                                "message" => "This field is required"
                            ],
                            "valid_phone_number" => [
                                "value" => false,
                                "message" => "Phone number is not valid"
                            ]
                        ],
                        "conditional_logics" => [
                        ]
                    ],
                    "uniqElKey" => Str::uuid()
                ],
                'custom_html' => [
                    "index" => 0,
                    "element" => "custom_html",
                    "attributes" => [
                    ],
                    "html_codes" => '<h3><span style="color: #ff0000;">Some description</span> about this section</h3>',
                    "settings" => [
                        "validation_rules" => [
                            "required" => [
                                "value" => false,
                                "message" => "This field is required"
                            ]
                        ],
                        "conditional_logics" => [
                            "type" => "any",
                            "status" => false,
                            "conditions" => [
                                [
                                    "field" => "",
                                    "value" => "",
                                    "operator" => ""
                                ]
                            ]
                        ],
                        "container_class" => ""
                    ],
                    "editor_options" => [
                        "title" => "Custom HTML",
                        "icon_class" => "ff-edit-html",
                        "template" => "customHTML"
                    ],
                    "uniqElKey" => Str::uuid()
                ],
                'whatsapp_rotator' => [
                    "index" => 0,
                    "element" => "whatsapp_rotator",
                    "type" => "submit_button",
                    "attributes" => [
                    ],
                    "settings" => [
                        "numbers" => [
                            [
                                "number" => "6281234567890",
                                "name" => "CS",
                                'portion' => 1,
                                "current_lead" => 0,
                                "text" => "Hello, I want to ask about this product",
                            ],
                        ],
                        "button_ui" => [
                            "text" => "Chat via Whatsapp",
                        ],
                        "validation_rules" => [
                            "required" => [
                                "value" => false,
                                "message" => "This field is required"
                            ]
                        ],
                        "conditional_logics" => [
                            "type" => "any",
                            "status" => false,
                            "conditions" => [
                                [
                                    "field" => "",
                                    "value" => "",
                                    "operator" => ""
                                ]
                            ]
                        ],
                        "container_class" => ""
                    ],
                    "editor_options" => [
                        "title" => "Whatsapp Rotator",
                    ],
                    "uniqElKey" => Str::uuid()
                ]
            ];
    }

    public static function getFormatResponseFields()
    {
        return
            [
                [
                    "index" => 0,
                    "element" => "custom_html",
                    "attributes" => [
                    ],
                    "html_codes" => '<h3>Thank you for your submission.</h3>',
                    "settings" => [
                        "validation_rules" => [
                            "required" => [
                                "value" => false,
                                "message" => "This field is required"
                            ]
                        ],
                        "conditional_logics" => [
                            "type" => "any",
                            "status" => false,
                            "conditions" => [
                                [
                                    "field" => "",
                                    "value" => "",
                                    "operator" => ""
                                ]
                            ]
                        ],
                        "container_class" => ""
                    ],
                    "editor_options" => [
                        "title" => "Custom HTML",
                        "icon_class" => "ff-edit-html",
                        "template" => "customHTML"
                    ],
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
        foreach ($rotator['settings']['numbers'] as $key => $number) {
            $total += $number['portion'];
            $total_lead += $number['current_lead'];
        }

        foreach ($rotator['settings']['numbers'] as $key => $number) {
            $percentage_limit = $number['portion'] / $total * 100;
            $percentage_lead = ($number['current_lead']) / ($total_lead + 1) * 100;

            $is_reached = $percentage_limit <= $percentage_lead;
            if (!$is_reached) {
                $number['current_lead'] += 1;
                $rotator['settings']['numbers'][$key] = $number;
                break;
            }
        }

        $shuffle = collect($rotator['settings']['numbers'])->shuffle();
        $rotator['settings']['numbers'] = $shuffle->toArray();
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
                'label' => $field['settings']['label'],
            ];
        });
        $values = $collection->values();

        return $values->all();
    }

    public
    function leads()
    {
        return $this->hasMany(submission::class);
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
