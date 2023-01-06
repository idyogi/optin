import React, {useMemo, useRef, useState} from 'react';
import {FormGroup} from "reactstrap";
import Tinymce from "../../../../Components/Tinymce";
import ControlField from "../../../../Components/ControlField";
import {useForm} from "@inertiajs/inertia-react";
import FlipCountdown from "../../../../Components/FlipCountdown";
import {FlipDate} from "../../../../Components/FlipDate";
import {WorkingFlipDate} from "../../../../Components/WorkingFlipDate";
import DatePicker2 from "../../../../Components/DatePicker2";
import TextField from "@mui/material/TextField";
import {FormControl, InputAdornment, MenuItem, OutlinedInput, Select} from "@mui/material";

function Countdown({
                       fieldList,
                       index,
                       active,
                       updateField,
                       isPublic = false
                   }) {
    const [field, setField] = useState(fieldList[index]);

    const countdown_type = [
        {name: 'Fixed Time', code: 'fixed'},
        {name: 'Evergreen', code: 'evergreen'},
    ]

    function handleChange(key, value) {
        setField({...field, [key]: value}); //do not remove this line
        fieldList[index] = {...fieldList[index], [key]: value};
        updateField(index, fieldList[index]);
    }

    if (index === active) {
        return (
            <div className="flex-auto px-6 py-1 field-active border-indigo-600">
                <div>
                    <div>
                        <div className="flex flex-wrap">
                            <div className="w-1/2">
                                <div className="font-black text-lg -ml-2 px-2 text-gray-800 mb-5 flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                                    </svg>
                                    <div className="ml-1">COUNTDOWN</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="w-1/2">
                                <div className="mb-4">
                                    <label htmlFor="">Tipe Countdown</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                            <Select
                                                id="demo-simple-select"
                                                value={fieldList[index].countdown_type}
                                                onChange={e => handleChange('countdown_type', e.target.value)}>
                                                {countdown_type.map((item, index) => (
                                                    <MenuItem key={index} value={item.code}>{item.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 pl-1">
                                <div className="mb-4"><label htmlFor="">Waktu Expire</label>
                                    {fieldList[index].countdown_type === 'evergreen' ? (
                                        <div className="relative rounded-md shadow-sm">
                                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                                <OutlinedInput
                                                    id="outlined-adornment-weight"
                                                    type={'number'} value={fieldList[index].evergreen_time}
                                                    onChange={(e) => handleChange('evergreen_time', e.target.value)}
                                                    endAdornment={<InputAdornment
                                                        position="end">minutes</InputAdornment>}
                                                    aria-describedby="outlined-weight-helper-text"
                                                    inputProps={{
                                                        'aria-label': 'weight',
                                                    }}
                                                />
                                            </FormControl>
                                        </div>) : (
                                        <div className="relative rounded-md shadow-sm">
                                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                                <DatePicker2
                                                    name={"fixed_time"} datetime={fieldList[index].fixed_time}
                                                    onChanged={handleChange}/>
                                            </FormControl>
                                        </div>)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <ControlField key={index} fieldList={fieldList} index={index} updateField={updateField} />

                </div>
            </div>


        );
    } else {

        return (<div
            className="flex-auto px-6 py-1"
            onClick={() => !isPublic ? updateField(index,fieldList[index]) : goTo()}>
            <div className="my-3">
                <div>
                    <div className="text-6xl text-center flex w-full items-center justify-center">
                        {fieldList[index].countdown_type === 'evergreen' ? (
                                <FlipDate value={fieldList[index].evergreen_time}/>) :
                            (<WorkingFlipDate value={fieldList[index].fixed_time}/>)}
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default Countdown;
