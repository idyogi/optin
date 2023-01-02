import React, {useEffect, useState} from 'react';
import PanelLayout from "../../../Layouts/PloiTheme/PanelLayout";
import {useForm} from "@inertiajs/inertia-react";
import moment from "moment";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';
import {Inertia} from "@inertiajs/inertia";

const socket = io('sender.adminselvi.com', {
    transports: ['websocket', 'polling', 'flashsocket']
});

function ManageDevice({device}) {

    const form = useForm(device || {});
    const {data, setData, post, put} = form;
    const [qrcode, setQrcode] = useState();
    const [message, setMessage] = useState();
    const publicSubmit = (e) => {
        console.log(data);
        Inertia.put('/panel/devices/' + device.uuid, {
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
        socket.emit('StartConnection', device.number)
        socket.on('qrcode', ({token, data, message}) => {
            console.log('qrcode', token, device.number, data, message)
            if (token === device.number) {
                setQrcode(data);
                setMessage(message);
                setData('status', 'disconnected');
                handleStatus('disconnected');
            }
        })
        socket.on('connection-open', ({token, user, ppUrl}) => {
            console.log('connection-open')

            if (token === device.number) {
                console.log(ppUrl)
                setQrcode(ppUrl);
                setMessage(message);
                setData('status', 'connected');
                handleStatus('connected');


            }
        })

        socket.on('Unauthorized', ({token}) => {
            if (token === device.number) {
                console.log('Unauthorized')
                setMessage('Unauthorized');
                setData('status', 'disconnected');
                handleStatus('disconnected');


            }

        })
        socket.on('message', ({token, message}) => {
            if (token === device.number) {
                setMessage(message);
                // interval 3 second and reload
                setTimeout(() => {
                    location.reload();
                }, 3000);
            }


        })

        return () => {
        };
    }, []);

    function logout() {
        Inertia.delete('/panel/devices/' + device.uuid, {
            preserveScroll: true,
            onSuccess: () => {
                //reload page
                Inertia.reload();
                toast.success('Device has been deleted');
            },
            onError: () => toast.error('Failed to delete device')
        });
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
                                    {device.status === 'connected' && (<div>
                                        <div className="alert-info mt-2"><p>Status perangkat ini adalah: {device.status}<br/>diupdate
                                            pada: {moment(device.updated_at).format('DD-MM-YYYY HH:m')}</p></div>
                                    </div>)}
                                    {device.status === 'disconnected' && (<div>
                                        <div className="alert-danger mt-2"><p>Status perangkat ini
                                            adalah: {device.status}<br/>diupdate
                                            pada: {moment(device.updated_at).format('DD-MM-YYYY HH:m')}</p></div>

                                    </div>)}
                                    {qrcode && (<div><img src={qrcode} alt="qrcode" id="qrcode"/></div>)}
                                    {message && (<div>{message}</div>)}
                                </div>
                            </div>
                            <footer
                                className="rounded-b-lg bg-gray-50 px-6 py-3 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                <div className="flex items-center justify-end space-x-2">
                                    <button type="button"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            onClick={() => logout()}>
                                        Delete
                                    </button>
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

export default ManageDevice;