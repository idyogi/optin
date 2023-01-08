import React from 'react';

function CustomersTableItem(props) {
  return (
    <tr>


      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className="font-medium text-slate-800">{props.name}</div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.email}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.location}</div>
      </td>

    </tr>
  );
}

export default CustomersTableItem;
