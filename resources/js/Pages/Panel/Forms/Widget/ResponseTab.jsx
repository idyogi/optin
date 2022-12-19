import React, {Component, useState} from 'react';
import ResponseFields from "../ResponseFields/ResponseFields";

function ResponseTab({responseFields, transform, formatFields}) {
    return (

        <div className="bg-white shadow-xl sm:rounded-lg py-4">
            <ResponseFields responseFields={responseFields} transform={transform} formatFields={formatFields}/>
        </div>
    );

}

export default ResponseTab;