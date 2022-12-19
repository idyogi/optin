import React from 'react';

function ButtonInput({name, type = 'input_text', callback}) {
    return (<button
        key={name}
        onClick={() => callback(type)}
        className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline mt-1 mr-1 bg-gray-600 text-white hover:bg-gray-700">{name}
    </button>)
}

export default ButtonInput;