import React from 'react';
import {usePage} from "@inertiajs/inertia-react";
import {Alert} from "reactstrap";

function FlashMessage() {
    const {flash, errors} = usePage().props;

    if (flash.message || flash.success) {
        return (<Alert>{flash.message || flash.success}</Alert>)
    }
    if (flash.error) {
        return (<Alert color="danger">{flash.error}</Alert>)
    }

    if (errors && errors.length == 1) {
        return (<Alert color="danger">{errors[0]}</Alert>)
    } else if (errors && errors.length > 1) {
        return (
            <Alert color="danger">
                {errors.map((error, index) => {
                    return (<div key={index}>{error}</div>);
                })}
            </Alert>
        )
    }

    return (
        <></>
    );
}

export default FlashMessage;
