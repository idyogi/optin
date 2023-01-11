import React, {useEffect, useState} from 'react';
import PanelLayout from "../../../Layouts/PloiTheme/PanelLayout";
import TableData from "../../../Components/TableData";
import {Inertia} from "@inertiajs/inertia";

function Staff({staff}) {
    const [headers, setHeaders] = useState([]);
    useEffect(() => {
        setHeaders([
            'Name',
            'Email',
            'Role',
            'Created At',
            'Actions'

        ]);
    }, []);
    console.log(staff);

    function deleteStaff(id) {
        //show confirm
        if (confirm('Are you sure you want to delete this staff member?')) {

            Inertia.delete('/panel/staff/' + id)
        }
    }

    return (
        <PanelLayout title={'Staff'} trailing={(
            <a className="inline-flex items-center justify-center text-sm font-medium transition-all ease-in-out duration-100 focus:outline-none focus:ring border rounded-md border-primary-500 bg-primary-500 text-white shadow hover:bg-primary-400 hover:border-primary-400 focus:border-primary-700 focus:bg-primary-600 px-3 py-2 text-sm"
               target="_self"
               href="/panel/staff/create"> Add new staff </a>)}>
            <div className="py-6">
                <div className="mx-auto w-full px-8 max-w-5xl space-y-6">
                    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">

                        <div>
                            <div className="overflow-x-auto">
                                <TableData
                                    headers={headers}
                                    hasFilter={false}

                                >
                                    {staff.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <td className="px-4 py-2">{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.role}</td>
                                                <td>{item.created_at}</td>
                                                <td>
                                                    <div className="flex items-center">
                                                        <a href={'/panel/staff/' + item.id + '/edit'}
                                                           className="text-blue-500 hover:text-blue-700 mr-3">Edit</a>
                                                        <button
                                                            onClick={() => {
                                                                deleteStaff(item.id)
                                                            }}
                                                            className="text-red-500 hover:text-red-700">Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </TableData>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PanelLayout>
    );
}

export default Staff;