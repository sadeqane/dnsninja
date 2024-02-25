import {
    CheckCircleIcon
} from "@heroicons/react/16/solid";
import copy from 'clipboard-copy';
import React, {useEffect, useState} from "react";
import exp from "node:constants";


interface DNSRecordsComponentProps {
    records: any[];
}

export const DNSInfoRow: React.FC<DNSRecordsComponentProps> = ({records}) => {


    const [headers, setHeaders] = useState([''])
    const [clipboardText, setClipboardText] = useState('')

    useEffect(() => {
        const headers = Object.keys(records[0]);
        setHeaders(headers);
    }, [records]);

    const handleCopyClick = (textToCopy: string, title: string) => {
        setShowToast(true);
        setClipboardText(title + " " + textToCopy)
        copy(textToCopy);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    const [showToast, setShowToast] = useState(false);


    function camelToHuman(camelCaseString: string) {
        return camelCaseString.replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/\b\w/g, firstChar => firstChar.toUpperCase());
    }

    return (
        <>
            <div className="container mx-auto flex items-center justify-center">

                {showToast && (

                    <div
                        className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md absolute bottom-10 right-10 mt-2 mr-2"
                        role="alert">
                        <div className="flex">
                            <p>
                                <span>
                                <CheckCircleIcon className="w-5 h-5 text-green-500 inline mr-2"/>
                                </span>
                                <span className="font-bold"> {clipboardText} </span>
                                copied to clipboard.
                            </p>
                        </div>
                    </div>

                )
                }

                <table
                    className="w-full flex flex-row flex-no-wrap sm:shadow-lg my-5 bg-white dark:bg-[#202333] shadow-md rounded-md overflow-hidden">
                    <thead className="bg-green-200 dark:bg-[#282937] text-gray-700 dark:text-white">

                    {records.map((record, index) => (
                        <tr key={index} className="flex flex-col flex-no wrap sm:table-row">
                            <th className="py-4 px-4 text-left">#</th>
                            {headers.map((header, index) => (
                                <th key={index} className="py-4 px-4 text-left">{camelToHuman(header)}</th>
                            ))}
                        </tr>
                    ))}


                    </thead>
                    <tbody className="text-gray-700 dark:bg-[#202333] dark:text-white flex-1 sm:flex-none">

                    {records.map((record, index) => (
                            <tr key={index}
                                className={"even:bg-green-50 dark:even:bg-slate-800 flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"}>
                                <td className="py-4 px-4">{index + 1}</td>

                                {headers.map((header, index2) => (
                                    <td key={index2} className="py-4 px-4">
                                        <span className="hover:cursor-copy" onClick={(e) => {
                                            handleCopyClick(record[header], header)
                                        }}>
                                            {record[header]}</span>
                                    </td>
                                ))}

                            </tr>


                        )
                    )}


                    </tbody>
                </table>
            </div>
        </>
    )
        ;
}