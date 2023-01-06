import React, {useState} from 'react';
import PanelLayout from "../../../Layouts/PloiTheme/PanelLayout";
import {useForm} from "@inertiajs/inertia-react";
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import moment from "moment";
import DatePicker2 from "../../../Components/DatePicker2";
import {getCurrentUrl} from "../../../utils/helper";
import {Inertia} from "@inertiajs/inertia";
import {toast} from "react-toastify";
import TableData from "../../../Components/TableData";

function ManageCampaign({list, contacts, forms}) {
    const form = useForm(list || {});
    const [lead_form_id, setLeadFormId] = useState(forms[0].uuid);
    const {data, setData, post, processing, errors} = form;
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    console.log('lead_form_id', lead_form_id)

    const handlePublish = () => {
        Inertia.put('/panel/lists/' + list.uuid, {
            ...data
        }, {
            preserveScroll: true,
            onSuccess: () => {
                //reload page
                Inertia.reload();
                toast.success('Lists has been updated');
            },
            onError: () => toast.error('Failed to update list')
        });
    }

    return (
        <div>
            <PanelLayout title={data.name}>
                <div className="py-6">
                    <div className="mx-auto w-full px-8">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <div className="col-span-1">
                                <div className="space-y-6">
                                    <form onSubmit={handleSubmit}
                                          className="divide-y divide-gray-200 rounded-lg bg-white shadow dark:divide-gray-800 dark:bg-gray-700 dark:text-gray-300">

                                        <div
                                            className="space-y-4 rounded-lg border border-gray-200 p-8 dark:border-gray-600 dark:text-gray-300">
                                            <div className="col-span-4">
                                                <div><label
                                                    className="inline-block text-sm font-medium dark:text-gray-300">Title</label>
                                                    <div className="mt-1"><input
                                                        value={data.name}
                                                        onChange={(e) => setData('name', e.target.value)}
                                                        className="form-input border-gray-300 focus:border-blue-300 w-full shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-900 rounded-md"
                                                        type="text" placeholder=""/></div>
                                                </div>
                                            </div>
                                        </div>
                                        <footer
                                            className="rounded-b-lg bg-gray-50 px-6 py-3 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                            <div className="flex items-center justify-end space-x-2">

                                                <button
                                                    onClick={handlePublish}
                                                    className="inline-flex items-center justify-center text-sm font-medium transition-all ease-in-out duration-100 focus:outline-none focus:ring border rounded-md border-primary-500 bg-primary-500 text-white shadow hover:bg-primary-400 hover:border-primary-400 focus:border-primary-700 focus:bg-primary-600 px-3 py-2 text-sm">
                                                    Save
                                                </button>
                                            </div>
                                        </footer>
                                    </form>

                                    <div
                                        className="divide-y divide-gray-200 rounded-lg bg-white shadow dark:divide-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                        <div className="px-6 py-5">
                                            <div className="grid grid-cols-1 gap-6 divide-gray-50 lg:grid-cols-3">
                                                <div className="col-span-1"><h2 className="text-md font-medium">Import
                                                    lead</h2><p
                                                    className="mt-2 text-sm text-gray-500 dark:text-gray-300">import
                                                    lead dari form.</p></div>
                                                <div className="col-span-1 space-y-6 lg:col-span-2">
                                                    <div className="grid gap-4">
                                                        <div>
                                                            <label
                                                                className="inline-block text-sm font-medium dark:text-gray-300">Form
                                                                Lead</label>
                                                            <select
                                                                onChange={(e) => setLeadFormId(e.target.value)}
                                                                className="form-select w-full rounded-md shadow-sm mt-1 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-900">

                                                                {forms.map((item) => (
                                                                    <option key={item.uuid}
                                                                            value={item.uuid}>{item.title}</option>
                                                                ))}
                                                            </select></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <footer
                                            className="rounded-b-lg bg-gray-50 px-6 py-3 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => Inertia.post('/panel/lists/import', {
                                                        lead_form_id: ''+lead_form_id,
                                                        list_id: list.uuid
                                                    }, {
                                                        preserveScroll: true,
                                                        onSuccess: () => {
                                                            //reload page
                                                            Inertia.reload();
                                                            toast.success('Lists has been updated');
                                                        },
                                                        onError: () => toast.error('Failed to update list')
                                                    })}
                                                    className="inline-flex items-center justify-center text-sm font-medium transition-all ease-in-out duration-100 focus:outline-none focus:ring border rounded-md border-primary-500 bg-primary-500 text-white shadow hover:bg-primary-400 hover:border-primary-400 focus:border-primary-700 focus:bg-primary-600 px-3 py-2 text-sm">
                                                    Import lead
                                                </button>
                                            </div>
                                        </footer>
                                    </div>

                                </div>
                            </div>
                            <div className="col-span-1 space-y-6 lg:col-span-2">
                                <TableData
                                    title={'Contacts'}
                                    headers={['Name', 'Phone', 'Status', 'Updated at']}
                                    pagination={contacts.links}>
                                    {contacts.data.map((contact, index) => {
                                        return (<tr key={index}>
                                                <td className="px-4 py-2">
                                                    {contact.name}</td>
                                                <td className="px-4 py-2">
                                                    {contact.phone}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {contact.status}
                                                </td>

                                                <td className="px-4 py-2">
                                                    {moment(contact.updated_at).format('DD/MM/YYYY HH:mm')}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </TableData>
                            </div>
                        </div>

                    </div>
                </div>
            </PanelLayout>
        </div>
    );
}

export default ManageCampaign;