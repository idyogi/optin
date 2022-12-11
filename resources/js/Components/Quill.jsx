import React, {useMemo, useRef, useState} from 'react';
import {useQuill} from "react-quilljs";
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

function Quill({html, onChange}) {

    const {quill, quillRef} = useQuill();

    React.useEffect(() => {
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(html
            );
            quill.on('text-change', (delta, oldDelta, source) => {
                onChange(quill.root.innerHTML);
            });
        }
    }, [quill]);
    return (

        <div>
            <div ref={quillRef}/>
        </div>
    );
}

export default Quill;
