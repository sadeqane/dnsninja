<?php

namespace App\Http\Controllers\Transformers;

use League\Fractal\TransformerAbstract;


class SOA extends Base
{
    public function __construct()
    {
        parent::__construct("SOA");
    }
    public function transform(array $data): array
    {

        return array_merge(
            parent::transform($data),
            [
                'result' => isset($data['soaResult']) ? [$data['soaResult']] : [],
            ]
        );
    }
}
