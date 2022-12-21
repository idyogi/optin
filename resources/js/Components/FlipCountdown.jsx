import React, {useState} from 'react';
import FlipModule from "@pqina/flip";
import {FlipDate} from "./FlipDate";

function FlipCountdown() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <FlipDate value={"70"}/>
        </div>
    );
}

export default FlipCountdown;