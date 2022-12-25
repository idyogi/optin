import React, {useState} from 'react';
import {Button, Card, CardHeader, Input, InputGroup, Pagination, PaginationItem, PaginationLink, Table} from "reactstrap";
import {getCurrentUrl} from "../utils/helper";
import {Inertia} from "@inertiajs/inertia";
import {IconTrash, IconX} from "@tabler/icons";
import {Link} from "@inertiajs/inertia-react";
import Paginate from "./Paginate";

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

    return (
        <Card>
            <CardHeader>
                <div className="d-flex justify-content-between w-full align-items-center">
                    <h3>{title}</h3>
                    <div className="d-flex gap-3">
                        <form onSubmit={handleSearch}>
                            <InputGroup>
                                <Input type={'text'} placeholder={'Search'} value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                                <Button color={'primary'}>Search</Button>
                                {search && <Button color={'danger'} onClick={clearSearch}><IconTrash/></Button>}
                            </InputGroup>
                        </form>
                    </div>
                </div>
            </CardHeader>
            <div className="table-responsive">
                <Table className="vtl-table vtl-table-hover vtl-table-bordered">
                    <thead className="vtl-thead">
                    <tr className="vtl-thead-tr">
                        {headers.map((column, index) => (
                            <th key={index} className="vtl-thead-th">{column} </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {children}
                    </tbody>
                </Table>
                <Paginate pagination={pagination}/>
            </div>
        </Card>
    );
}

export default TableData;
