import React, {useState} from 'react';
import CustomHtml from "./CustomHtml";
import ButtonInput from "../../../../Components/ButtonInput";

function ResponseFields({responseFields, transform, formatFields}) {
    const [active, setActive] = useState(0);
    const [fieldList, setFieldList] = useState(responseFields);

    function addFieldList(type) {
        const field = formatFields[type];
        setFieldList([...fieldList, field]);
        setActive(fieldList.length);
        console.log(fieldList.length);

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
                                        deleteFieldList={deleteFieldList}/>)
                }
            })}
            <div className="py-3 px-6 bg-gray-200 border-t-1 border-gray-300">
                <div className="mt-2">Standar Response</div>
                <ButtonInput name={"text"} type={'custom_html'} callback={addFieldList}/>

                <button
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline mt-1 mr-1 bg-gray-600 text-white hover:bg-gray-700">countdown
                </button>
                <button
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline mt-1 mr-1 bg-gray-600 text-white hover:bg-gray-700">konten
                    terkunci
                </button>
                <button
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline mt-1 mr-1 bg-gray-600 text-white hover:bg-gray-700">text
                    by status
                </button>
                <div className="mt-2">Viral Response</div>
                <button
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline mt-1 mr-1 bg-gray-600 text-white hover:bg-gray-700">share
                </button>
                <button
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline mt-1 mr-1 bg-gray-600 text-white hover:bg-gray-700">click
                </button>
                <button
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline mt-1 mr-1 bg-gray-600 text-white hover:bg-gray-700">link
                    rotator
                </button>
                <button
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline mt-1 mr-1 bg-gray-600 text-white hover:bg-gray-700">point
                </button>
                <button
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline mt-1 mr-1 bg-gray-600 text-white hover:bg-gray-700">leaderboard
                </button>
            </div>
        </div>)
}

export default ResponseFields;
