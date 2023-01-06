import React from 'react';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RightMenu from "../../Components/RightMenu";
import FlashMessage from "../../Components/FlashMessage";

function PanelLayout({children, footer, title = null, subTitle = null, trailing = null, showSubMenu = false}) {
    const [showMenu, setShowMenu] = React.useState(false);

    function handleMenu() {
        setShowMenu(!showMenu);
    }

    //active class menu by url
    const [activeMenu, setActiveMenu] = React.useState(null);
    React.useEffect(() => {
        const url = window.location.pathname;
        setActiveMenu(url);
    }, []);

    const pageTitle = () => (
        <div className="row g-2 align-items-center">
            <div className="col">
                {subTitle && <div className="page-subtitle">{subTitle}</div>}
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
                {showSubMenu && (
                    <div
                        className="fixed inset-y-0 left-0 mt-16 flex transition duration-200 ease-in-out lg:visible lg:sticky lg:top-0 lg:left-auto lg:mt-0 lg:h-screen lg:translate-x-0 invisible -translate-x-full transform">
                        <aside
                            className="no-scrollbar fixed sticky top-0 z-40 h-screen w-16 overflow-y-auto overflow-x-hidden bg-gray-800 text-white shadow-md">

                        </aside>
                        <aside
                            className="no-scrollbar fixed sticky top-0 z-30 h-screen w-64 overflow-y-auto border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-700">

                        </aside>
                    </div>
                )}
                {!showSubMenu && (
                    <aside
                        className={`${showMenu ? '' : 'invisible -translate-x-full transform'} fixed inset-y-0 left-0 z-30 mt-16 w-full bg-gray-800 text-white transition duration-200 ease-in-out lg:visible lg:sticky lg:top-0 lg:left-auto lg:mt-0 lg:h-screen lg:w-64 lg:translate-x-0`}>
                        <header className="flex h-16 items-center bg-gray-900 px-4">
                            <p className="text-lg">
                                <a href="/"><span
                                    className="font-bold">Admin</span>Selvi</a></p></header>

                        <ul className="my-4 space-y-2 px-2">

                            <li className="relative px-2 py-2 text-sm font-medium rounded-md">
                                <a href="/panel/forms"
                                   className={`${activeMenu === '/panel/forms' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 focus:bg-gray-900'}` + ' h-10 flex items-center w-full px-2 rounded-lg font-medium text-sm transition-all ease-in-out duration-100 focus:outline-none'}>
                                    <i className="fas fa-server mr-2 fa-fw"></i>Dashboard</a>
                            </li>
                            <li className="relative px-2 py-2 text-sm font-medium rounded-md">
                                <a href="/panel/campaigns"
                                   className={`${activeMenu === '/panel/campaigns' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 focus:bg-gray-900'}` + ' h-10 flex items-center w-full px-2 rounded-lg font-medium text-sm transition-all ease-in-out duration-100 focus:outline-none'}>
                                    <i className="fas fa-users mr-2 fa-fw"></i>Broadcast</a>
                            </li>
                            <li className="relative px-2 py-2 text-sm font-medium rounded-md">
                                <a href="/panel/changelog"
                                   className={`${activeMenu === '/panel/changelog' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 focus:bg-gray-900'}` + ' h-10 flex items-center w-full px-2 rounded-lg font-medium text-sm transition-all ease-in-out duration-100 focus:outline-none'}>
                                    <i className="fas fa-history mr-2 fa-fw"></i>Changelog</a>
                            </li>
                        </ul>
                    </aside>
                )}

                <main className="flex flex-1 flex-col">
                    <div>
                        <header
                            className="sticky top-0 z-30 flex h-16 items-center bg-white px-8 shadow dark:bg-gray-700 dark:text-white">
                            <button onClick={(e) => handleMenu()} className="mr-auto inline-block lg:hidden"><i
                                className="fas fa-bars"></i></button>
                            <div className="ml-auto flex items-center space-x-4">
                                <RightMenu/>
                            </div>
                        </header>
                    </div>
                    <div>
                        <div
                            className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                            <div><h1 className="text-xl font-medium">{title}</h1><p
                                className="text-sm text-gray-500 dark:text-gray-400">{subTitle}</p></div>
                            <div className="flex h-full items-center space-x-2">
                                {trailing}

                            </div>
                        </div>
                        <div className="py-6">
                            <div className="mx-auto w-full">
                                <div className="mx-auto w-full px-8 max-w-5xl space-y-6">
                                    <FlashMessage/>
                                </div>


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
