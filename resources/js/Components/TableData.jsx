import React, {useState} from 'react';
import {
    Button,
    Card,
    CardHeader,
    Input,
    InputGroup,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table
} from "reactstrap";
import {getCurrentUrl} from "../utils/helper";
import {Inertia} from "@inertiajs/inertia";
import {IconTrash, IconX} from "@tabler/icons";
import {Link} from "@inertiajs/inertia-react";
import Paginate from "./Paginate";
import Datepicker from "./Datepicker";
import moment from "moment";

function TableData({children, title, headers = [], pagination = null}) {
    const [currentUrl, setCurrentUrl] = useState(getCurrentUrl());
    const [search, setSearch] = useState(false);
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(true);
        Inertia.get(
            currentUrl,
            {search: searchText},
            {preserveScroll: true, preserveState: true}
        );
    }
    const clearSearch = () => {
        setSearch(false);
        setSearchText('');
        Inertia.get(
            currentUrl,
            {},
            {preserveScroll: true, preserveState: true}
        );
    }
    const handleSelectDate = (dateRange) => {
        const [startDate, endDate] = dateRange;
        Inertia.get(
            currentUrl,
            {startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD')},
            {preserveScroll: true, preserveState: true}
        );
    }

    function exportExcel() {
        // Inertia.get(
        //     currentUrl,
        //     {export: 'excel'},
        //     {preserveScroll: false, preserveState: false}
        // );
        //go to url export
        window.location.href = currentUrl + '?export=excel';

    }

    return (
        <Card>
            <CardHeader>
                <div
                    className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                    <header className="px-5 py-4">
                        <h2 className="font-semibold text-slate-800">{title}</h2>
                    </header>
                    <div className="flex gap-3">
                        <div className="relative inline-flex">
                            <button
                                className="btn bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
                                aria-haspopup="true"
                                onClick={exportExcel}
                            >Export
                            </button>
                        </div>
                        <Datepicker align="right" onChange={handleSelectDate}/>
                        <form onSubmit={handleSearch}>
                            <InputGroup>
                                <Input type={'text'} placeholder={'Search then enter'} value={searchText}
                                       onChange={(e) => setSearchText(e.target.value)}
                                       className="form-input form-search w-full rounded-md border-gray-300 placeholder-gray-500 shadow-sm focus:border-blue-300 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-300"/>

                                {/*{search && <Button color={'danger'} onClick={clearSearch}><IconTrash/></Button>}*/}
                            </InputGroup>
                        </form>
                    </div>
                </div>
            </CardHeader>
            <div
                className="divide-y divide-gray-200 rounded-lg bg-white shadow dark:divide-gray-800 dark:bg-gray-700 dark:text-gray-300">
                <Table
                    className="w-full divide-y divide-gray-200 overflow-hidden rounded-t-lg text-left text-sm dark:divide-gray-800">
                    <thead className="vtl-thead">
                    <tr className="bg-gray-50 text-gray-500 dark:border-gray-800 dark:bg-gray-600 dark:text-gray-300">
                        {headers.map((column, index) => (
                            <th key={index} className="py-2 px-4 font-medium">{column} </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="dark:border-gray-800">
                    {children}
                    </tbody>
                </Table>
                <div className="pb-1 pt-6">
                    <Paginate pagination={pagination}/>
                </div>
            </div>
        </Card>
    );
}

export default TableData;
