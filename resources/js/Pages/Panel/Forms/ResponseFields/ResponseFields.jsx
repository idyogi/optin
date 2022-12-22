import React, {useState} from 'react';
import CustomHtml from "./CustomHtml";
import ButtonInput from "../../../../Components/ButtonInput";
import Share from "./Share";
import ResponseWhatsappRotator from "./ResponseWhatsappRotator";
import Countdown from "./Countdown";
import {arrayMoveImmutable} from "array-move";

function ResponseFields({form, responseFields, transform, formatFields, submissionId, isPublic = false}) {
    const [active, setActive] = useState(0);
    const [fieldList, setFieldList] = useState(responseFields);

    function addFieldList(type) {
        const field = formatFields[type];
        setFieldList([...fieldList, field]);
        setActive(fieldList.length);
        transform([...fieldList, field]);
    }

    function updateField(index, value) {
        //set active to index
        setActive(index);
        transform(fieldList);
    }

    return (
        <div>
            {fieldList.map((responseField, index) => {
                if (responseField.element === 'custom_html') {
                    return (<CustomHtml key={index} fieldList={fieldList} index={index}
                                        active={active}
                                        updateField={updateField}
                                        isPublic={isPublic}/>)
                }
                if (responseField.element === 'whatsapp_rotator') {
                    return (<ResponseWhatsappRotator key={index} submissionId={submissionId} fieldList={fieldList}
                                                     index={index}
                                                     active={active}
                                                     updateField={updateField}
                                                     isPublic={isPublic}/>)
                }
                if (fieldList[index].element === 'share') {
                    return (<Share key={index} fieldList={fieldList} index={index}
                                   active={active}
                                   updateField={updateField}
                                   submissionId={submissionId} isPublic={isPublic}/>)
                }
                if (responseField.element === 'countdown') {
                    return (<Countdown key={index} fieldList={fieldList} index={index}
                                       active={active}
                                       updateField={updateField}
                                       isPublic={isPublic}/>)
                }
            })}
            {!isPublic && (
                <div className="py-3 px-6 bg-gray-200 border-t-1 border-gray-300">
                    <div className="mt-2">Standar Response</div>
                    <ButtonInput name={"text"} type={'custom_html'} callback={addFieldList}/>
                    <ButtonInput name={"countdown"} type={'countdown'} callback={addFieldList}/>
                    <div className="mt-2">Viral Response</div>
                    <ButtonInput name={"share"} type={'share'} callback={addFieldList}/>
                    <ButtonInput name={"whatsapp rotator"} type={'whatsapp_rotator'} callback={addFieldList}/>
                </div>)}
        </div>)
}

export default ResponseFields;
