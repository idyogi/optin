import React from 'react';
import {ToastContainer} from "react-toastify";
import RightMenu from "../../Components/RightMenu";

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
        <div className="flex min-h-screen w-full flex-col bg-gray-100 font-sans antialiased dark:bg-gray-900">
            <ToastContainer/>
            <div className="flex min-h-screen w-full flex-nowrap">
                <aside
                    className="fixed inset-y-0 left-0 z-30 mt-16 w-full bg-gray-800 text-white transition duration-200 ease-in-out lg:visible lg:sticky lg:top-0 lg:left-auto lg:mt-0 lg:h-screen lg:w-64 lg:translate-x-0 invisible -translate-x-full transform">
                    <header className="flex h-16 items-center bg-gray-900 px-4"><p className="text-lg"><span
                        className="font-bold">Digi</span>suite </p></header>

                    <ul className="my-4 space-y-2 px-2">
                        <li><a target="_self"
                               className="h-10 flex items-center w-full px-2 rounded-lg font-medium text-sm transition-all ease-in-out duration-100 focus:outline-none bg-gray-900 text-white"
                               href="/panel/forms"><i className="fas fa-server mr-2 fa-fw"></i>Dashboard</a>
                        </li>
                    </ul>
                </aside>
                <main className="flex flex-1 flex-col">
                    <div>
                        <header
                            className="sticky top-0 z-30 flex h-16 items-center bg-white px-8 shadow dark:bg-gray-700 dark:text-white">
                            <button className="mr-auto inline-block lg:hidden"><i className="fas fa-bars"></i></button>
                            <div className="ml-auto flex items-center space-x-4">
                                <RightMenu/>
                            </div>
                        </header>
                    </div>
                    <div>
                        <div className="py-6">
                            <div className="mx-auto w-full">
                                {children}
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        </div>

    );
}

export default PanelLayout;
