import React from 'react';
import {usePage} from "@inertiajs/inertia-react";
import {Alert} from "reactstrap";
import {toast} from "react-toastify";

function FlashMessage() {
    const {flash, errors} = usePage().props;

    if (flash.message || flash.success) {
        console.log('flash', flash);
        toast(flash.message || flash.success, {
            type: flash.success ? 'success' : 'error',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        toast.clearWaitingQueue();
        return (<> </>);
    }
    if (flash.error) {
        toast.error(flash.error, {
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        toast.clearWaitingQueue();
        return () => {
        }
    }

    if (errors && errors.length == 1) {
        toast.error(errors[0], {
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        toast.clearWaitingQueue();
        return () => {
        }
    } else if (errors && errors.length > 1) {
        return (
            <Alert color="danger">
                <ul className="mb-0">
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            </Alert>

        )
    }

    return (
        <></>
    );
}

export default FlashMessage;
