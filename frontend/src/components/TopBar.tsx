'use client'
import React, {useState, useEffect} from 'react';
import {MoonIcon, SunIcon} from "@heroicons/react/16/solid";

const TopBar = () => {

    const toggleTheme = () => {
        // Toggle the dark mode state
        setIsDarkMode(prevState => !prevState);
    };

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(isDarkMode);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem('darkMode', isDarkMode.toString());
    }, [isDarkMode]);


    return (
        <div className="container py-4 px-4 mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold  dark:text-white">DNS <span className="text-green-500">Ninja</span></h1>
            <button
                onClick={toggleTheme}
            >


                {isDarkMode ?  <SunIcon className="h-6 w-6 text-white"/> :  <MoonIcon className="h-6 w-6 text-slate-800"/>}
            </button>
        </div>
    );
};

export default TopBar;