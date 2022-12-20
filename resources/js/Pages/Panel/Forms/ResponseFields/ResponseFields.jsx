import React, {useState} from 'react';
import CustomHtml from "./CustomHtml";
import ButtonInput from "../../../../Components/ButtonInput";
import Share from "./Share";
import ResponseWhatsappRotator from "./ResponseWhatsappRotator";

function ResponseFields({form, responseFields, transform, formatFields,submissionId, isPublic = false}) {
    const [active, setActive] = useState(0);
    const [fieldList, setFieldList] = useState(responseFields);

    function addFieldList(type) {
        const field = formatFields[type];
        setFieldList([...fieldList, field]);
        setActive(fieldList.length);

        transform([...fieldList, field]);
    }

    function updateField(index, value) {
        const newFieldList = [...fieldList];
        newFieldList[index] = value;
        // transform(newFieldList);
    }

    function deleteFieldList(index) {
        const newFieldList = fieldList.filter((field, i) => i !== index);
        setFieldList(newFieldList);
        setActive(0);
        // transform(newFieldList);
    }

    function handleUp(index) {
        const newFieldList = arrayMoveImmutable(fieldList, index, index - 1);
        setFieldList(newFieldList)
        setActive(index - 1);
        // transform(newFieldList);
    }

    function handleDown(index) {
        const newFieldList = arrayMoveImmutable(fieldList, index, index + 1);
        setFieldList(newFieldList)
        setActive(index + 1);
        // transform(newFieldList);
    }

    return (
        <div>
            {fieldList.map((responseField, index) => {
                if (responseField.element === 'custom_html') {
                    return (<CustomHtml key={index} fieldList={fieldList} fields={responseField} index={index}
                                        handleUp={handleUp} handleDown={handleDown} active={active}
                                        setActive={setActive} updateField={updateField}
                                        deleteFieldList={deleteFieldList} isPublic={isPublic}/>)
                }
                if (responseField.element === 'whatsapp_rotator') {
                    return (<ResponseWhatsappRotator key={index} submissionId={submissionId} fieldList={fieldList} fields={responseField} index={index}
                                        handleUp={handleUp} handleDown={handleDown} active={active}
                                        setActive={setActive} updateField={updateField}
                                        deleteFieldList={deleteFieldList} isPublic={isPublic}/>)
                }
                if (responseField.element === 'share') {
                    return (<Share key={index} fieldList={fieldList} fields={responseField} index={index}
                                   handleUp={handleUp} handleDown={handleDown} active={active}
                                   setActive={setActive} updateField={updateField}
                                   deleteFieldList={deleteFieldList} submissionId={submissionId}  isPublic={isPublic}/>)
                }
            })}
            {!isPublic && (
            <div className="py-3 px-6 bg-gray-200 border-t-1 border-gray-300">
                <div className="mt-2">Standar Response</div>
                <ButtonInput name={"text"} type={'custom_html'} callback={addFieldList}/>
                <div className="mt-2">Viral Response</div>
                <ButtonInput name={"share"} type={'share'} callback={addFieldList}/>
                <ButtonInput name={"whatsapp rotator"} type={'whatsapp_rotator'} callback={addFieldList}/>
            </div>)}
        </div>)
}

export default ResponseFields;
