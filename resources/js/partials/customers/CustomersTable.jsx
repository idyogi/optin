import React, {useState, useEffect} from 'react';
import TableData from "../../Components/TableData";

function CustomersTable({
                            selectedItems,
                            column,
                            data,
                            pagination
                        }) {
    const [headers, setHeaders] = useState([]);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        setHeaders(column.map((col) => col.label));
        setList(data);
    }, []);

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
                        title={'Laporan Leads'}
                        headers={headers}
                        pagination={pagination}
                        hasExport={true}
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
