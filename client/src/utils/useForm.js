import { useState } from 'react';

export const useForm = (initialValue = {}, formSubmitCallback) => {
    const [values, setValues] = useState(initialValue);

    // handles changes and state updating for any form input dynamically through its unique name and value. 
    const handleChanges = e => {
        e.preventDefault();
        setValues({...values, [e.target.name]: e.target.value});
    }

    // 'submits' form by triggering a callback function defined in the page the current instance of useForm is imported into
    const handleSubmit = e => {
        e.preventDefault();
        formSubmitCallback();
    }

    // returns access to state, handleChanges and handleSubmit functions
    return [values, handleChanges, handleSubmit];
}