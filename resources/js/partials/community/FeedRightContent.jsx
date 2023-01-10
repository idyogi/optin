import React, {useState, useEffect} from 'react';

function FeedRightContent() {
    const [data, setData] = useState([]);
    const fetchData = () => {
        fetch('/panel/fetchLastLeads')
            .then(response => response.json())
            .then(function (data) {
                setData(data)
            });
    };
    // Fake update every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            // setCounter(counter + 1);
            fetchData();
        }, 2000);
        return () => clearInterval(interval)
    },);
    return (
        <div className="w-full hidden xl:block xl:w-72">
            <div
                className="lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar">
                <div className="md:py-8">

                    {/* Blocks */}
                    <div className="space-y-4">

                        {/* Block 3 */}
                        <div className="bg-slate-50 p-4 rounded border border-slate-200">
                            <div className="text-xs font-semibold text-slate-400 uppercase mb-4">Lead terakhir</div>
                            <ul className="space-y-3">
                                {data.map((item, index) => (
                                    <li key={index}>
                                        <div className="text-sm mb-1">
                                            <a className="font-medium text-slate-800" href="#0">
                                                {item.phone} {item.name} {item.is_new_contact ? <span className="text-green-500">New</span> : ''}
                                            </a>
                                        </div>
                                        <div className="text-xs text-slate-500">{item.time}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedRightContent;
