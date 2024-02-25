<?php

namespace App\Http\Controllers\Transformers;

use League\Fractal\TransformerAbstract;

class Base extends TransformerAbstract
{
    protected $requestType;

    public function __construct($requestType)
    {
        $this->requestType = $requestType;
    }
    public function transform(array $data): array
    {
        return [
            'processResponseTime' => $data['processResponseTime'],
            'domain' => $data['domain'],
            'requestType' => $this->requestType,
            'warnings' => $data['warnings'],
        ];
    }
}


