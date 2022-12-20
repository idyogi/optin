import React, {Component, useState} from 'react';
import Fields from "../../../../Components/Fields";

function EditMenu({setActiveTab}) {
    return (
        <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav
                className="space-y-1">
                <div
                    onClick={() => {
                        setActiveTab('form')
                    }}
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
                    onClick={() => {
                        setActiveTab('response')
                    }}
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
                    onClick={() => {
                        setActiveTab('settings')
                    }}

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
            </nav>
        </aside>

    );

}

export default EditMenu;