import React from 'react';
import {useForm} from "@inertiajs/inertia-react";

function SettingTab({setting, transform}) {
    const {data, setData} = useForm({
        title: setting.title,
        slug: setting.slug,
    });

    function handleChange(key, value) {
        setData(key, value);
        if(key === 'title') {
            tranform({title: value, slug: data.slug});
        }
        if(key === 'slug') {
            transform({title: data.title, slug: value});
        }
    }

    return (
        <div>
            <div className="bg-white shadow-xl sm:rounded-lg p-6">
                <div className="relative mt-3 mb-4">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-start"><span
                        className="pr-3 bg-white text-lg font-medium text-gray-900"> Form Meta </span></div>
                </div>
                <div className="mb-3"><label className="mb-3" htmlFor="title">Title Form</label>
                    <input type="text"
                           name="title"
                           id="title"
                           value={data.title}
                           onChange={e => handleChange('title', e.target.value)}
                           className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none w-full py-1 mt-2 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                           placeholder="Untitled Form"/>
                </div>

                <div className="relative mt-10 mb-4">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-start"><span
                        className="pr-3 bg-white text-lg font-medium text-gray-900"> Domain Setting </span></div>
                </div>
                <div>
                    <div className="flex flex-wrap">

                        <div className="w-1/2">
                            <div className=""><label className="mb-3" htmlFor="">Domain</label>
                                <div className="relative rounded-md shadow-sm">

                                    <input type="text"
                                           value={window.location.origin+'/form/'}
                                           disabled={true}
                                           className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none mt-2 w-full py-1 rounded-tl-none rounded-bl-none border-l-0 px-2 mb-1 text-base leading-normal bg-white text-gray-500 sm:text-sm border border-gray-200 rounded"
                                           /></div>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className=""><label className="mb-3" htmlFor="">Slug</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div
                                        className="absolute inset-y-0 left-0 pr-3 flex items-center pointer-events-none">
                                       </div>
                                    <input type="text"
                                           value={data.slug}
                                           onChange={e => handleChange('slug', e.target.value)}
                                           className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none mt-2 w-full py-1 rounded-tl-none rounded-bl-none border-l-0 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                           placeholder="Slug"/></div>
                            </div>
                        </div>
                    </div>
                    <p id="url-alert"></p></div>

            </div>
        </div>
    );

}

export default SettingTab;