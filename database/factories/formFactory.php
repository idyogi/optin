<?php

namespace Database\Factories;

use App\Models\form;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class formFactory extends Factory
{
    protected $model = form::class;

    public function definition(): array
    {
        return [
            'uuid' => $this->faker->uuid(),
            'slug' => form::slug(),
            'title' => 'Form #'.$this->faker->word(),
            'status' => 'published',
            'appearance_settings' => null,
            'form_fields' => '{"fields":[{"index":2,"element":"input_text","attributes":{"type":"text","name":"subject","value":"","class":"","placeholder":"Nama Kamu","maxlength":""},"settings":{"container_class":"","label":"Nama","label_placement":"","admin_field_label":"Nama","help_message":"","validation_rules":{"required":{"value":true,"message":"This field is required"}},"conditional_logics":{"type":"any","status":false,"conditions":[{"field":"","value":"","operator":""}]},"is_unique":"no","unique_validation_message":"This field value need to be unique.","prefix_label":"","suffix_label":""},"editor_options":{"title":"Simple Text","icon_class":"ff-edit-text","template":"inputText"},"uniqElKey":"el_1570878958648"},{"index":18,"element":"phone","attributes":{"name":"phone","class":"","value":"","type":"tel","placeholder":"Mobile Number"},"settings":{"container_class":"","placeholder":"","auto_select_country":"no","label":"Phone/Mobile","label_placement":"","help_message":"","admin_field_label":"","phone_country_list":{"active_list":"all","visible_list":[],"hidden_list":[]},"default_country":"","validation_rules":{"required":{"value":false,"message":"This field is required"},"valid_phone_number":{"value":false,"message":"Phone number is not valid"}},"conditional_logics":[]},"editor_options":{"title":"Phone/Mobile Field","icon_class":"el-icon-phone-outline","template":"inputText"},"uniqElKey":"el_1670039324207"},{"index":17,"element":"custom_html","attributes":[],"html_codes":"<h3><span style=\"color: #ff0000;\">Some description</span> about this section</h3>","settings":{"conditional_logics":{"type":"any","status":false,"conditions":[{"field":"","value":"","operator":""}]},"container_class":""},"editor_options":{"title":"Custom HTML","icon_class":"ff-edit-html","template":"customHTML"},"uniqElKey":"el_1669866824604"}],"submitButton":{"uniqElKey":"el_1524065200616","element":"button","attributes":{"type":"submit","class":""},"settings":{"align":"left","button_style":"default","container_class":"","help_message":"","background_color":"#409EFF","button_size":"md","color":"#ffffff","button_ui":{"type":"default","text":"Submit Form","img_url":""}},"editor_options":{"title":"Submit Button"}}}',
            'response_fields' => json_encode(form::getFormatResponseFields()),
            'has_payment' => 0,
            'type' => '',
            'conditions' => null,
            'user_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
