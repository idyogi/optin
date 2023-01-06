import React, {useEffect, useState} from 'react';
import Icon from '../../../../public/images/icon-01.svg';
function DashboardCardToday({lead}) {
    const [data, setData] = useState(0);

    const fetchData = () => {
        fetch('/panel/fetch30d')
            .then(response => response.json())
            .then(function (data) {
                setData(data[data.length - 1]);

            });
    };
    useEffect(() => {
        const interval = setInterval(() => {
            // setCounter(counter + 1);
            fetchData();
        }, 2000);
    }, []);
    return (
        <div
            className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
            <div className="px-5 pt-5">
                <header className="flex justify-between items-start mb-2">
                    {/* Icon */}
                    <img src={Icon} width="32" height="32" alt="Icon 01"/>
                    {/* Menu button */}
                </header>
                <h2 className="text-lg font-semibold text-slate-800 mb-2">Today</h2>
                <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Leads</div>
                <div className="flex items-start">
                    <div className="text-3xl font-bold text-slate-800 mr-2">{data}</div>
                </div>
            </div>
            {/* Chart built with Chart.js 3 */}
            <div className="grow">
                {/* Change the height attribute to adjust the chart height */}
            </div>
        </div>
    );
}

export default DashboardCardToday;
