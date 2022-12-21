import React from 'react';
import {useForm} from "@inertiajs/inertia-react";
import {toast} from "react-toastify";
import SwitchButton from "../../../../Components/SwitchButton";

function SettingTab({form, setting, transform}) {
    const {data, setData} = useForm({
        title: setting.title,
        slug: setting.slug,
        settings: setting.settings,
    });
    const formulir = useForm({});

    function handleChange(key, value) {
        setData(key, value);
        if (key === 'title') {
            tranform({title: value, slug: data.slug, settings: data.settings});
        }
        if (key === 'slug') {
            transform({title: data.title, slug: value, settings: data.settings});
        }
        if(key === 'enableCookies'){
            data.settings.enableCookies = value;
            transform({settings: data.settings, title: data.title, slug: data.slug});
        }
    }

    async function deleteForm() {
        if (confirm('Are you sure?')) {
            window.location.href = '/panel/forms/' + form.uuid + '/delete';
            return true;
        }
        return false;
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
                <div className="flex items-center">
                    <SwitchButton name="enableCookies" value={data.settings.enableCookies} onChanged={handleChange} />
                    <span className="ml-3" id="toggleLabel"><span
                        className="text-sm font-medium text-gray-900">Aktifkan Session </span></span></div>
                <span className="text-sm mt-3 text-gray-500">jika session di aktifkan, maka lead yang sudah isi form akan langsung di redirect ke halaman response</span>

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
                                           value={window.location.origin + '/form/'}
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
                <div className="mt-10">
                    <button type="button"
                            onClick={deleteForm}
                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Hapus
                        Form
                    </button>
                </div>

            </div>
        </div>
    );

}

export default SettingTab;