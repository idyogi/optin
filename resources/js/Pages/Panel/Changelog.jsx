import React from 'react';
import PanelLayout from "../../Layouts/PloiTheme/PanelLayout";

function Changelog() {

    return (
        <div>
            <PanelLayout title={'Changelog'}>
                <div className="mx-auto w-full px-8 w-full">
                    <div className="lg:col-span-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"><div
                            className="focus:ring-primary-200 block transform space-y-6 rounded-lg bg-white p-5 shadow transition hover:-translate-y-1 focus:outline-none focus:ring-4 dark:bg-gray-700 dark:text-gray-300"

                        ><h2
                            className="text-lg font-semibold">3 September</h2><span
                            className="text-sm text-gray-400">Fitur broadcast</span><p
                            className="text-gray-500 dark:text-gray-400">
                            - Create List<br/>
                            - Create Campaign<br/>
                            - Create Device<br/>
                            - Scheduler<br/>
                        </p>
                        </div>
                        </div>
                    </div>
                </div>
            </PanelLayout>
        </div>
    );
}

export default Changelog;