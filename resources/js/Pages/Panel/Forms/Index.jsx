import React from 'react';
import RightMenu from "../../../Components/RightMenu";
import PanelLayout from "../../../Layouts/PloiTheme/PanelLayout";

function IndexForm({forms, config}) {

    return (
        <PanelLayout title={'List Form'} subTitle={''} trailing={(<a className="inline-flex items-center justify-center text-sm font-medium transition-all ease-in-out duration-100 focus:outline-none focus:ring border rounded-md border-primary-500 bg-primary-500 text-white shadow hover:bg-primary-400 hover:border-primary-400 focus:border-primary-700 focus:bg-primary-600 px-3 py-2 text-sm"
                                                                     target="_self"
                                                                     href="/panel/forms/create"> Create Form </a>)}>
            {forms.length === 0 && (
                <div className="p-8">
                    <div
                        className="text-left relative mx-auto flex max-w-md flex-col items-center justify-center space-y-6 rounded-lg border p-6 dark:border-gray-600">
                        <div
                            className="absolute top-0 right-0 -mt-5 -mr-5 flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow dark:bg-gray-500">
                            <i className="fa text-primary-500 text-xl dark:text-gray-300 fa-globe"></i></div>
                        <header className="max-w-xs space-y-2"><h2
                            className="text-xl font-semibold tracking-tight dark:text-gray-400">You don't have any forms
                            yet</h2><p className="text-md font-medium text-gray-500 dark:text-gray-400">Currently you do
                            not own
                            any form. Luckily Funnel.ink makes this real easy for you to do.</p></header>
                        <a disabled="false"
                           className="inline-flex items-center justify-center text-sm font-medium transition-all ease-in-out duration-100 focus:outline-none focus:ring border rounded-md border-primary-500 bg-primary-500 text-white shadow hover:bg-primary-400 hover:border-primary-400 focus:border-primary-700 focus:bg-primary-600 px-3 py-2 text-sm"
                           target="_self" href="/panel/forms/create">Create form</a></div>
                </div>)}
            <div className="min-h-screen">
                <div className="container mx-auto px-6">
                    <div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {forms.map((item, index) => (
                                <div key={index}>
                                    <div className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                                        <div className="w-full flex items-center justify-between p-6 space-x-6">
                                            <div className="flex-1 truncate">
                                                <div className="flex items-center space-x-3"><h3
                                                    className="text-gray-900 text-sm font-medium truncate">{item.title}</h3>
                                                </div>
                                                <div className="text-gray-500 mt-2 text-sm flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                                         viewBox="0 0 20 20" fill="currentColor">
                                                        <path
                                                            d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                                                        <path
                                                            d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                                                    </svg>
                                                    <div className="ml-2"><a target="_blank"
                                                                             className="hover:underline"
                                                                             href={config.app.url + '/' + item.slug}>{config.app.url}/{item.slug}</a>
                                                    </div>
                                                </div>
                                                <div className="text-gray-500 mt-2 text-sm flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                                         viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd"
                                                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                                              clipRule="evenodd"></path>
                                                    </svg>
                                                    <div className="ml-2">{item.total_leads + ' lead'}</div>
                                                </div>
                                                <div className="text-gray-500 mt-2 text-sm flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                                         viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd"
                                                              d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                                              clipRule="evenodd"></path>
                                                    </svg>
                                                    <div
                                                        className="ml-2">{item.total_views} klik
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="-mt-px flex divide-x divide-gray-200">
                                                <div className="w-0 flex-1 flex"><a
                                                    className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                                                    href={'/panel/forms/' + item.uuid + '/edit'}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                                         fill="none"
                                                         viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                                    </svg>
                                                    <span className="ml-3">Edit</span></a></div>
                                                <div className="-ml-px w-0 flex-1 flex"><a
                                                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                                                    href={'/panel/forms/' + item.uuid + '/leads'}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                                         fill="none"
                                                         viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                                    </svg>
                                                    <span className="ml-3">Lead</span></a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex-1 mt-5 flex justify-between sm:justify-end"></div>
                    </div>
                </div>
            </div>

        </PanelLayout>
    );
}

export default IndexForm;
