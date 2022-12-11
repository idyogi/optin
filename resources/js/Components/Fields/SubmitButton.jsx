import React, {useState} from 'react';
import ControlField from "../ControlField";
// import { useForm } from "react-hook-form";
import {Button, Spinner} from "reactstrap";
import {useForm} from "@inertiajs/inertia-react";

function SubmitButton({form, submitField, handleSubmitChanges, isPublic, active, setActive, publicSubmit}) {
    const {data, setData} = useForm({
        'label': submitField.settings.button_ui.text,
        'editor_title': submitField.editor_options.title
    });

    function handleChanges(key, value) {
        setData(key, value);
        const newSubmitButton = submitField;
        if (key === 'label') {
            newSubmitButton.settings.button_ui.text = value;
        }
        console.log(newSubmitButton);
        handleSubmitChanges(newSubmitButton);
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
    if (-1 === active) {
        return (
            <div className="flex-auto px-6 py-1 field-active border-indigo-600">
                <div>
                    <div className="flex flex-wrap">
                        <div className="w-1/2">
                            <div className="font-black text-lg -ml-2 px-2 text-gray-800 mb-5 flex">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                                </svg>
                                <div className="ml-1">{data.editor_title}</div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="flex flex-wrap">
                            <div className="w-1/2">
                                <div className="mb-4"><label htmlFor="">Text</label>
                                    <input type="text"
                                           value={data.label}
                                           onChange={e => handleChanges('label', e.target.value)}
                                           placeholder="Text Button"
                                           className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal
                                           bg-white text-gray-800 border border-gray-200 rounded"/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    } else {
        return (<div className="flex-auto px-6 py-1" onClick={() => setActive(-1)}>
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

export default SubmitButton;
