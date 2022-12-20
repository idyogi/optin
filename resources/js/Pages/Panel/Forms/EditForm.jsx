import React, {useState} from 'react';
import RightMenu from "../../../Components/RightMenu";
import Fields from "../../../Components/Fields";
import {useForm, usePage} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PanelLayout from "../../../Layouts/PloiTheme/PanelLayout";
import EditMenu from "./Widget/EditMenu";
import ResponseTab from "./Widget/ResponseTab";
import SettingTab from "./Widget/SettingTab";

function EditForm({form, fields, responseFields, formatFields, submitButton, config}) {
    const [activeTab, setActiveTab] = useState('form');
    const {flash} = usePage().props
    const {data, setData} = useForm(fields);
    const responseData = useForm(responseFields);
    const settingData = useForm({
        title: form.title,
        slug: form.slug,
    });
    const [submitField, setSubmitField] = useState(submitButton);
    const handleChanges = (fieldList) => {
        setData(fieldList);
    }
    const handleResponseChanges = (fieldList) => {
        responseData.setData(fieldList);
    }
    const handleSettingChanges = (data) => {
        console.log(data);
        settingData.setData(data);
    }

    const handleSubmitChanges = (value) => {
        setSubmitField(value);
    }


    function handlePublish() {
        Inertia.put('/panel/forms/' + form.uuid, {
            fields: data,
            submitButton: submitField,
            response: responseData.data,
            settings: settingData.data,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                //reload page
                Inertia.reload();
                toast.success('Form has been updated');
            },
            onError: () => toast.error('Failed to update form')
        });
    }

    const updateActiveTab = (value) => {
        setActiveTab(value);
    };
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
                                    <EditMenu activeTab={activeTab} setActiveTab={updateActiveTab}/>
                                    <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 xl:col-span-6">
                                        {activeTab === 'form' && (
                                            <div className="bg-white shadow-xl sm:rounded-lg pt-1">
                                                <Fields fields={data} formatFields={formatFields}
                                                        submitField={submitField}
                                                        form={form}
                                                        transform={handleChanges}
                                                        handleSubmitChanges={handleSubmitChanges}/>
                                            </div>)}
                                        {activeTab === 'response' && (
                                            <ResponseTab responseFields={responseFields}
                                                         transform={handleResponseChanges}
                                                         formatFields={formatFields}/>)}
                                        {activeTab === 'settings' && (
                                            <SettingTab setting={settingData.data} transform={handleSettingChanges}/>)}

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
