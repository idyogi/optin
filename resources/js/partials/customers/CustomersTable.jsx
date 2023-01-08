import React, {useState, useEffect} from 'react';
import Customer from './CustomersTableItem';

import Image01 from '../../../../public/images/user-40-01.jpg';
import Image02 from '../../../../public/images/user-40-02.jpg';
import Image03 from '../../../../public/images/user-40-03.jpg';
import Image04 from '../../../../public/images/user-40-04.jpg';
import Image05 from '../../../../public/images/user-40-05.jpg';
import Image06 from '../../../../public/images/user-40-06.jpg';
import Image07 from '../../../../public/images/user-40-07.jpg';
import Image08 from '../../../../public/images/user-40-08.jpg';
import Image09 from '../../../../public/images/user-40-09.jpg';
import Image10 from '../../../../public/images/user-40-10.jpg';
import TableData from "../../Components/TableData";

function CustomersTable({
                            selectedItems,
                            column,
                            data,
                            pagination
                        }) {
    const [headers, setHeaders] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        setHeaders(column.map((col, i) => col.label));
        setList(data);
    }, []);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        setIsCheck(list.map(li => li.id));
        if (selectAll) {
            setIsCheck([]);
        }
    };

    const handleClick = e => {
        const {id, checked} = e.target;
        setSelectAll(false);
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };

    useEffect(() => {
        selectedItems(isCheck);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCheck]);
    return (
        <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">

            <div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <TableData
                        title={'Posts'}
                        headers={headers}
                        pagination={pagination}
                    >
                        {data.map((item, i) => (
                            <tr key={i}>

                                {column.map((col, j) => (

                                    <td key={j} className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">

                                        <div className="text-left">
                                            {item[col.name]}
                                        </div>
                                    </td>
                                ))}

                            </tr>
                        ))}
                    </TableData>
                </div>
            </div>
        </div>
    );
}

export default CustomersTable;
