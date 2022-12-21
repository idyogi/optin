import React, {useRef, useEffect, useState} from "react";
import Tick from "@pqina/flip";
import "@pqina/flip/dist/flip.min.css";

export const WorkingFlipDate = ({value}) => {
    const divRef = useRef();
    const tickRef = useRef();

    const [tickValue, setTickValue] = useState(value);

    // Make the Tick instance and store it in the refs
    useEffect(() => {
        const didInit = tick => {
            tickRef.current = tick;
        };

        const currDiv = divRef.current;
        const tickValue = tickRef.current;
        Tick.DOM.create(currDiv, {
            value,
            didInit
        });
        return () => Tick.DOM.destroy(tickValue);
    }, [value]);

    // Start the Tick.down process
    useEffect(() => {
        const offset = new Date(tickValue);
        console.log('dataserver',new Date(), offset);
        const counter = Tick.count.down(offset, {
            format: ["h", "m", "s"],
            server: false
        });

        // When the counter updates, update React's state value
        counter.onupdate = function (value) {
            setTickValue(value);
        };

        return () => {
            counter.timer.stop();
        };
    }, [value]);

    // When the tickValue is updated, update the Tick.DOM element
    useEffect(() => {
        if (tickRef.current) {
            tickRef.current.value = tickValue;
        }
    }, [tickValue]);

    return (
        <div ref={divRef} className="tick">
            <div data-repeat="true">
                <span data-view="flip"/>
            </div>
        </div>
    );
};
