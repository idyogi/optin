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
        console.log(data);
        post(config.app.url+'/login');
    }

    return (
        <div className="min-h-screen bg-gray-100 pt-12 bg-cover px-6 lg:px-8">
            <div className="flex justify-center items-center lg:-mt-16 h-screen">
                <div className="bg-white  shadow-xl rounded-lg pb-8 pt-6">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md"><h2
                        className="mt-6 text-center text-3xl font-extrabold"> Sign in ke Akun </h2><p
                        className="mt-2 text-center text-sm max-w"> atau <a
                        className="underline hover:text-gray-200" href="/register"> daftar bila belum punya
                        akun </a></p></div>
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="px-4 ">
                            {errors.email &&
                                <div id="alert-2" className="flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200"
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
                                    <button type="button"
                                            className="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
                                            data-dismiss-target="#alert-2" aria-label="Close"><span
                                        className="sr-only">Close</span>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                    </button>
                                </div>}
                        </div>
                        <div className="py-8 px-4 rounded-3xl sm:px-10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div><label htmlFor="email"
                                            className="sr-only block text-sm font-medium text-gray-700"> Email
                                    address </label>
                                    <div className="mt-1">
                                        <Input invalid={!!errors.email} type="email"

                                               placeholder="Enter your email"
                                               onChange={(e) => handleChange('email', e.target.value)}
                                               className="text-center rounded-2xl bg-gray-200 appearance-none block w-full px-3 py-2 rounded-2xl shadow-sm placeholder-gray-500 font-medium tracking-wider text-gray-500 placeholder-opacity-50 focus:outline-none focus:ring-indigo-500 placeholder- focus:border-indigo-500 text-lg"
                                        /></div>
                                </div>
                                <div>
                                    <button type="button" className="block text-sm font-medium text-gray-700">Tampilkan
                                        Password
                                    </button>
                                    <div className="mt-1"><Input type="password"
                                                                 placeholder="Enter your password"
                                                                 onChange={(e) => handleChange('password', e.target.value)}
                                                                 className="text-center rounded-2xl bg-gray-200 appearance-none block w-full px-3 py-2 rounded-2xl shadow-sm placeholder-gray-500 font-medium tracking-wider text-gray-500 placeholder-opacity-50 focus:outline-none focus:ring-indigo-500 placeholder- focus:border-indigo-500 text-lg"
                                    /></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="remember_me" name="remember_me"
                                               type="checkbox"
                                               className="h-5 w-5 tracking-wider font-medium text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/><label
                                        htmlFor="remember_me" className="ml-2 block text-sm text-gray-900"> Ingat
                                        Saya </label>
                                    </div>
                                    <div className="text-sm"><a
                                        className="underline font-medium text-purple-600 hover:text-indigo-500"
                                        href="/forgot-password"> Lupa Password? </a></div>
                                </div>
                                <div>
                                    <Button color="primary"
                                            onClick={handleSubmit}
                                            disabled={processing}
                                            className="w-full flex justify-center py-3 px-5 border border-transparent rounded-2xl text-xl font-medium text-white bg-purple-900 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        {processing ? 'Loading ...' : 'Masuk'}
                                    </Button>
                                </div>
                            </form>
                            <div className="mt-6">
                                <div className="relative">
                                    <div className="relative flex gap-2 justify-center">
                                        <div className="-mt-1 text-gray-400 font-thin"> _________________</div>
                                        <span className="px-2 text-lg text-gray-400"> Atau </span>
                                        <div className="-mt-1 text-gray-400 font-thin"> _________________</div>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <div><a href="/google/redirect"
                                            className="w-full flex gap-2 justify-center inline-flex justify-center py-3 rounded-2xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"><img
                                        className="w-7 h-7"
                                        src="https://img.icons8.com/color/24/000000/google-logo.png"/><span
                                        className="text-lg"> Masuk dengan Akun Google </span></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
