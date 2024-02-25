<?php

namespace App\Http\Controllers\Transformers;

class Ns extends Base
{

    public function __construct()
    {
        parent::__construct("NS");
    }
    public function transform(array $data): array
    {
        return array_merge(
            parent::transform($data),
            [
                'result' => isset($data['nsResults']) ? $data['nsResults'] : [],
            ]
        );
    }
}
