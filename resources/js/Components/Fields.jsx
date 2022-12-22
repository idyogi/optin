import React, {useState} from 'react';
import InputText from "./Fields/InputText";
import {arrayMoveImmutable} from 'array-move';
import InputPhone from "./Fields/InputPhone";
import SubmitButton from "./Fields/SubmitButton";
import Countdown from "../Pages/Panel/Forms/ResponseFields/Countdown";
import CustomHtml from "../Pages/Panel/Forms/ResponseFields/CustomHtml";
import ResponseWhatsappRotator from "../Pages/Panel/Forms/ResponseFields/ResponseWhatsappRotator";

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

    function updateField(index, value) {
        setActive(index);
        transform(fieldList);
    }

    return (
        <div>
            {fieldList.map(function (field, index) {

                if (field.element === 'input_text') {
                    return (<InputText key={index} fieldList={fieldList} index={index} active={active}

                                       isPublic={isPublic} updateField={updateField}
                    />)
                }
                if (field.element === 'phone') {
                    return (<InputPhone key={index} fieldList={fieldList} index={index} active={active}

                                        isPublic={isPublic} updateField={updateField}
                    />)
                }
                if (field.element === 'custom_html') {
                    return (<CustomHtml key={index} fieldList={fieldList} index={index} active={active}

                                        isPublic={isPublic} updateField={updateField}
                    />)
                }
                if (field.element === 'whatsapp_rotator') {

                    return (
                        <ResponseWhatsappRotator key={index} fieldList={fieldList} index={index} active={active}
publicSubmit={publicSubmit}
                                         isPublic={isPublic} updateField={updateField} form={form}
                                         publicSubmit={publicSubmit}/>)
                }
                if (field.element === 'countdown') {
                    return (<Countdown key={index} fieldList={fieldList} fields={field} index={index}
                                       active={active}
                                       updateField={updateField}

                                       isPublic={isPublic}/>)
                }


            })}
            {!hasSubmitButton && (
                <SubmitButton form={form} submitField={submitField} active={active}
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
