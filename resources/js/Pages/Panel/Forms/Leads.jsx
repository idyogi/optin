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
import DeleteButton from "../../../partials/actions/DeleteButton";
import DateSelect from "../../../Components/DateSelect";
import CustomersTable from "../../../partials/customers/CustomersTable";
import PaginationClassic from "../../../Components/PaginationClassic";
import Datepicker from "../../../Components/Datepicker";


function IndexForm({form, leads, filteredColumns, filtered}) {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectedItems = (selectedItems) => {
        setSelectedItems([...selectedItems]);
    };


    let handleChangeDate = (date) => {
        console.log(date);
    }
    return (
        <PanelLayout title={'Leads'} subTitle={''}>
            <div className="flex overflow-hidden">

                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                    <main>
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                            <div className="sm:flex sm:justify-between sm:items-center mb-8">

                            </div>
                            <CustomersTable column={filteredColumns} data={leads} selectedItems={handleSelectedItems}/>
                            <div className="mt-8">
                                <Paginate pagination={filtered.links} from={filtered.from} to={filtered.to} total={filtered.total}/>
                            </div>

                        </div>
                    </main>

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
