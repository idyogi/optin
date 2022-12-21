import React, {useState} from 'react';
import InputText from "./Fields/InputText";
import CustomHtml from "./Fields/CustomHtml";
import {arrayMoveImmutable} from 'array-move';
import InputPhone from "./Fields/InputPhone";
import SubmitButton from "./Fields/SubmitButton";
import WhatsappRotator from "./Fields/WhatsappRotator";
import Countdown from "../Pages/Panel/Forms/ResponseFields/Countdown";

function Fields({
                    form,
                    submitField,
                    fields,
                    formatFields,
                    transform,
                    handleSubmitChanges,
                    publicSubmit,
                    isPublic = false
                }) {

    const [active, setActive] = useState(0);
    const [fieldList, setFieldList] = useState(fields);
    const hasSubmitButton = fieldList.filter(field => field.type === 'submit_button').length > 0;

    function addFieldList(type) {
        const field = formatFields[type];
        setFieldList([...fieldList, field]);
        setActive(fieldList.length);
        transform([...fieldList, field]);
    }

    function deleteFieldList(index) {
        const newFieldList = fieldList.filter((field, i) => i !== index);
        setFieldList(newFieldList);
        setActive(0);
        transform(newFieldList);
    }

    function updateField(index, value) {
        const newFieldList = [...fieldList];
        newFieldList[index] = value;
        transform(newFieldList);
    }

    function handleUp(index) {
        const newFieldList = arrayMoveImmutable(fieldList, index, index - 1);
        setFieldList(newFieldList)
        setActive(index - 1);
        console.log(newFieldList);
        transform(newFieldList);
    }

    function handleDown(index) {
        const newFieldList = arrayMoveImmutable(fieldList, index, index + 1);
        setFieldList(newFieldList)
        setActive(index + 1);
        transform(newFieldList);
    }

    const handleChanges = (fieldList) => {
        transform(fieldList);
    }

    function handleSubmit(value) {
        handleOnSubmit(fieldList);
    }

    return (
        <div>
            {fieldList.map(function (field, index) {

                if (field.element === 'input_text') {
                    return (<InputText key={index} fieldList={fieldList} field={field} index={index} active={active}
                                       setActive={setActive} handleUp={handleUp} handleDown={handleDown}
                                       isPublic={isPublic} updateField={updateField}
                                       deleteFieldList={deleteFieldList}/>)
                }
                if (field.element === 'phone') {
                    return (<InputPhone key={index} fieldList={fieldList} field={field} index={index} active={active}
                                        setActive={setActive} handleUp={handleUp} handleDown={handleDown}
                                        isPublic={isPublic} updateField={updateField}
                                        deleteFieldList={deleteFieldList}/>)
                }
                if (field.element === 'custom_html') {
                    return (<CustomHtml key={index} fieldList={fieldList} field={field} index={index} active={active}
                                        setActive={setActive} handleUp={handleUp} handleDown={handleDown}
                                        isPublic={isPublic} updateField={updateField}
                                        deleteFieldList={deleteFieldList}/>)
                }
                if (field.element === 'whatsapp_rotator') {

                    return (
                        <WhatsappRotator key={index} fieldList={fieldList} field={field} index={index} active={active}
                                         setActive={setActive} handleUp={handleUp} handleDown={handleDown}
                                         isPublic={isPublic} updateField={updateField} form={form}
                                         publicSubmit={publicSubmit} deleteFieldList={deleteFieldList}/>)
                }
                if (field.element === 'countdown') {
                    return (<Countdown key={index} fieldList={fieldList} fields={field} index={index}
                                       handleUp={handleUp} handleDown={handleDown} active={active}
                                       setActive={setActive} updateField={updateField}
                                       deleteFieldList={deleteFieldList}
                                       isPublic={isPublic}/>)
                }


            })}
            {!hasSubmitButton && (
                <SubmitButton form={form} submitField={submitField} active={active} setActive={setActive}
                              isPublic={isPublic} handleSubmitChanges={handleSubmitChanges}
                              publicSubmit={publicSubmit}/>)}
            {!isPublic && (<div className="py-3 px-6 bg-gray-200 border-t-1 border-gray-300">
                <div className="mt-2">Standar Input</div>
                <ButtonInput name={"input"} type={'input_text'} callback={addFieldList}/>
                <ButtonInput name={"phone"} type={'phone'} callback={addFieldList}/>
                <ButtonInput name={"text"} type={'custom_html'} callback={addFieldList}/>
                <div className="mt-2">Widget</div>
                <ButtonInput name={"whatsapp rotator"} type={'whatsapp_rotator'} callback={addFieldList}/>
                <ButtonInput name={"countdown"} type={'countdown'} callback={addFieldList}/>
            </div>)}
        </div>)
}

function ButtonInput({name, type = 'input_text', callback}) {
    return (<button
        key={name}
        onClick={() => callback(type)}
        className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline mt-1 mr-1 bg-gray-600 text-white hover:bg-gray-700">{name}
    </button>)
}

export default Fields;
