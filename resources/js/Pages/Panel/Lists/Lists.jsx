import React, {Component} from 'react';
import PanelLayout from "../../../Layouts/PloiTheme/PanelLayout";
import ListsTilesCard from "./partials/ListsTilesCard";

function Lists({lists}) {
    return (
        <div>
            <PanelLayout title={'Lists'} trailing={(
                <a className="inline-flex items-center justify-center text-sm font-medium transition-all ease-in-out duration-100 focus:outline-none focus:ring border rounded-md border-primary-500 bg-primary-500 text-white shadow hover:bg-primary-400 hover:border-primary-400 focus:border-primary-700 focus:bg-primary-600 px-3 py-2 text-sm"
                   target="_self"
                   href="/panel/lists/create"> Create List </a>)}>
                {lists.length === 0 && (
                    <div className="p-8">
                        <div
                            className="text-left relative mx-auto flex max-w-md flex-col items-center justify-center space-y-6 rounded-lg border p-6 dark:border-gray-600">
                            <div
                                className="absolute top-0 right-0 -mt-5 -mr-5 flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow dark:bg-gray-500">
                                <i className="fa text-primary-500 text-xl dark:text-gray-300 fa-globe"></i></div>
                            <header className="max-w-xs space-y-2"><h2
                                className="text-xl font-semibold tracking-tight dark:text-gray-400">You don't have any
                                lists
                                yet</h2><p className="text-md font-medium text-gray-500 dark:text-gray-400">Currently
                                you do
                                not own
                                any lists. Luckily AdminSelvi makes this real easy for you to do.</p></header>
                            <a disabled={false}
                               className="inline-flex items-center justify-center text-sm font-medium transition-all ease-in-out duration-100 focus:outline-none focus:ring border rounded-md border-primary-500 bg-primary-500 text-white shadow hover:bg-primary-400 hover:border-primary-400 focus:border-primary-700 focus:bg-primary-600 px-3 py-2 text-sm"
                               target="_self" href="/panel/lists/create">Create list</a></div>
                    </div>)}
                <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    <div className="grid grid-cols-12 gap-6">
                        {
                            lists.map(item => {
                                return (
                                    <ListsTilesCard
                                        key={item.id}
                                        link={'/panel/lists/' + item.uuid + '/edit'}
                                        deleteLink={'/panel/lists/' + item.uuid + '/delete'}
                                        total={(item.contacts).length}
                                        name={item.name}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </PanelLayout>
        </div>
    );
}

export default Lists;