import React, {useState} from 'react';
import RightMenu from "../../../Components/RightMenu";
import Fields from "../../../Components/Fields";
import {useForm, usePage} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PanelLayout from "../../../Layouts/PloiTheme/PanelLayout";

function EditForm({form, fields, formatFields, submitButton, config}) {
    const {flash} = usePage().props
    const {data, setData} = useForm(fields);
    const [submitField, setSubmitField] = useState(submitButton);
    const handleChanges = (fieldList) => {
        setData(fieldList);
    }

    const handleSubmitChanges = (value) => {
        setSubmitField(value);
    }


    function handlePublish() {
        console.log(data);
        Inertia.put('/panel/forms/' + form.uuid, {fields: data, submitButton: submitField}, {
            preserveScroll: true,
            onSuccess: () => toast('Form updated successfully'),
            onError: () => toast.error('Failed to update form')
        });
    }

    return (
        <PanelLayout title={'Edit Form'} subTitle={(<a target="_blank" className="hover:underline flex"
                                                       href={config.app.url + /form/ + form.slug}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                 fill="currentColor">
                <path
                    d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                <path
                    d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
            </svg>
            <div className="ml-2">{config.app.url}/form/{form.slug}</div>
        </a>)} trailing={(<button onClick={handlePublish}
                                  className="inline-flex items-center justify-center text-sm font-medium transition-all ease-in-out duration-100 focus:outline-none focus:ring border rounded-md border-primary-500 bg-primary-500 text-white shadow hover:bg-primary-400 hover:border-primary-400 focus:border-primary-700 focus:bg-primary-600 px-3 py-2 text-sm"
        >Simpan
            Form
        </button>)}>
            <div className="min-h-screen">

                <div className="container mx-auto px-6">
                    <div className="mx-auto sm:px-6 lg:px-8">
                        <div className="">
                            <div className="">
                                <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                                    <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
                                        <nav
                                            className="space-y-1">
                                            <div
                                                className="cursor-pointer hover:text-indigo-700 group rounded-md px-3 py-2 flex items-center text-sm font-medium text-purple-600"
                                                aria-current="page">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor" className="flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          strokeWidth="2"
                                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                </svg>
                                                <span
                                                    className="capitalize">form</span></div>
                                            <div
                                                className="cursor-pointer hover:text-indigo-700 group rounded-md px-3 py-2 flex items-center text-sm font-medium text-gray-500"
                                                aria-current="page">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor" className="flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          strokeWidth="2"
                                                          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                </svg>
                                                <span
                                                    className="capitalize">response</span></div>
                                            <div
                                                className="cursor-pointer hover:text-indigo-700 group rounded-md px-3 py-2 flex items-center text-sm font-medium text-gray-500"
                                                aria-current="page">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor" className="flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          strokeWidth="2"
                                                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                                                </svg>
                                                <span className="capitalize">setting</span>
                                            </div>
                                            <div
                                                className="cursor-pointer hover:text-indigo-700 group rounded-md px-3 py-2 flex items-center text-sm font-medium text-gray-500"
                                                aria-current="page">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor" className="flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          strokeWidth="2"
                                                          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                                                </svg>
                                                <span className="capitalize">automation</span></div>
                                            <div
                                                className="cursor-pointer hover:text-indigo-700 group rounded-md px-3 py-2 flex items-center text-sm font-medium text-gray-500"
                                                aria-current="page">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor" className="flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          strokeWidth="2"
                                                          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                                                </svg>
                                                <span className="capitalize">integration</span></div>
                                            <div
                                                className="cursor-pointer hover:text-indigo-700 group rounded-md px-3 py-2 flex items-center text-sm font-medium text-gray-500"
                                                aria-current="page">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor" className="flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          strokeWidth="2"
                                                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                                                </svg>
                                                <span className="capitalize">embed</span></div>
                                        </nav>
                                    </aside>
                                    <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 xl:col-span-6">
                                        <div className="bg-white shadow-xl sm:rounded-lg pt-1">
                                            <Fields fields={data} formatFields={formatFields} submitField={submitField}
                                                    form={form}
                                                    transform={handleChanges}
                                                    handleSubmitChanges={handleSubmitChanges}/>


                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PanelLayout>
    );
}


export default EditForm;
