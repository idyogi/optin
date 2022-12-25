import React, {useState} from 'react';
import RightMenu from "../../../Components/RightMenu";
import TableData from "../../../Components/TableData";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel, getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'
import moment from 'moment'
import PanelLayout from "../../../Layouts/PloiTheme/PanelLayout";
import {useQuery} from "react-query";
import Paginate from "../../../Components/Paginate";


function IndexForm({form, leads, filteredColumns}) {
    const submissions = leads.data.map((lead, index) => {
        let col = lead;
        JSON.parse(lead.response).forEach((item, index) => {
            col[item.name] = item.value
        })
        lead.meta.map((item) => {
            if (item.meta_key === 'whatsapp_rotator') {
                col['whatsapp_rotator'] = item.value
            }
            return item.value
        })
        return col
    });
    const [data, setData] = React.useState(() => [...submissions])

    const columnHelper = createColumnHelper()
    let columns = [];
    const array = ["React", "is", "awesome", "!"];
    const length = array.length;
    filteredColumns.forEach((column, index) => {
        columns[index] = columnHelper.accessor(column.name, {

            cell: info => info.getValue(),
            footer: info => info.column.id,
            header: column.label,
        })
    })
    columns = [...columns,

        columnHelper.accessor('updated_at', {
            header: 'Tanggal',
            cell: info => moment(info.getValue()).format('DD/MM/YYYY HH:mm:ss'),
            footer: info => info.column.id,
        }),
    ]
    const table = useReactTable({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })


    return (
        <PanelLayout title={'Leads'} subTitle={''}>

            <div className="min-h-screen">
                <div className="container mx-auto px-6 py-3">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8">
                        <div
                            className="flex flex-col rounded shadow-sm bg-white overflow-hidden">
                            <div className="p-5 lg:p-6 grow w-full">
                                <dl>
                                    <dt className="text-2xl font-semibold">{leads.total}</dt>
                                    <dd className="uppercase font-medium text-sm text-gray-500 tracking-wider"> Lead</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-6">
                    <div className="vtl vtl-card">
                        <div className="vtl-card-body">
                            <div className="vtl-row">
                                <div className="col-sm-12">
                                    <table className="vtl-table vtl-table-hover vtl-table-bordered">
                                        <thead className="vtl-thead">
                                        {table.getHeaderGroups().map(headerGroup => (
                                            <tr key={headerGroup.id} className="vtl-thead-tr">
                                                {headerGroup.headers.map(header => (
                                                    <th key={header.id} className="vtl-thead-th">
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                    </th>
                                                ))}
                                            </tr>
                                        ))}
                                        </thead>
                                        <tbody>
                                        {table.getRowModel().rows.map(row => (
                                            <tr key={row.id}>
                                                {row.getVisibleCells().map(cell => (
                                                    <td key={cell.id}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        </tbody>

                                    </table>

                                    {leads.last_page > 1 && (<Paginate pagination={leads.links}/>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PanelLayout>
    );
}

export async function fetchData(options) {
    // Simulate some network latency
    await new Promise(r => setTimeout(r, 500))
    console.log(pageIndex, pageSize)
    return {
        rows: data.slice(
            options.pageIndex * options.pageSize,
            (options.pageIndex + 1) * options.pageSize
        ),
        pageCount: Math.ceil(data.length / options.pageSize),
    }
}

export default IndexForm;
