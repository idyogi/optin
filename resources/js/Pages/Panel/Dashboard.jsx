import React, {useState} from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../../partials/dashboard/DashboardAvatars';
import FilterButton from '../../Components/DropdownFilter';
import Datepicker from '../../Components/DatePicker2';
import DashboardCard01 from '../../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../../partials/dashboard/DashboardCard11';
import PanelLayout from "../../Layouts/PloiTheme/PanelLayout";
import DashboardCardToday from "../../partials/dashboard/DashboardCardToday";

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