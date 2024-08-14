import { useEffect } from 'react';
import { useState } from 'react';

export const useValidateForm = ( formData = {}) => {
  
    const [ formState, setFormState ] = useState( formData );
    const [ formValidation, setFormValidation ] = useState({});

    useEffect(() => {
        setFormState( formData );
    }, [ formData ])

    const isFormValid = () => {
        const { user, ...restFormState } = formState;
        
        for (const key in restFormState) {
            if (Object.hasOwnProperty.call(restFormState, key)) {
                switch (key) {
                    case 'title':
                        setFormValidation({
                            ...formValidation,
                            title: restFormState.title.trim().length <= 3 ? 'Title must be at least 3 characters long' : null
                        });
                        break;
                
                    default:
                        break;
                }
            }
        }
    }

    const clearErrors = (target) => {
        setFormValidation({
            ...formValidation,
            [target]: null
        });
    }

    return {
        formState,

        isFormValid,
        clearErrors,
        formValidation
    }
}