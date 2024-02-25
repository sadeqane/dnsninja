import React from "react";


interface ErrorComponentProps {
    msg: string;
}

export const ErrorComp: React.FC<ErrorComponentProps> = ({msg}) => {

    return (
        <>
            <div role="alert" className="mt-8 w-full md:max-w-[800px] px-4">
                <div className=" bg-red-400 text-white font-bold rounded-t px-4 py-2">
                    Oops!
                </div>
                <div className="border border-t-0 border-red-200 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>{msg}</p>
                </div>
            </div>
        </>
    );
};