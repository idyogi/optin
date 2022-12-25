import React from 'react';
import {Pagination, PaginationItem} from "reactstrap";
import {Link} from "@inertiajs/inertia-react";

function Paginate({pagination}) {
    return (
        <div className="mb-5 ml-1 flex flex-wrap mt-4">
            {pagination && pagination.map((page, index) => (
                <div key={index}>
                    <a href={page.url} dangerouslySetInnerHTML={{__html: page.label}} className={`mr-1 mb-1 rounded border bg-white px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-300 ${page.active ? 'border-blue-300 bg-blue-200 text-blue-800 dark:border-gray-500' : 'dark:border-gray-600'}`}></a>
                </div>
            ))}
        </div>
    );
}

export default Paginate;
