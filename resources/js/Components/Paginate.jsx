import React from 'react';
import {Pagination, PaginationItem} from "reactstrap";
import {Link} from "@inertiajs/inertia-react";

function Paginate({pagination}) {
    return (
        <Pagination className="mt-3">
            {pagination && pagination.map((page, index) => (
                <PaginationItem key={index} page={page} active={page.active}>
                    <Link className="page-link" href={page.url} dangerouslySetInnerHTML={{__html: page.label}}></Link>
                </PaginationItem>
            ))}
        </Pagination>
    );
}

export default Paginate;
