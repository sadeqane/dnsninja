'use client'
import TopBar from "@/components/TopBar";
import {DNSInfoRow} from "@/components/DNSInfoRow";
import {AtSymbolIcon, CircleStackIcon, GlobeAltIcon} from "@heroicons/react/16/solid";
import {useEffect, useState} from "react";
import {Footer} from "@/components/Footer";
import {Header} from "@/components/Header";
import {ErrorComp} from "@/components/ErrorComp";

export default function Home() {


    const API_URL = process.env.NEXT_PUBLIC_DNS_NINJA_API ?? 'http://localhost:8080';
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isAnimating, setIsAnimating] = useState(true);
    const [domain, setDomain] = useState('');
    const [recordType, setRecordType] = useState('A');


    const handleLookup = async () => {
        try {

            setIsLoading(true);
            setError(null)

            const response = await fetch(API_URL+'/lookup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"domain": domain, "recordType": recordType.toLowerCase()}),
            });

            if (!response.ok) {
                const error = await response.json();
                if ('Error' in error) {
                    throw new Error(error["Error"]);
                } else {
                    throw new Error('Can not fetch data from API.');
                }
            }

            const data = await response.json();
            if (data["result"].length === 0) {
                if (data["warnings"].length === 0) {
                    throw new Error("No results found.");
                } else {
                    throw new Error(data["warnings"]);
                }
            }
            setIsAnimating(true)
            setResult(data);
        } catch (error: any) {
            setResult(null)
            setError(error.message);
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
            setIsAnimating(false);

        }
    };

    const handleEnter = (event: any) => {
        if (event.keyCode === 13) {
            handleLookup();
        }
    };


    return (
        <div
            className="bg-gradient-to-br  from-gray-100 to-green-200 dark:bg-gradient-to-tl dark:from-[#191727] dark:to-slate-700 min-h-screen flex flex-col">
            <TopBar/>

            <main className=" flex flex-col items-center justify-center">
                <Header/>

                <div className="mx-auto w-full md:max-w-[800px] px-4 pt-4">
                    <div className="bg-white dark:bg-[#202333] px-6 py-8 rounded-md shadow-md">
                        <div
                            className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">
                            <div className="w-full">
                                <label htmlFor="domain"
                                       className="block text-gray-800 dark:text-white text-sm font-semibold mb-3">
                                    Domain Name
                                </label>

                                <div className="relative">
                                    <span
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                      <GlobeAltIcon className="h-5 w-5 text-gray-400"/>
                                    </span>
                                    <input
                                        type="text"
                                        id="domain"
                                        name="domain"
                                        onKeyDown={handleEnter}
                                        value={domain}
                                        onChange={e => {
                                            setDomain(e.currentTarget.value);
                                        }}
                                        placeholder="Enter the domain to look up"
                                        className="w-full dark:bg-slate-800 dark:text-white pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="w-full md:w-auto ">
                                <label htmlFor="dnsType"
                                       className="block text-gray-800 dark:text-white text-sm font-semibold mb-3">DNS
                                    Type</label>
                                <select
                                    id="dnsType"
                                    name="dnsType"
                                    value={recordType}
                                    onChange={(e) => {
                                        setResult(null)
                                        setRecordType(e.target.value);
                                    }}
                                    className="w-full md:w-auto dark:bg-slate-800 dark:text-white px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                >
                                    <option value="A">A</option>
                                    <option value="AAAA">AAA</option>
                                    <option value="MX">MX</option>
                                    <option value="SOA">SOA</option>
                                    <option value="NS">NS</option>
                                    <option value="TXT">TXT</option>
                                </select>
                            </div>


                            <div className={"pt-7"}>
                                <button
                                    className={`bg-green-500 font-bold text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 ${
                                        isLoading && 'opacity-75 cursor-not-allowed'
                                    }`}
                                    onClick={handleLookup}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 rounded-full animate-spin">
                                                <AtSymbolIcon/>
                                            </div>
                                            <span>Lookup</span>
                                        </div>
                                    ) : (
                                        'Lookup'
                                    )}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                {/*<p className="border p-5 m-5">result is : {result}</p>*/}

                {result && (
                    <div className="mt-8 mb-8 md:max-w-[1000px] px-4">
                        <div
                            className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>

                            <h3 className="text-sm text-gray-500 dark:text-gray-300 mt-8 text-left">
                                Results of <span className="font-bold">{result["requestType"]}</span> records for <a
                                className="font-bold text-blue-500" href={'https://' + result["domain"]}
                                target="_blank">{result["domain"]}</a> in <span
                                className="font-light">{result["processResponseTime"]}</span> :
                            </h3>
                            <DNSInfoRow records={result["result"]}/>
                        </div>
                    </div>
                )}


                {error && (
                    <ErrorComp msg={error}/>
                )}


            </main>
            <div className="mt-auto">
                <Footer/>
            </div>
        </div>

    );
}
