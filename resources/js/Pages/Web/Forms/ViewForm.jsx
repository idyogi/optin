import React, {useState} from 'react';
import {Button, FormGroup, Label, Spinner} from "reactstrap";
import {Input} from "postcss";
import Fields from "../../../Components/Fields";
import {useForm, usePage} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResponseFields from "../../Panel/Forms/ResponseFields/ResponseFields";

function ViewForm({form, fields, responseFields,reference, submitButton, settings,submission, config}) {
    const formData = form;
    const [showResponse, setShowResponse] = useState(submission);
    const [submissionId, setSubmissionId] = useState(submission);
    form = useForm([]);
    const handleChanges = (fieldList) => {
        const newData = fieldList.map(field => {
            return {name: field.element, value: field.value}
        });
        const data = {};
        data.fields = newData;
        if(reference){
            data.reference = reference;
        }
        form.setData(data);

    }
    const publicSubmit = (e) => {
        e.preventDefault()
        const res = form.post('/form/' + formData.slug + '/lead', {
            onError: () => toast.error('Gagal mengirim data, silakan coba lagi'),
            onSuccess: (res) => {
                setSubmissionId(res.props.flash.success.submission_id);
                toast.success('Data berhasil dikirim');
                setShowResponse(true);
                console.log(res.props.flash.success);
                //open link new tab
                if (res.props.flash.success.redirectTo) {
                    window.open(res.props.flash.success.redirectTo, '_blank');
                }
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
                    {showResponse && (<div className="flex-auto px-6 md:px-8 ">
                        <ResponseFields form={form} isPublic={true} responseFields={responseFields} submissionId={submissionId}/>
                    </div>)}
                    {!showResponse && (
                        <Fields isPublic={true} fields={fields} submitField={submitButton} form={form}
                                transform={handleChanges}
                                publicSubmit={publicSubmit}/>)}
                </div>
            </div>
        </div>
    );
}

export default ViewForm;
