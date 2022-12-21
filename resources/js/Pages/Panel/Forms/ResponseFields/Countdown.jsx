import React, {useMemo, useRef, useState} from 'react';
import {FormGroup} from "reactstrap";
import Tinymce from "../../../../Components/Tinymce";
import ControlField from "../../../../Components/ControlField";
import {useForm} from "@inertiajs/inertia-react";
import FlipCountdown from "../../../../Components/FlipCountdown";
import {FlipDate} from "../../../../Components/FlipDate";
import {WorkingFlipDate} from "../../../../Components/WorkingFlipDate";
import DatePicker from "../../../../Components/DatePicker";
import TextField from "@mui/material/TextField";
import {FormControl, InputAdornment, MenuItem, OutlinedInput, Select} from "@mui/material";

function Countdown({
                       fieldList,
                       index,
                       active,
                       updateField,
                       handleDown,
                       handleUp,
                       deleteFieldList,
                       setActive,
                       submissionId,
                       isPublic = false
                   }) {
    const [field, setField] = useState(fieldList[index]);
    const {data, setData} = useForm({
        countdown_type: field.countdown_type,
        evergreen_time: field.evergreen_time,
        fixed_time: field.fixed_time,
    });
    const countdown_type = [
        {name: 'Fixed Time', code: 'fixed'},
        {name: 'Evergreen', code: 'evergreen'},
    ]
    const [selected, setSelected] = useState(data.countdown_type)


    function handleSelect(event) {
        setSelected(event.target.value)
        handleChange('countdown_type', event.target.value)
    }

    function handleChange(key, value) {
        setData(key, value);
        const newFieldList = [...fieldList];
        if (key === 'countdown_type') {
            newFieldList[index].countdown_type = value;
        }
        if (key === 'evergreen_time') {
            newFieldList[index].evergreen_time = value;
        }
        if (key === 'fixed_time') {
            newFieldList[index].fixed_time = value;
        }
        updateField(index, newFieldList[index]);
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
                                                value={selected}
                                                onChange={handleSelect}
                                            >
                                                {countdown_type.map((item, index) => (
                                                    <MenuItem value={item.code}>{item.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 pl-1">
                                <div className="mb-4"><label htmlFor="">Waktu Expire</label>
                                    {data.countdown_type === 'evergreen' ? (
                                        <div className="relative rounded-md shadow-sm">
                                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                                <OutlinedInput
                                                    id="outlined-adornment-weight"
                                                    type={'number'} value={data.evergreen_time}
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
                                                <DatePicker
                                                    name={"fixed_time"} datetime={data.fixed_time}
                                                    onChanged={handleChange}/>
                                            </FormControl>
                                        </div>)}
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
                    <div className="text-6xl text-center flex w-full items-center justify-center">
                        {data.countdown_type === 'evergreen' ? (<FlipDate value={data.evergreen_time}/>) :
                            (<WorkingFlipDate value={data.fixed_time}/>)}
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default Countdown;
