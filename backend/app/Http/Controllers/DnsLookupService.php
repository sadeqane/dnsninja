<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

use GuzzleHttp\Client;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Item;
use League\Fractal\Serializer\ArraySerializer;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

class DnsLookupService extends Controller
{
    private $apiKey;
    private $client;
    private $domain;
    private $recordType;
    private  $availableRecordTypes = ["a", "mx", "ns", "txt", "soa", "aaaa"];

    public function __construct()
    {
        $this->apiKey = "52hKSoo65rsULtcWtVTmPzcfOiLBKH1w"; // todo It would be better to read from env
        $this->client = new Client();
    }

    public function lookup(Request $request)
    {
        try {
            // Validate Data
            $validator = Validator::make($request->all(), [
                'domain' => "required|regex:/^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.?$/",
                'recordType' => "required|in:" . implode(",", $this->availableRecordTypes), // Adjust supported record types
            ]);

            if ($validator->fails()) {
                $formattedErrors = ['Error' => $validator->errors()->all()];
                return response()->json($formattedErrors, 422);
            }
            $this->domain = $request->input("domain");
            $this->recordType = $request->input("recordType");

            // Fetch data
            $raw_data = $this->fetchData();

            // Serialize data
            return response()->json($this->serializeData($raw_data));
        } catch (Exception $e) {
            // Handle errors
            return response()->json(["Error" => $e->getMessage()], 500);
        }
    }

    private function fetchData()
    {
        $cacheKey = "dnsapp:$this->domain";

        if (Cache::has($cacheKey)) {
            // Use cached data
            $data2 = Cache::get($cacheKey);
            // we consider `1ms` when we get data from cache
            $data2["processResponseTime"] = "1ms";
        } else {
            $data = $this->callApi();
            $data2 = json_decode($data->getBody(), true);
            $ttl  = $data2['soaResult']["defaultTTL"];
            Cache::put($cacheKey, $data2, $ttl);
        }

        return ($data2);
    }
    private function callApi()
    {
        try {
            $url = "https://api.apilayer.com/dns_lookup/api/any/$this->domain";
            return  $this->client->request('GET', $url, [
                'headers' => [
                    'Content-Type' => 'text/plain',
                    'apikey' => $this->apiKey,
                ],
            ]);
        } catch (Exception $e) {
            throw new Exception("Error in calling API : " . $e->getMessage(), $e->getCode(), $e);
        }
    }

    private function serializeData($raw_data)
    {
        try {
            return $this->extractData($raw_data);
        } catch (Exception $e) {
            throw new Exception("Error in serializing data : " . $e->getMessage(), $e->getCode(), $e);
        }
    }

    private function extractData($data)
    {
        $_class = 'App\Http\Controllers\Transformers\\' . ucfirst(strtolower($this->recordType));
        $manager = new Manager();
        $manager->setSerializer(new ArraySerializer());

        $fractal = new Item($data, resolve($_class));

        $transformedData = $manager->createData($fractal);

        $result = $transformedData->toArray();

        return $result;
    }
}
