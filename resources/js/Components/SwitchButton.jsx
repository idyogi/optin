import {useState} from "react";
import {Switch} from '@headlessui/react'
import React from 'react';

function SwitchButton({name,value,onChanged}) {
    const [enabled, setEnabled] = useState(value)
    function handleEnabled() {
        setEnabled(!enabled);
        onChanged(name,!enabled);
    }
    return (
        <div>
            <Switch
                checked={enabled}
                onChange={handleEnabled}
                className={`${enabled ? 'bg-indigo-600' : 'bg-gray-200'} z-0
          inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            > <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={`${enabled ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                />
            </Switch>
        </div>
    )
}

export default SwitchButton;