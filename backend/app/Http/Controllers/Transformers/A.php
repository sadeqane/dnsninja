<?php

namespace App\Http\Controllers\Transformers;

use League\Fractal\TransformerAbstract;

class A extends Base
{
    public function __construct()
    {
        parent::__construct("A");
    }
    public function transform(array $data): array
    {

        return array_merge(
            parent::transform($data),
            [
                'result' => isset($data['aResults']) ? $data['aResults'] : [],
            ]
        );
    }
}
