import React from 'react';
import RightMenu from "../Components/RightMenu";
import {ToastContainer} from "react-toastify";

function PanelLayout({children, footer, title = null, subTitle = null, trailing = null}) {

    const pageTitle = () => (
        <div className="row g-2 align-items-center">
            <div className="col">
                {subTitle && <div className="page-subtitle">{subTitle} </div>}
                <h2 className="page-title">
                    {title}
                </h2>
            </div>
            <div className="col-12 col-md-auto ms-auto d-print-none">
                {trailing}
            </div>
        </div>
    )

    return (
        <div className="bg-gray-100 w-full h-full">
            <ToastContainer/>

            <nav className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white shadow">
                <div className="container mx-auto mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div
                            className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button id="headlessui-disclosure-button-17" type="button" aria-expanded="false"
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="sr-only">Open main menu</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor" className="block h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-2xl font-bold">Optin by Digisuite</h1>
                            </div>
                            <div className="hidden sm:block sm:ml-6">
                                <ul className="pr-12 flex items-center h-full"><a
                                    className="hover:text-white cursor-pointer h-full flex items-center text-sm mx-3 tracking-normal text-white  border-b-2 border-white"
                                    href="/panel/forms">Form</a><a
                                    className="hover:text-white cursor-pointer h-full flex items-center text-sm mx-3 tracking-normal text-gray-200"
                                    href="/">Tutorial</a></ul>
                            </div>
                        </div>
                        <RightMenu/>

                    </div>
                </div>
            </nav>

            {children}
        </div>
    );
}

export default PanelLayout;
