import React, {Component, useState} from 'react';
import Fields from "../../../../Components/Fields";

function EditMenu({setActiveTab}) {
    return (
        <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav
                className="space-y-1">
                <div
                    onClick={() => { setActiveTab('form') }}
                    className="cursor-pointer hover:text-indigo-700 group rounded-md px-3 py-2 flex items-center text-sm font-medium text-purple-600"
                    aria-current="page">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" className="flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span
                        className="capitalize">form</span></div>
                <div
                    onClick={() => { setActiveTab('response') }}
                    className="cursor-pointer hover:text-indigo-700 group rounded-md px-3 py-2 flex items-center text-sm font-medium text-gray-500"
                    aria-current="page">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" className="flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span
                        className="capitalize">response</span></div>
                <div
                    className="cursor-pointer hover:text-indigo-700 group rounded-md px-3 py-2 flex items-center text-sm font-medium text-gray-500"
                    aria-current="page">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" className="flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                    </svg>
                    <span className="capitalize">setting</span>
                </div>
                <div
                    className="cursor-pointer hover:text-indigo-700 group rounded-md px-3 py-2 flex items-center text-sm font-medium text-gray-500"
                    aria-current="page">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" className="flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                    </svg>
                    <span className="capitalize">automation</span></div>
                <div
                    className="cursor-pointer hover:text-indigo-700 group rounded-md px-3 py-2 flex items-center text-sm font-medium text-gray-500"
                    aria-current="page">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" className="flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                    </svg>
                    <span className="capitalize">integration</span></div>
                <div
                    className="cursor-pointer hover:text-indigo-700 group rounded-md px-3 py-2 flex items-center text-sm font-medium text-gray-500"
                    aria-current="page">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" className="flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                    </svg>
                    <span className="capitalize">embed</span></div>
            </nav>
        </aside>

    );

}

export default EditMenu;