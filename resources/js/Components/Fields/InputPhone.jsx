import React, {Fragment, useState} from 'react';
import ControlField from "../ControlField";
import {Listbox} from '@headlessui/react';
import {ChevronUpDownIcon} from "@heroicons/react/20/solid";
import {Transition} from "@tailwindui/react";
import {useForm} from "@inertiajs/inertia-react";

function InputPhone({fieldList, index, active, isPublic, updateField}) {
    const {data, setData} = useForm({
        label: fieldList[index].label,
        placeholder: fieldList[index].placeholder,
        required: fieldList[index].required,
    });
    const [field, setField] = useState(fieldList[index]); //do not remove this line

    function handleChange(key, value) {
        setField({...field, [key]: value}); //do not remove this line
        fieldList[index] = {...fieldList[index], [key]: value};
        updateField(index, fieldList[index]);
    }
    const countries = [
        {name: 'Indonesia', code: '+62'},
        {name: 'Malaysia', code: '+60'},
    ]

    const [selected, setSelected] = useState(countries[0])

    function handleSelect(index) {
        setSelected(countries[index])
        const newFieldList = [...fieldList];
        newFieldList[index].country_code = countries[index].code;
        updateField(index, newFieldList[index]);
    }

    if (isPublic) {
        return (<div className="flex-auto px-8 py-1">
            <div className="">
                <div className="mb-4 pr-6 "><label
                    className="block text-md font-semibold text-gray-700 mb-3 flex"
                    htmlFor="">{fieldList[index].label}{fieldList[index].required ? (
                    <span
                        className="text-red-400 ml-1 true">*</span>) : (<span></span>)}</label>
                    <div className="flex">
                        <div>
                            <Listbox value={selected} onChange={handleSelect}>
                                <div>
                                    <Listbox.Button
                                        className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent rounded-r-none appearance-none p-3 mb-1 text-base leading-normal bg-white text-gray-800 border-none ring-1 ring-gray-300 rounded">
                                        <span className="block truncate">{selected.code}</span>
                                        <span
                                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
              />
            </span>
                                    </Listbox.Button>
                                    <Transition
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                        show>
                                        <Listbox.Options
                                            className="z-10 absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {countries.map((country, code) => (
                                                <Listbox.Option
                                                    key={code}
                                                    className={({active}) =>
                                                        `relative cursor-default select-none py-2 pl-3 pr-4 ${
                                                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                        }`
                                                    }
                                                    value={code}>

                                                    {({selected}) => (
                                                        <>
                      <span
                          className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {country.code}
                      </span>
                                                            {selected ? (
                                                                <span
                                                                    className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                        </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </Listbox>
                        </div>
                        <input required=""
                               onChange={(e) => handleChange('value', e.target.value)}
                               className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block rounded-l-none appearance-none p-3 w-full max-w-full mb-1 text-base leading-normal bg-white text-gray-800 border-none ring-1 ring-gray-300 rounded"
                               type="text" placeholder={fieldList[index].placeholder}/></div>
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
                                <div className="ml-1">{fieldList[index].title}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap"></div>
                    <div className="flex flex-wrap">
                        <div className="w-1/2">
                            <div className="mb-4"><label htmlFor="">Label</label><input
                                type="text"
                                placeholder="Label"
                                value={fieldList[index].label}
                                onChange={e => handleChange('label', e.target.value)}
                                className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"/>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="mb-4 ml-1"><label
                                htmlFor="">Placeholder</label><input type="text"
                                                                     value={fieldList[index].placeholder}
                                                                     onChange={e => handleChange('placeholder', e.target.value)}
                                                                     placeholder="Placeholder"
                                                                     className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"/>
                            </div>
                        </div>
                    </div>
                    <ControlField key={index} fieldList={fieldList} index={index}
                                  updateField={updateField}/>

                </div>
            </div>
        );
    } else {
        return (<div
            className="flex-auto px-6 py-1"
            onClick={() => updateField(index, fieldList[index])}>
            <div className="my-3">
                <div className="mb-4"><label
                    className="block text-md font-semibold text-gray-700 mb-1"
                    htmlFor="">{fieldList[index].label}</label><input
                    className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none w-full py-3 px-4 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                    type="text" placeholder={fieldList[index].placeholder}/></div>
            </div>
        </div>)
    }
}

export default InputPhone;
