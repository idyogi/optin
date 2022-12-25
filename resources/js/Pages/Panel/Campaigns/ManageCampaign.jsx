import React from 'react';
import PanelLayout from "../../../Layouts/PloiTheme/PanelLayout";

function ManageCampaign({campaign}) {
    return (
        <div>
            <PanelLayout title={'Campaign'}>
                <div className="py-6">
                    <div className="mx-auto w-full px-8 max-w-5xl">
                        <form
                            className="divide-y divide-gray-200 rounded-lg bg-white shadow dark:divide-gray-800 dark:bg-gray-700 dark:text-gray-300">
                            <div className="px-6 py-5">
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                    <div className="col-span-1"><h2 className="text-md font-medium">New campaign</h2><p
                                        className="mt-2 text-sm text-gray-500 dark:text-gray-400">Send or schedule your
                                        message to contact lists</p></div>
                                    <div className="col-span-1 space-y-6 lg:col-span-2">
                                        <div className="grid gap-4">
                                            <div><label
                                                className="inline-block text-sm font-medium dark:text-gray-300">Title</label>
                                                <div className="mt-1">
                                                    <input
                                                        className="form-input border-gray-300 focus:border-blue-300 w-full shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-900 rounded-md"
                                                        type="text" placeholder="Untitled Campaign"/></div>
                                            </div>
                                            <div><label
                                                className="inline-block text-sm font-medium dark:text-gray-300"> Select
                                                lists </label><select multiple=""
                                                                      className="form-input dark:border-gray-900 dark:bg-gray-800 dark:text-gray-300 form-select w-full rounded-md shadow-sm mt-1"></select>
                                            </div>
                                            <div><label
                                                className="inline-block text-sm font-medium dark:text-gray-300">Messages</label><textarea
                                                className="form-textarea w-full rounded-md shadow-sm mt-1 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-900"
                                                rows="3" placeholder=""></textarea><p
                                                className="mt-1 text-sm text-gray-500 dark:text-gray-400">Enter your
                                                Whatsapp messages here</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <footer
                                className="rounded-b-lg bg-gray-50 px-6 py-3 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                <div className="flex items-center justify-end space-x-2">
                                    <a disabled="false"
                                       className="inline-flex items-center justify-center text-sm font-medium transition-all ease-in-out duration-100 focus:outline-none focus:ring border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-300 shadow-sm hover:bg-gray-50 focus:border-gray-400 focus:bg-white px-3 py-2 text-sm"
                                       target="_self"
                                       href="/panel/campaigns">Cancel</a>
                                    <button
                                        className="inline-flex items-center justify-center text-sm font-medium transition-all ease-in-out duration-100 focus:outline-none focus:ring border rounded-md border-primary-500 bg-primary-500 text-white shadow hover:bg-primary-400 hover:border-primary-400 focus:border-primary-700 focus:bg-primary-600 px-3 py-2 text-sm">Save
                                        campaign
                                    </button>
                                </div>
                            </footer>
                        </form>
                    </div>
                </div>
            </PanelLayout>
        </div>
    );
}

export default ManageCampaign;