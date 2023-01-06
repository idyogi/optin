import React from 'react';
import PanelLayout from "../../../Layouts/PloiTheme/PanelLayout";
import {useForm} from "@inertiajs/inertia-react";
import {FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import moment from "moment";
import DatePicker from "../../../Components/DatePicker";
import {getCurrentUrl} from "../../../utils/helper";
import {Inertia} from "@inertiajs/inertia";
import {toast} from "react-toastify";

function ManageCampaign({campaign, lists, allLists}) {
    const form = useForm(campaign || {});
    const {data, setData, post, processing, errors} = form;
    const [total, setTotal] = React.useState(0);
    //default schedule time is +1 hour from now
    const defaultScheduleTime = moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    const [selectedLists, setSelectedLists] = React.useState(lists.map((list) => list.id) || []);
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handlePublish = (isSchedule = true) => {
        let url = getCurrentUrl();
        url = url.replace('/create', '');
        url = url.replace('/edit', '');
        if (campaign) {
            form.transform((data) => {
                return {...data, _method: 'PUT'}
            });
            // add put to url
            url = url + '?_method=PUT';
        }
        Inertia.put(url, {
            ...data,
            lists: selectedLists,
            is_schedule: isSchedule,
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

    function handleChange(e) {
        const selectedID = e.target.value;
        let totalContacts = 0;
        // loop selectedID, then find the list with the same id
        allLists.forEach((list) => {
            if (selectedID.includes(list.id)) {
                totalContacts += list.contacts.length;
            }
        });
        setTotal(totalContacts);
        setSelectedLists(e.target.value);
    }

    function handleChangeSchedule(key, value) {
        setData(key, value);
    }

    return (
        <div>
            <PanelLayout title={data.name}>
                <div className="py-6">
                    <div className="mx-auto w-full px-8 max-w-5xl">
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
                                <div className="col-span-4">

                                    <label className="inline-block text-sm font-medium dark:text-gray-300">Pilih minimal
                                        satu list</label>
                                    <div className="grid max-w-xl grid-cols-4 gap-4">
                                        <div className="col-span-4">
                                            <div>
                                                <div>
                                                    <FormControl sx={{m: 1, width: 300}}>
                                                        <InputLabel id="demo-multiple-name-label">List</InputLabel>
                                                        <Select

                                                            labelId="demo-multiple-name-label"
                                                            id="demo-multiple-name"
                                                            value={selectedLists}
                                                            onChange={handleChange}
                                                            multiple
                                                            input={<OutlinedInput label="Name"/>}
                                                        >
                                                            {allLists.map((list) => (
                                                                <MenuItem
                                                                    key={list.id}
                                                                    value={list.id}
                                                                >
                                                                    {list.name} ({list.contacts.length} contacts)
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                        <FormHelperText>{total} contacts</FormHelperText>

                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="inline-block text-sm font-medium dark:text-gray-300">Whatsapp
                                        text</label>

                                    <textarea
                                        value={data.text}
                                        onChange={(e) => setData('text', e.target.value)}
                                        className="form-textarea w-full rounded-md shadow-sm mt-1 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-900"
                                        rows="3" placeholder=""></textarea></div>

                                <div>
                                    <label
                                        className="inline-block text-sm font-medium dark:text-gray-300">Schedule</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                            <DatePicker
                                                name={"scheduled_at"} datetime={data.scheduled_at}
                                                onChanged={handleChangeSchedule}/>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <footer
                                className="rounded-b-lg bg-gray-50 px-6 py-3 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                <div className="flex items-center justify-end space-x-2">
                                    <button
                                        onClick={() => Inertia.get('/panel/campaigns/' + campaign.uuid + '/delete')}
                                        type="button"
                                        //classname
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-danger-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handlePublish(false)}

                                        type="button"
                                        //classname
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-warning-500 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">

                                        Save as draft
                                    </button>
                                    {campaign.status === 'done' ? (
                                            <button
                                                onClick={() => Inertia.get('/panel/campaigns/' + campaign.uuid + '/duplicate')}
                                                type="button"
                                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-warning-500 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                Duplicate campaign
                                            </button>)
                                        :
                                        (<button
                                            onClick={() => handlePublish(true)}

                                            className="inline-flex items-center justify-center text-sm font-medium transition-all ease-in-out duration-100 focus:outline-none focus:ring border rounded-md border-primary-500 bg-primary-500 text-white shadow hover:bg-primary-400 hover:border-primary-400 focus:border-primary-700 focus:bg-primary-600 px-3 py-2 text-sm">
                                            Schedule
                                            campaign
                                        </button>)}
                                </div>
                            </footer>
                        </form>
                    </div>
                </div>
            </PanelLayout>
        </div>
    );
}

export default ManageCampaign;