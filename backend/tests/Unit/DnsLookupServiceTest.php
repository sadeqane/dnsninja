<?php

namespace Tests\Unit;


// use PHPUnit\Framework\TestCase;

// class DnsLookupServiceTest extends TestCase
// {
//     /**
//      * A basic test example.
//      */
//     public function test_that_true_is_true(): void
//     {
//         $this->assertTrue(true);
//     }
// }

// <?php

// namespace Tests\Unit;

use Tests\TestCase;
use App\Http\Controllers\DnsLookupService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class DnsLookupServiceTest extends TestCase
{
    /**
     * Test lookup method with valid data
     *
     * @return void
     */
    public function testLookupWithValidData()
    {
        $requestData = [
            'domain' => 'example.com',
            'recordType' => 'a',
        ];

        $request = new Request($requestData);
        $service = new DnsLookupService();

        $response = $service->lookup($request);

        $this->assertEquals($response->status(),200);
    }

    /**
     * Test lookup method with invalid data
     *
     * @return void
     */
    public function testLookupWithInvalidData()
    {
        $requestData = [
            'domain' => 'invalid domain',
            'recordType' => 'invalid record type',
        ];

        $request = new Request($requestData);
        $service = new DnsLookupService();

        $response = $service->lookup($request);

        $this->assertEquals($response->status(),422); // Assuming 422 for validation failure
    }

    /**
     * Test lookup method with API call failure
     *
     * @return void
     */
    // public function testLookupWithApiCallFailure()
    // {
    //     // Mocking Cache and Client Facades
    //     Cache::shouldReceive('has')->andReturn(false);
    //     Cache::shouldReceive('put');
    //     // $this->mockGuzzleClientWithException();
    //     Http::fake([
    //         'https://api.apilayer.com/dns_lookup/*' => function ($request) {
    //             return Http::throw(new \Exception('API call failed'), 500);
    //         },
    //     ]);
    //     // $guzzleClientMock = \Mockery::mock('overload:GuzzleHttp\Client');
    //     // $guzzleClientMock->shouldReceive('request')->andThrow(new \Exception('API call failed'));

    //     $requestData = [
    //         'domain' => 'example.com',
    //         'recordType' => 'a',
    //     ];

    //     $request = new Request($requestData);
    //     $service = new DnsLookupService();

    //     $response = $service->lookup($request);

    //     // $response->assertStatus(500);
    //     $this->assertEquals($response->status(),500);
    // }

}
