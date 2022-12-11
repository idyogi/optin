import React, {useState} from 'react';
import ControlField from "../ControlField";
import {useForm} from "@inertiajs/inertia-react";

function InputText({fieldList, field, index, active, setActive, handleUp, handleDown, isPublic, updateField,deleteFieldList}) {
    const {data, setData} = useForm({
        label: field.settings.label,
        placeholder: field.attributes.placeholder,
        required: field.settings.validation_rules.required.value,
    });

    function handleChange(key, value) {
        setData(key, value);
        const newFieldList = [...fieldList];
        if(key === 'label') {
            newFieldList[index].settings.label = value;
        }
        if(key === 'placeholder') {
            newFieldList[index].attributes.placeholder = value;
        }
        if(key === 'required') {
            newFieldList[index].settings.validation_rules.required.value = value;
        }
        if(key === 'input_value') {
            newFieldList[index].attributes.value = value;
        }
        updateField(index, newFieldList[index]);
    }

    if (isPublic) {
        return (<div className="flex-auto px-8 py-1">
            <div className="">
                <div className="mb-4 pr-6 ">
                    <label
                        className="block text-md font-semibold text-gray-700 mb-3 flex" htmlFor="">
                        {field.settings.label}
                        {(field.settings.validation_rules.value === true ? (<span
                            className="true text-red-400 ml-1">*</span>) : (<span></span>))}
                    </label>
                    <input name={field.attributes.name} required={field.settings.validation_rules.value}
                           onChange={e => handleChange('input_value', e.target.value)}
                           className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none p-3 w-full max-w-full mb-1 text-base leading-normal bg-white text-gray-800 border-none ring-1 ring-gray-300 rounded"
                           type="text"
                           placeholder={field.attributes.placeholder}/>
                </div>
            </div>
        </div>)
    }
    if (index === active) {
        return (
            <div className="flex-auto px-6 py-1 field-active border-indigo-600">
                <div>
                    <div className="flex flex-wrap">
                        <div className="w-1/2">
                            <div
                                className="font-black text-lg -ml-2 px-2 text-gray-800 mb-5 flex">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="h-6 w-6"
                                     fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                                </svg>
                                <div className="ml-1">{field.editor_options.title}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap"></div>
                    <div className="flex flex-wrap">
                        <div className="w-1/2">
                            <div className="mb-4"><label htmlFor="">Label</label><input
                                type="text"
                                placeholder="Label"
                                value={data.label}
                                onChange={e => handleChange('label', e.target.value)}
                                className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"/>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="mb-4 ml-1"><label
                                htmlFor="">Placeholder</label><input type="text"
                                                                     value={data.placeholder}
                                                                     onChange={e => handleChange('placeholder', e.target.value)}
                                                                     placeholder="Placeholder"
                                                                     className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"/>
                            </div>
                        </div>
                    </div>


                    <ControlField key={index} fieldList={fieldList} field={field} index={index} handleUp={handleUp}
                                  handleDown={handleDown} updateField={updateField} deleteFieldList={deleteFieldList}/>

                </div>
            </div>
        );
    } else {
        return (<div
            className="flex-auto px-6 py-1"
            onClick={() => setActive(index)}>
            <div className="my-3">
                <div className="mb-4"><label
                    className="block text-md font-semibold text-gray-700 mb-1"
                    htmlFor="">{field.settings.label}</label><input
                    className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none w-full py-3 px-4 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                    type="text" placeholder={field.attributes.placeholder}/></div>
            </div>
        </div>)
    }
}

export default InputText;
