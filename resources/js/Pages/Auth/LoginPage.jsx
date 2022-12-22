import React, {useCallback, useState} from 'react';
import {useForm, usePage} from "@inertiajs/inertia-react";
import {FormGroup, Label, Spinner, Input, FormFeedback, Button} from "reactstrap";

export default function LoginPage({config}) {
    const {data, setData, post, processing, transform, errors} = useForm({});
    const handleChange = (key, value) => {

        const newData = {...data, [key]: value};
        setData(newData);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(config.app.url );
        post(config.app.url + '/login');
    }

    return (
        <div>

            <div className="min-h-screen w-full bg-gray-100 font-sans aliased flex flex-col">
                <div className="flex-1 flex items-center bg-gray-100 py-12 relative">
                    <div className="h-1/2 w-full mx-auto bg-primary-600 absolute inset-x-0 top-0"></div>
                    <div className="max-w-xl mx-auto px-8 relative space-y-6"><h1
                        className="text-center text-3xl text-white font-medium"><a href="/"><span
                        className="font-bold">Funnel</span>.ink</a></h1>
                        <div className="rounded-lg shadow bg-white overflow-hidden divide-y divide-gray-200">

                            <form onSubmit={handleSubmit} className="px-8 py-12 space-y-4">

                                <div className="px-4 ">
                                    {errors.email &&
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
                                                <FormFeedback>{errors.email}</FormFeedback>

                                            </div>
                                        </div>}
                                </div>
                                <h2 className="text-lg font-medium"> Login </h2>
                                <div>
                                    <label htmlFor="email" className="inline-block text-sm font-medium"> Email
                                        address </label><input
                                    type="email"
                                    placeholder="Enter your email"
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="form-input border border-gray-300 w-full rounded-md shadow-sm mt-1"/>
                                </div>
                                <div><label htmlFor="password"
                                            className="inline-block text-sm font-medium"> Password </label>
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        onChange={(e) => handleChange('password', e.target.value)}
                                        className="form-input border border-gray-300 w-full rounded-md shadow-sm mt-1"/>
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    disabled={processing}
                                    className="inline-flex items-center justify-center text-sm font-medium border rounded-md transition-all ease-in-out duration-100 focus:outline-none focus:shadow-outline border-primary-500 bg-primary-500 text-white shadow hover:bg-primary-400 hover:border-primary-400 focus:border-primary-700 focus:bg-primary-600 px-4 py-2 text-md flex w-full">
                                    {processing ? 'Loading ...' : 'Masuk'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};
