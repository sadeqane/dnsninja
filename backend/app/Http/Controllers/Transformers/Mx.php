<?php

namespace App\Http\Controllers\Transformers;


class Mx extends Base
{

    public function __construct()
    {
        parent::__construct("MX");
    }
    public function transform(array $data): array
    {

        return array_merge(
            parent::transform($data),
            [
                'result' => isset($data['mxResults']) ? $data['mxResults'] : [],
            ]
        );
    }
}
