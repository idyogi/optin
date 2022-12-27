import React, {useState} from 'react';
import {Button, FormFeedback, FormGroup, Label, Spinner} from "reactstrap";
import {Input} from "postcss";
import Fields from "../../../Components/Fields";
import {Head, useForm, usePage} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResponseFields from "../../Panel/Forms/ResponseFields/ResponseFields";

function ViewForm({form, fields, responseFields, reference, submitButton, settings, submission, config}) {
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
        if (reference) {
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
                //open link new tab
                if (res.props.flash.success.redirectTo) {
                    window.open(res.props.flash.success.redirectTo, '_self');
                }
            }
        });
    }

    function createMarkup() {
        return {__html: settings.confirmation.message};
    }


    let getImageFromContent = (content) => {
        let img = content.match(/<img[^>]+src="([^">]+)"/g);
        if (img) {
            return img[0].replace(/<img[^>]+src="([^">]+)"/g, '$1');
        }
        return null;
    }
    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>{formData.title}</title>
            </Head>
            <ToastContainer/>
            <div className="font-sans max-w-3xl mx-auto sm:px-6 lg:py-6 lg:px-8">
                <div className="bg-white  shadow-xl rounded-lg pb-8 pt-6">
                    <div className="px-4 ">
                        {form.errors.fields &&
                            <div id="alert-2"
                                 className="flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200"
                                 role="alert">
                                <svg className="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800"
                                     fill="currentColor"
                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                          clipRule="evenodd"></path>
                                </svg>
                                <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
                                    <FormFeedback>{form.errors.fields}</FormFeedback>

                                </div>
                            </div>}
                    </div>
                    {showResponse && (<div className="flex-auto px-6 md:px-8 ">
                        <ResponseFields form={form} isPublic={true} responseFields={responseFields}
                                        submissionId={submissionId}/>
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
