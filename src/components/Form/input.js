import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import './style.css';

function Input({ name, ...rest }) {
    
    const inputRef = useRef(null)

    const { fieldName, registerField, defaultValue, error} = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField]);

    return( 
        <div>
            <input className='input' ref={inputRef} defaultValue={defaultValue} {...rest} />
            <div>
                <span style={{ color: '#f00'}}>{error}</span>
            </div>
        </div>
    );
}

export default Input;