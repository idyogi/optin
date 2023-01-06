import React, {useState} from 'react';
import PanelLayout from "../../Layouts/PloiTheme/PanelLayout";
import DashboardCardToday from "../../partials/dashboard/DashboardCardToday";
import DashboardCard05 from "../../partials/dashboard/DashboardCard05";

function Dashboard({lead}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <PanelLayout title={'Dashboard'}>
            <div className="flex">

                {/* Content area */}
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                    <main>
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                            {/* Cards */}
                            <div className="grid grid-cols-12 gap-6">

                                <DashboardCard05 lead={lead}/>
                                <DashboardCardToday lead={lead}/>

                            </div>

                        </div>
                    </main>

                </div>

            </div>
        </PanelLayout>
    );
}

export default Dashboard;