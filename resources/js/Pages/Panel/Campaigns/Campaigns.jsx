import React, {Component} from 'react';
import PanelLayout from "../../../Layouts/PloiTheme/PanelLayout";

function Campaigns({campaigns}) {
    return (
        <div>
            <PanelLayout title={'Broadcast campaign'} trailing={(
                <a className="inline-flex items-center justify-center text-sm font-medium transition-all ease-in-out duration-100 focus:outline-none focus:ring border rounded-md border-primary-500 bg-primary-500 text-white shadow hover:bg-primary-400 hover:border-primary-400 focus:border-primary-700 focus:bg-primary-600 px-3 py-2 text-sm"
                   target="_self"
                   href="/panel/campaigns/create"> Create Campaign </a>)}>
                {campaigns.length === 0 && (
                    <div className="p-8">
                        <div
                            className="text-left relative mx-auto flex max-w-md flex-col items-center justify-center space-y-6 rounded-lg border p-6 dark:border-gray-600">
                            <div
                                className="absolute top-0 right-0 -mt-5 -mr-5 flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow dark:bg-gray-500">
                                <i className="fa text-primary-500 text-xl dark:text-gray-300 fa-globe"></i></div>
                            <header className="max-w-xs space-y-2"><h2
                                className="text-xl font-semibold tracking-tight dark:text-gray-400">You don't have any
                                campaigns
                                yet</h2><p className="text-md font-medium text-gray-500 dark:text-gray-400">Currently
                                you do
                                not own
                                any campaigns. Luckily Funnel.ink makes this real easy for you to do.</p></header>
                            <a disabled="false"
                               className="inline-flex items-center justify-center text-sm font-medium transition-all ease-in-out duration-100 focus:outline-none focus:ring border rounded-md border-primary-500 bg-primary-500 text-white shadow hover:bg-primary-400 hover:border-primary-400 focus:border-primary-700 focus:bg-primary-600 px-3 py-2 text-sm"
                               target="_self" href="/panel/campaigns/create">Create campaign</a></div>
                    </div>)}
            </PanelLayout>
        </div>
    );
}

export default Campaigns;