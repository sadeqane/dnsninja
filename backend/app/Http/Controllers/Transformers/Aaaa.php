<?php

namespace App\Http\Controllers\Transformers;

class Aaaa extends Base
{
    public function __construct()
    {
        parent::__construct("AAAA");
    }
    public function transform(array $data): array
    {
        return array_merge(
            parent::transform($data),
            [
                'result' => isset($data['aaaaResults']) ? $data['aaaaResults'] : [],
            ]
        );
    }
}
