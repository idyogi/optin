import React, {useMemo, useRef, useState} from 'react';
import {FormGroup} from "reactstrap";
import Tinymce from "../../../../Components/Tinymce";
import ControlField from "../../../../Components/ControlField";

function CustomHtml({fieldList, index, active, updateField, handleDown, handleUp, deleteFieldList}) {
    const [field, setField] = useState(fieldList[index]);

    function createMarkup() {
        return {__html: field.settings.html_codes};
    }

    function handleChange(html) {
        const newFieldList = [...fieldList];
        newFieldList[index].settings.html_codes = html;
        updateField(index, newFieldList[index]);
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
                                <div className="ml-1">TEXT</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <FormGroup>
                            <Tinymce html={field.settings.html_codes} onChange={handleChange}/>
                        </FormGroup>
                        <div>

                        </div>
                        <br/>
                    </div>

                    <ControlField key={index} fieldList={fieldList} field={field} index={index} handleUp={handleUp}
                                  handleDown={handleDown} deleteFieldList={deleteFieldList}/>

                </div>
            </div>


        );
    } else {

        return (<div
            className="flex-auto px-6 py-1"
            onClick={() => setActive(index)}>
            <div className="my-3">
                <div className="ql-editor">
                    <div dangerouslySetInnerHTML={createMarkup()}/>
                </div>
            </div>
        </div>)
    }
}

export default CustomHtml;