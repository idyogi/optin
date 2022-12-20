import React, {useMemo, useRef, useState} from 'react';
import {FormGroup} from "reactstrap";
import Tinymce from "../../../../Components/Tinymce";
import ControlField from "../../../../Components/ControlField";
import {useForm} from "@inertiajs/inertia-react";

function Share({fieldList, index, active, updateField, handleDown, handleUp, deleteFieldList, setActive,submissionId, isPublic = false}) {
    const [field, setField] = useState(fieldList[index]);
    const {data, setData} = useForm({
        action_cooldown: field.action_cooldown,
        points: field.points,
        share_cta: field.share_cta,
        share_to: field.share_to,
    });
    const url = window.location.href + '?ref=' + submissionId;
    const sosmed = [
        {name: 'Facebook', code: 'facebook'},
        {name: 'Twitter', code: 'twitter'},
        {name: 'Whatsapp', code: 'whatsapp'},
        {name: 'Telegram', code: 'telegram'},
    ]
    const [selected, setSelected] = useState(data.share_to)

    function handleSelect(code) {
        setSelected(code)
        handleChange('share_to', code)
    }

    function handleChange(key, value) {
        setData(key, value);
        const newFieldList = [...fieldList];
        if (key === 'action_cooldown') {
            newFieldList[index].action_cooldown = value;
        }
        if (key === 'points') {
            newFieldList[index].points = value;
        }
        if (key === 'share_to') {
            newFieldList[index].share_to = value;
        }
        if (key === 'share_cta') {
            newFieldList[index].share_cta = value;
        }
        updateField(index, newFieldList[index]);
    }

    function goTo() {
        if(data.share_to === 'facebook') {
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank');
        }
        if(data.share_to === 'twitter') {
            window.open('https://twitter.com/intent/tweet?url=' + url, '_blank');
        }
        if(data.share_to === 'whatsapp') {
            window.open('https://api.whatsapp.com/send?text=' + url, '_blank');
        }
        if(data.share_to === 'telegram') {
            window.open('https://telegram.me/share/url?url=' + url, '_blank');
        }
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
                                <div className="ml-1">SHARE</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-wrap">
                            <div className="w-1/2">
                                <div className="mb-4"><label htmlFor="">Share to</label>
                                    <select
                                        value={selected}
                                        onChange={e => handleSelect(e.target.value)}
                                        className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded">
                                        {sosmed.map((item, index) => (
                                            <option
                                                key={index}
                                                value={item.code}
                                            >{item.name}</option>))}
                                    </select></div>
                            </div>
                            <div className="w-1/2 pl-1">
                                <div className="mb-4"><label htmlFor="">Share Point</label>
                                    <input type="text"

                                           id="price"
                                           value={data.points}
                                           onChange={e => handleChange('points', e.target.value)}
                                           className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                           placeholder="120"
                                           aria-describedby="price-currency"/>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="mb-4"><label htmlFor="">Call to Action</label>
                                    <input type="text"
                                           value={data.share_cta}
                                           onChange={e => handleChange('share_cta', e.target.value)}
                                           className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"/>
                                </div>
                            </div>
                            <div className="w-1/2 pl-1">
                                <div className="mb-4"><label htmlFor="">Action Cooldown</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <input type="text"
                                               id="price"
                                               value={data.action_cooldown}
                                               onChange={e => handleChange('action_cooldown', e.target.value)}
                                               className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                               placeholder="120"
                                               aria-describedby="price-currency"/>
                                        <div
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm"
                                                  id="price-currency"> MENIT </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ControlField key={index} fieldList={fieldList} field={field} index={index} handleUp={handleUp}
                                  handleDown={handleDown} deleteFieldList={deleteFieldList}/>

                </div>
            </div>


        );
    } else {

        return (<div
            className="flex-auto px-6 py-1"
            onClick={() => !isPublic ? setActive(index) : goTo()}>
            <div className="my-3">
                <div>
                    {data.share_to === 'facebook' && (
                        <button type="submit"
                                className={'facebook-bg-color w-full text-lg mt-1 inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-semibold text-white'}>
                            <div className="mr-1">
                                <div>
                                    <svg className="h-6 w-6" viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                              d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"></path>
                                    </svg>


                                </div>
                            </div>
                            {data.share_cta} <small className="text-sm ml-1">({data.points} poin)</small>
                        </button>
                    )}
                    {data.share_to === 'twitter' && (
                        <button type="submit"
                                className={'twitter-bg-color w-full text-lg mt-1 inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-semibold text-white'}>
                            <div className="mr-1">
                                <div>
                                    <svg className="h-6 w-6" viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                              d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"></path>
                                    </svg>


                                </div>
                            </div>
                            {data.share_cta} <small className="text-sm ml-1">({data.points} poin)</small>
                        </button>
                    )}
                    {data.share_to === 'whatsapp' && (
                        <button type="submit"
                                className={'whatsapp-bg-color w-full text-lg mt-1 inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-semibold text-white'}>
                            <div className="mr-1">
                                <div>
                                    <svg className="h-6 w-6" viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                              d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z"></path>
                                    </svg>


                                </div>
                            </div>
                            {data.share_cta} <small className="text-sm ml-1">({data.points} poin)</small>
                        </button>
                    )}
                    {data.share_to === 'telegram' && (
                        <button type="submit"
                                className={'telegram-bg-color w-full text-lg mt-1 inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-semibold text-white'}>
                            <div className="mr-1">
                                <div>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="telegram"
                                         className="h-6 w-6" role="img" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 496 512">
                                        <path fill="currentColor"
                                              d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z"></path>
                                    </svg>

                                </div>
                            </div>
                            {data.share_cta} <small className="text-sm ml-1">({data.points} poin)</small>
                        </button>
                    )}
                </div>
            </div>
        </div>)
    }
}

export default Share;
