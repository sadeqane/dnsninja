<?php

namespace App\Http\Controllers\Transformers;


class Txt extends Base
{
    public function __construct()
    {
        parent::__construct("TXT");
    }
    public function transform(array $data): array
    {
        return array_merge(
            parent::transform($data),
            [
                'result' => isset($data['txtResults']) ? $data['txtResults'] : [],
            ]
        );
    }

}
