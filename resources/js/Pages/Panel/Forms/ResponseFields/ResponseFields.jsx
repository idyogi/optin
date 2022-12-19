import React, {useState} from 'react';
import CustomHtml from "./CustomHtml";

function ResponseFields({responseFields}) {
    const [active, setActive] = useState(0);

    function updateField(index, value) {
        const newFieldList = [...responseFields];
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
            {responseFields.map((responseField, index) => {
                if (responseField.element === 'custom_html') {
                    return (<CustomHtml key={index} fieldList={responseFields} fields={responseField} index={index}
                                        handleUp={handleUp} handleDown={handleDown} active={active}
                                        setActive={setActive} updateField={updateField} deleteFieldList={deleteFieldList}/>)
                }
            })}
        </div>)
}

export default ResponseFields;
