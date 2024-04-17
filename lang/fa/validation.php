<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'The :attribute field must be accepted.',
    'accepted_if' => 'The :attribute field must be accepted when :other is :value.',
    'active_url' => 'The :attribute field must be a valid URL.',
    'after' => 'The :attribute field must be a date after :date.',
    'after_or_equal' => 'The :attribute field must be a date after or equal to :date.',
    'alpha' => 'The :attribute field must only contain letters.',
    'alpha_dash' => 'The :attribute field must only contain letters, numbers, dashes, and underscores.',
    'alpha_num' => 'The :attribute field must only contain letters and numbers.',
    'array' => 'The :attribute field must be an array.',
    'ascii' => 'The :attribute field must only contain single-byte alphanumeric characters and symbols.',
    'before' => 'The :attribute field must be a date before :date.',
    'before_or_equal' => 'The :attribute field must be a date before or equal to :date.',
    'between' => [
        'array' => 'The :attribute field must have between :min and :max items.',
        'file' => 'The :attribute field must be between :min and :max kilobytes.',
        'numeric' => 'فیلد :attribute مقدارش باید بین :min و :max باشد.',
        'string' => 'The :attribute field must be between :min and :max characters.',
    ],
    'boolean' => 'The :attribute field must be true or false.',
    'can' => 'The :attribute field contains an unauthorized value.',
    'confirmed' => 'مقدار :attribute با تکرار پسورد مطابقت ندارد.',
    'current_password' => 'The password is incorrect.',
    'date' => 'فیلد :attribute باید یک فرمت تاریخ معتبر باشد',
    'date_equals' => 'The :attribute field must be a date equal to :date.',
    'date_format' => 'The :attribute field must match the format :format.',
    'decimal' => 'The :attribute field must have :decimal decimal places.',
    'declined' => 'The :attribute field must be declined.',
    'declined_if' => 'The :attribute field must be declined when :other is :value.',
    'different' => 'The :attribute field and :other must be different.',
    'digits' => 'تعداد ارقام :attribute شما باید :digits باشد.',
    'digits_between' => 'The :attribute field must be between :min and :max digits.',
    'dimensions' => 'The :attribute field has invalid image dimensions.',
    'distinct' => 'The :attribute field has a duplicate value.',
    'doesnt_end_with' => 'The :attribute field must not end with one of the following: :values.',
    'doesnt_start_with' => 'The :attribute field must not start with one of the following: :values.',
    'email' => 'The :attribute field must be a valid email address.',
    'ends_with' => 'The :attribute field must end with one of the following: :values.',
    'enum' => 'The selected :attribute is invalid.',
    'exists' => 'The selected :attribute is invalid.',
    'extensions' => 'The :attribute field must have one of the following extensions: :values.',
    'file' => 'The :attribute field must be a file.',
    'filled' => 'The :attribute field must have a value.',
    'gt' => [
        'array' => 'The :attribute field must have more than :value items.',
        'file' => 'The :attribute field must be greater than :value kilobytes.',
        'numeric' => 'The :attribute field must be greater than :value.',
        'string' => 'The :attribute field must be greater than :value characters.',
    ],
    'gte' => [
        'array' => 'The :attribute field must have :value items or more.',
        'file' => 'The :attribute field must be greater than or equal to :value kilobytes.',
        'numeric' => 'The :attribute field must be greater than or equal to :value.',
        'string' => 'The :attribute field must be greater than or equal to :value characters.',
    ],
    'hex_color' => 'The :attribute field must be a valid hexadecimal color.',
    'image' => ' باید عکس باشد :attribute' ,
    'in' => 'The selected :attribute is invalid.',
    'in_array' => 'The :attribute field must exist in :other.',
    'integer' => ' :attribute باید عدد صحیح باشد.',
    'ip' => 'The :attribute field must be a valid IP address.',
    'ipv4' => 'The :attribute field must be a valid IPv4 address.',
    'ipv6' => 'The :attribute field must be a valid IPv6 address.',
    'json' => 'The :attribute field must be a valid JSON string.',
    'lowercase' => 'The :attribute field must be lowercase.',
    'lt' => [
        'array' => 'The :attribute field must have less than :value items.',
        'file' => 'The :attribute field must be less than :value kilobytes.',
        'numeric' => 'The :attribute field must be less than :value.',
        'string' => 'The :attribute field must be less than :value characters.',
    ],
    'lte' => [
        'array' => 'The :attribute field must not have more than :value items.',
        'file' => 'The :attribute field must be less than or equal to :value kilobytes.',
        'numeric' => 'The :attribute field must be less than or equal to :value.',
        'string' => 'The :attribute field must be less than or equal to :value characters.',
    ],
    'mac_address' => 'The :attribute field must be a valid MAC address.',
    'max' => [
        'array' => 'The :attribute field must not have more than :max items.',
        'file' => 'سایز :attribute نباید  بزرگتر از :max باشد. ',
        'numeric' => 'تعداد ارقام :attribute نباید  بزرگتر از :max باشد.',
        'string' => 'کاراکترهای :attribute نباید بزرگتر از :max باشد.',
    ],
    'max_digits' => 'The :attribute field must not have more than :max digits.',
    'mimes' => 'فیلد :attribute باید یکی از انواع :values',
    'mimetypes' => 'The :attribute field must be a file of type: :values.',
    'min' => [
        'array' => 'The :attribute field must have at least :min items.',
        'file' => 'The :attribute field must be at least :min kilobytes.',
        'numeric' => 'The :attribute field must be at least :min.',
        'string' => 'The :attribute field must be at least :min characters.',
    ],
    'min_digits' => 'The :attribute field must have at least :min digits.',
    'missing' => 'The :attribute field must be missing.',
    'missing_if' => 'The :attribute field must be missing when :other is :value.',
    'missing_unless' => 'The :attribute field must be missing unless :other is :value.',
    'missing_with' => 'The :attribute field must be missing when :values is present.',
    'missing_with_all' => 'The :attribute field must be missing when :values are present.',
    'multiple_of' => 'The :attribute field must be a multiple of :value.',
    'not_in' => 'The selected :attribute is invalid.',
    'not_regex' => 'The :attribute field format is invalid.',
    'numeric' => 'فیلد :attribute باید به صورت عددی باشد.',
    'password' => [
        'letters' => 'The :attribute field must contain at least one letter.',
        'mixed' => 'The :attribute field must contain at least one uppercase and one lowercase letter.',
        'numbers' => 'The :attribute field must contain at least one number.',
        'symbols' => 'The :attribute field must contain at least one symbol.',
        'uncompromised' => 'The given :attribute has appeared in a data leak. Please choose a different :attribute.',
    ],
    'present' => 'The :attribute field must be present.',
    'present_if' => 'The :attribute field must be present when :other is :value.',
    'present_unless' => 'The :attribute field must be present unless :other is :value.',
    'present_with' => 'The :attribute field must be present when :values is present.',
    'present_with_all' => 'The :attribute field must be present when :values are present.',
    'prohibited' => 'The :attribute field is prohibited.',
    'prohibited_if' => 'The :attribute field is prohibited when :other is :value.',
    'prohibited_unless' => 'The :attribute field is prohibited unless :other is in :values.',
    'prohibits' => 'The :attribute field prohibits :other from being present.',
    'regex' => 'The :attribute field format is invalid.',
    'required' => 'وارد کردن :attribute اجباری هست.',
    'required_array_keys' => 'The :attribute field must contain entries for: :values.',
    'required_if' => 'The :attribute field is required when :other is :value.',
    'required_if_accepted' => 'The :attribute field is required when :other is accepted.',
    'required_unless' => 'The :attribute field is required unless :other is in :values.',
    'required_with' => 'The :attribute field is required when :values is present.',
    'required_with_all' => 'The :attribute field is required when :values are present.',
    'required_without' => 'The :attribute field is required when :values is not present.',
    'required_without_all' => 'The :attribute field is required when none of :values are present.',
    'same' => 'The :attribute field must match :other.',
    'size' => [
        'array' => 'The :attribute field must contain :size items.',
        'file' => 'The :attribute field must be :size kilobytes.',
        'numeric' => 'The :attribute field must be :size.',
        'string' => 'The :attribute field must be :size characters.',
    ],
    'starts_with' => 'The :attribute field must start with one of the following: :values.',
    'string' => 'مقدار :attribute باید رشته متنی باسد.',
    'timezone' => 'The :attribute field must be a valid timezone.',
    'unique' => 'این :attribute قبلا استفاده شده است',
    'uploaded' => 'The :attribute failed to upload.',
    'uppercase' => 'The :attribute field must be uppercase.',
    'url' => 'The :attribute field must be a valid URL.',
    'ulid' => 'The :attribute field must be a valid ULID.',
    'uuid' => 'The :attribute field must be a valid UUID.',

    'persian_alpha' 			=> 'حروف وارد شده باید فارسی باشد.',
    'persian_num'				=> 'عدد وارد شده باید فارسی باشد.',
    'persian_alpha_num'			=> 'حروف و عدد وارد شده باید فارسی باشد.',
    'iran_mobile'				=> 'شماره همراه قابل قبول نیست.',
    'sheba'						=> 'شماره شبا قابل قبول نیست.',
    'melli_code' 				=> 'کد ملی قابل قبول نیست.',
    'is_not_persian'			=> 'حروف غیر لاتین قابل قبول نیست.',
    'limited_array' 			=> 'فيلد مورد نظر قبل قبول نيست.',
    'unsigned_num' 				=> 'عدد مورد نظر قابل قبول نیست.',
    'alpha_space'				=> 'باید شامل حروف و فاصله باشد.',
    'a_url'						=> 'آدرس قابل قبول نیست.',
    'a_domain'					=> 'دامنه قابل قبول نیست.',
    'more' 						=> 'فیلد باید بزرگتر باشد.',
    'less'						=> 'فیلد باید کوچیکتر باشد.',
    'iran_phone' 				=> 'شماره تلفن قابل قبول نیست.',
    'iran_phone_with_area_code'	=> 'شماره تلفن قابل قبول نیست.',
    'iran_phone_or_mobile'		=> 'شماره تلفن یا همراه قابل قبول نیست.',
    'card_number' 				=> 'شماره کارت قابل قبول نیست.',
    'address'					=> 'آدرس وارد شده قابل قبول نیست.',
    'iran_postal_code'			=> 'کدپستی وارد شده قابل قبول نیست.',
    'package_name'				=> 'نام پکیج صحیح نیست.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [
        'scale' => 'متراژ' ,
        'number' => 'شماره تماس' ,
        'city' => 'شهر' ,
        'area' => 'منطقه' ,
        'image' => 'عکس' ,
        'address' => 'ادرس' ,
        'name' => 'نام' ,
        'en_name' => 'نام انگلیسی' ,
        'selling_price' => 'قیمت' ,
        'rahn_amount' => 'رهن' ,
        'rent_amount' => 'اجاره' ,
        'type_work' => 'نوع مسکن' ,
        'type_build' => 'نوع خانه' ,
        'floor_number' => 'تعداد اتاق' ,
        'expire_date' => 'زمان باقیمانده' ,
        'description' => 'توضیحات و آدرس' ,
        'elevator' => 'اسانسور' ,
        'parking' => 'پارکینگ' ,
        'store' => 'انبار' ,
        'number_of_rooms' => 'تعداد اتاق' ,
        'password_confirmation' => 'تکرار پسورد' ,
        'is_star' => 'ستاره' ,
        'code' => 'کد' ,
        'response' => 'پاسخ' ,
        'amount' => 'مبلغ' ,
        'location' => 'شهر یا روستا' ,
        'start_time' => 'زمان ورود' ,
        'end_time' => 'زمان خروج' ,
        'capacity' => 'ظزفیت' ,
        'number_of_person' => 'تعداد نفرات' ,
        'rows' => 'معماها' ,
        'rows.question.*' => 'معما' ,
        'rows.answer.*' => 'پاسخ' ,
        'rows.keyword1.*' => 'کلید 1' ,
        'rows.keyword2.*' => 'کلید 2' ,
        'rows.keyword3.*' => 'کلید 3' ,
    ],

];
