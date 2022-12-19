import React, {useMemo, useRef, useState} from 'react';
import {Switch} from '@headlessui/react'

function ControlField({fieldList, index, active, handleUp, handleDown, updateField, deleteFieldList}) {
    const [field, setField] = useState(fieldList[index]);
    const [required, setRequired] = useState(field.element !== 'custom_html' ? field.settings.validation_rules.required.value : false);

    function handleRequired() {
        setRequired(!required);
        const newFieldList = [...fieldList];
        newFieldList[index].settings.validation_rules.required.value = !required;
        console.log(newFieldList);
        updateField(index, newFieldList[index]);
    }

    return (
        <div className="flex flex-wrap ml-1">
            {((index === 0) ? (<span></span>) : (<span><button onClick={() => handleUp(index)}
                                                               className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded no-underline py-1 px-2 leading-tight text-xs">

                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                </svg>

            </button></span>))}
            {((index + 1 >= fieldList.length) ? (<span></span>) : (<button onClick={() => handleDown(index)}
                                                                           className="ml-1 inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded no-underline py-1 px-2 leading-tight text-xs">

                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>
                </svg>
            </button>))}
            <button
                className="ml-1 inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded no-underline py-1 px-2 leading-tight text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
            </button>
            <button
                //delete button
                onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteFieldList(index) }}
                className="ml-1 inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded no-underline py-1 px-2 leading-tight text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
            </button>

            <div className="ml-1 flex items-center justify-center bg-white">
                <div className="flex items-center">
                    {field.element !== 'custom_html' ? (<div><Switch
                        checked={required}
                        onChange={handleRequired}
                        className={`${required ? 'bg-indigo-600' : 'bg-gray-200'} z-0
          inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    > <span className="sr-only">Use setting</span>
                        <span
                            aria-hidden="true"
                            className={`${required ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        />
                    </Switch>
                        <span className="ml-3" id="toggleLabel"><span
                            className="text-sm font-medium text-gray-900">Required</span><span
                            className="text-sm text-gray-500">(Harus diisi)</span></span></div>) : (<span></span>)}
                </div>
            </div>
        </div>
    );
}

export default ControlField;
