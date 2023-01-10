import React, {useState} from 'react';
import PanelLayout from "../../../Layouts/PloiTheme/PanelLayout";
import {useForm} from "@inertiajs/inertia-react";
import moment from "moment";
import {Inertia} from "@inertiajs/inertia";
import {toast} from "react-toastify";
import TableData from "../../../Components/TableData";
import Paginate from "../../../Components/Paginate";

function ManageCampaign({list, contacts, forms}) {
    const form = useForm(list || {});
    const [lead_form_id, setLeadFormId] = useState(forms[0].uuid);
    const {data, setData} = form;
    const handleSubmit = (e) => {
        e.preventDefault();
    }

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
    const dataFile = useForm({
        file: null,
        lead_form_id: lead_form_id
    })

    function submitFile(e) {
        e.preventDefault()
        dataFile.post('/panel/lists/' + list.uuid + '/importFile')
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
                                        <form onSubmit={submitFile}>
                                            <div className="px-6 py-5">
                                                <div className="">
                                                    <div className="col-span-1"><h2
                                                        className="text-md font-medium">Import
                                                        file excel</h2>
                                                        <div className="grid gap-4">
                                                            <div>


                                                                <input type="file"
                                                                       onChange={e => dataFile.setData('file', e.target.files[0])}/>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <footer
                                                className="rounded-b-lg bg-gray-50 px-6 py-3 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                                <div className="flex items-center justify-end space-x-2">
                                                        <label><a href={location.protocol + "//" + location.host + '/template.xlsx'} className="text-primary-600 dark:text-primary-400 border-primary-200 border-b border-dotted text-sm font-medium">Download template</a> </label>

                                                    <button
                                                        type="submit"
                                                        className="inline-flex items-center justify-center text-sm font-medium transition-all ease-in-out duration-100 focus:outline-none focus:ring border rounded-md border-primary-500 bg-primary-500 text-white shadow hover:bg-primary-400 hover:border-primary-400 focus:border-primary-700 focus:bg-primary-600 px-3 py-2 text-sm">
                                                        Import file
                                                    </button>
                                                </div>
                                            </footer>
                                        </form>
                                    </div>

                                </div>
                            </div>
                            <div className="col-span-1 space-y-6 lg:col-span-2">
                                <TableData
                                    title={'Contacts'}
                                    hasExport={true}
                                    headers={['Name', 'Phone', 'Status', 'Updated at']}>
                                    {contacts.data.map((contact, index) => {
                                        const data = contact.data;
                                        return (<tr key={index}>
                                                <td className="px-4 py-2">
                                                    {data.name}</td>
                                                <td className="px-4 py-2">
                                                    {data.phone}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {data.status}
                                                </td>

                                                <td className="px-4 py-2">
                                                    {moment(data.updated_at).format('DD/MM/YYYY HH:mm')}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </TableData>
                                <div className="mt-8">
                                    <Paginate pagination={contacts.links} from={contacts.from} to={contacts.to}
                                              total={contacts.total}/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </PanelLayout>
        </div>
    );
}

export default ManageCampaign;