import React, {useState} from 'react';
import ControlField from "../ControlField";
import {useForm} from "@inertiajs/inertia-react";

function WhatsappRotator({
                             fieldList,
                             field,
                             index,
                             active,
                             setActive,
                             handleUp,
                             handleDown,
                             isPublic,
                             updateField,
                             deleteFieldList,
                             form,
                             publicSubmit
                         }) {
    const {data, setData} = useForm({
        label: field.settings.button_ui.text,
        placeholder: field.attributes.placeholder,
        required: field.settings.validation_rules.required.value,
        numbers: field.settings.numbers,
    });

    function addNumber() {
        setData('numbers', [...data.numbers, field.settings.numbers[0]]);
        updateField(index, {
            ...field,
            settings: {...field.settings, numbers: [...data.numbers, field.settings.numbers[0]]}
        });
    }

    function handleChangeNumbers(key, value, i) {
        if (key === 'number') {

            setData('numbers', data.numbers.map((number, index) => {
                if (index === i) {
                    return {...number, number: value}
                }
                return number;
            }));
        }
        if (key === 'name') {
            setData('numbers', data.numbers.map((name, index) => {
                if (index === i) {
                    return {...name, name: value}
                }
                return name;
            }));
        }
        if (key === 'portion') {
            setData('numbers', data.numbers.map((portion, index) => {
                if (index === i) {
                    return {...portion, portion: value}
                }
                return portion;
            }));
        }
        if (key === 'text') {
            setData('numbers', data.numbers.map((text, index) => {
                if (index === i) {
                    return {...text, text: value}
                }
                return text;
            }));
        }
        updateField(index, {...field, settings: {...field.settings, numbers: data.numbers}});
    }

    function handleChange(key, value) {
        setData(key, value);
        const newFieldList = [...fieldList];
        if (key === 'label') {
            newFieldList[index].settings.label = value;
        }
        if (key === 'placeholder') {
            newFieldList[index].attributes.placeholder = value;
        }
        if (key === 'required') {
            newFieldList[index].settings.validation_rules.required.value = value;
        }

        updateField(index, newFieldList[index]);
    }


    if (isPublic) {
        return (
            <div className="flex-auto px-6 py-1">
                <div className="my-3">
                    <div>
                        <button
                            type="submit" onClick={publicSubmit}
                            disabled={form.processing}

                            className="bg-indigo-600 w-full text-lg mt-1 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-semibold text-white">
                            <div className="mr-1">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round"
                                              strokeLinejoin="round" strokeWidth="2"
                                              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>

                            </div>
                            {form.processing ? 'Loading...' : data.label}

                        </button>
                    </div>
                </div>
            </div>
        )
    }

    function removeNumber(i) {
        const newNumbers = [...data.numbers];
        newNumbers.splice(i, 1);
        setData('numbers', newNumbers);
        updateField(index, {...field, settings: {...field.settings, numbers: newNumbers}});
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
                    <div className="mb-4">
                        <label htmlFor="">Call to Action</label>
                        <input type="text"
                               onChange={(e) => {
                                   handleChange('label', e.target.value)
                               }}
                               value={data.label}
                               className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"/>
                    </div>
                    <div className="mb-3 mt-3">Daftar Whatsapp <span onClick={() => addNumber()}
                                                                     className="ml-3 inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded no-underline py-1 px-2 leading-tight text-xs text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white bg-white hover:bg-blue-600"><i
                        className="fas fa-plus mr-1"></i> tambah pilihan</span></div>
                    {data.numbers.map((number, i) => (
                        <div key={i} className="mb-3">
                            <div className="relative items-stretch w-full mb-3">
                                <input type="text"
                                       onChange={(e) => {
                                           handleChangeNumbers('number', e.target.value, i)
                                       }}
                                       value={data.numbers[i].number}
                                       className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                       placeholder="6282xxx"/>
                                <div className="flex">
                                    <input type="text"
                                           onChange={(e) => {
                                               handleChangeNumbers('name', e.target.value, i)
                                           }}
                                           value={data.numbers[i].name}
                                           className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none w-32 py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                           placeholder="CS Name"/>
                                    <input
                                        onChange={(e) => {
                                            handleChangeNumbers('portion', e.target.value, i)
                                        }}
                                        type="text"
                                        value={data.numbers[i].portion}

                                        className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none w-32 ml-1 py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                        placeholder="1"/>

                                    <div className="input-group-append">
                                        <button
                                            onClick={() => removeNumber(i)}
                                            className="inline-block ml-1 align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-red-600 border-red-600 hover:bg-red-600 hover:text-white bg-white hover:bg-red-700"
                                            type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <textarea
                                onChange={(e) => {
                                    handleChangeNumbers('text', e.target.value, i)
                                }}
                                value={data.numbers[i].text}

                                className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                type="text" placeholder="Pesan"/>
                        </div>
                    ))}
                    <ControlField key={index} fieldList={fieldList} field={field} index={index} handleUp={handleUp}
                                  handleDown={handleDown} updateField={updateField} deleteFieldList={deleteFieldList}/>

                </div>
            </div>
        );
    } else {
        return (<div className="flex-auto px-6 py-1" onClick={() => setActive(index)}>
            <div className="my-3">

                <div>
                    <button type="submit"
                            className="bg-indigo-600 w-full text-lg mt-1 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-semibold text-white">
                        <div className="mr-1">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round"
                                          strokeLinejoin="round" strokeWidth="2"
                                          d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>

                        </div>
                        {data.label}
                    </button>
                </div>
            </div>
        </div>)
    }
}

export default WhatsappRotator;
