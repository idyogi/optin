import React, {useEffect, useState} from 'react';
import PanelLayout from "../../../Layouts/PloiTheme/PanelLayout";
import {useForm} from "@inertiajs/inertia-react";
import moment from "moment";
import {toast} from 'react-toastify';
import io from 'socket.io-client';
import {Inertia} from "@inertiajs/inertia";
import {MenuItem, OutlinedInput, Select} from "@mui/material";


function ManageStaff({staff, roles}) {

    const form = useForm({
        name: staff.name ?? '',
        email: staff.email ?? '',
        role: staff.role ?? '2',
        password: '',
    });
    const {data, setData} = form;
    const [selected, setSelected] = React.useState(staff.role ?? '2');

    const publicSubmit = (e) => {
        if(staff.id === undefined) {
            Inertia.post('/panel/staff/', data);
        } else {
            Inertia.put('/panel/staff/' + staff.id, {
                ...data
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    //reload page
                    Inertia.reload();
                    toast.success('Device has been updated');
                },
                onError: () => toast.error('Failed to update device')
            });
        }
    }

    function handleStatus(status) {
        Inertia.put('/panel/devices/' + device.uuid, {
            'name': data.name,
            'status': status,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                //reload page
                Inertia.reload();
                toast.success('Device has been updated');
            },
            onError: () => toast.error('Failed to update device')
        });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
    }
    useEffect(() => {


        return () => {
        };
    }, []);

    function handleChange(e) {
        setSelected(e.target.value);
        setData('role', e.target.value);
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
                                    <div>
                                        <label
                                            className="inline-block text-sm font-medium dark:text-gray-300">Name</label>
                                        <div className="mt-1"><input
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="form-input border-gray-300 focus:border-blue-300 w-full shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-900 rounded-md"
                                            type="text" placeholder=""/></div>
                                    </div>
                                    <div>
                                        <label
                                            className="inline-block text-sm font-medium dark:text-gray-300">Email</label>
                                        <div className="mt-1"><input
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="form-input border-gray-300 focus:border-blue-300 w-full shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-900 rounded-md"
                                            type="text" placeholder=""/></div>
                                    </div>
                                    <div>
                                        <label
                                            className="inline-block text-sm font-medium dark:text-gray-300">Password</label>
                                        <div className="mt-1"><input
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="form-input border-gray-300 focus:border-blue-300 w-full shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-900 rounded-md"
                                            type="password" placeholder=""/></div>
                                    </div>
                                    <div>
                                        <label
                                            className="inline-block text-sm font-medium dark:text-gray-300">Role</label>
                                        <div className="mt-1">
                                            <Select

                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                value={selected}
                                                onChange={handleChange}
                                                input={<OutlinedInput label="Name"/>}
                                            >
                                                {roles.map((role) => (
                                                    <MenuItem
                                                        key={role.id}
                                                        value={role.id}
                                                    >
                                                        {role.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <footer
                                className="rounded-b-lg bg-gray-50 px-6 py-3 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                <div className="flex items-center justify-end space-x-2">
                                    <button
                                        onClick={publicSubmit}
                                        className="inline-flex items-center justify-center text-sm font-medium transition-all ease-in-out duration-100 focus:outline-none focus:ring border rounded-md border-primary-500 bg-primary-500 text-white shadow hover:bg-primary-400 hover:border-primary-400 focus:border-primary-700 focus:bg-primary-600 px-3 py-2 text-sm">
                                        Save
                                    </button>
                                </div>
                            </footer>
                        </form>
                    </div>
                </div>
            </PanelLayout>
        </div>
    );
}

export default ManageStaff;