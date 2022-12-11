import React, {useState} from 'react';
import {Button, FormGroup, Label, Spinner} from "reactstrap";
import {Input} from "postcss";
import Fields from "../../../Components/Fields";
import {useForm, usePage} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewForm({form, fields, submitButton,settings, config}) {
    const formData = form;
    const [showResponse, setShowResponse] = useState(false);
    form = useForm([]);
    const handleChanges = (fieldList) => {
        const newData = fieldList.map(field => {
            return {name: field.element, value: field.attributes.value}
        });
        form.setData({fields: newData});

    }
    const publicSubmit = (e) => {
        e.preventDefault()
        console.log(form.data);
        form.post('/form/' + formData.slug + '/lead', {
            onError: () => toast.error('Gagal mengirim data, silakan coba lagi'),
            onSuccess: () => {
                toast.success('Data berhasil dikirim');
                setShowResponse(true);
            }
        });
        // setSubmitted(true);
        // Inertia.reload();

    }
    function createMarkup() {
        return {__html: settings.confirmation.message};
    }


    return (


        <div className="min-h-screen bg-gray-100">
            <ToastContainer/>
            <div className="font-sans max-w-3xl mx-auto sm:px-6 lg:py-6 lg:px-8">
                <div className="bg-white  shadow-xl rounded-lg pb-8 pt-6">

                    {showResponse ? (<div className="flex-auto px-6 md:px-8 "><div className="ql-editor"><div dangerouslySetInnerHTML={createMarkup()}/></div></div>) : (<Fields isPublic={true} fields={fields} submitField={submitButton} form={form}
                            transform={handleChanges}
                            publicSubmit={publicSubmit}/>)}
                </div>
            </div>
        </div>
    );
}

export default ViewForm;
