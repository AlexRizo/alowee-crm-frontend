import DatePicker, { registerLocale } from "react-datepicker"
import { es } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { addHours } from "date-fns";
import { useEventStore, useAuthStore, useValidateForm } from "../../hooks";

registerLocale('es', es);

export const EventRequestPage = () => {
    const { startSavingEvent } = useEventStore();
    const { user } = useAuthStore();

    
    const [formValues, setFormValues] = useState({
        title: '',
        requiriments: [],
        start: new Date(),
        end: addHours(new Date(), 2),
        description: '',
        user
    });
    
    const { formValidation, isFormValid, clearErrors } = useValidateForm(formValues);

    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const onCheckboxChange = ({ target }) => {
        if (target.checked) {
            setFormValues({
                ...formValues,
                requiriments: [
                    ...formValues.requiriments,
                    target.value
                ]
            });
        } else {
            setFormValues({
                ...formValues,
                requiriments: formValues.requiriments.filter(req => req !== target.value)
            });
        }
    }

    const onDateChange = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        
        // if (formValues.title.trim().length <= 3) {
        //     setformValidation({
        //         ...formValidation,
        //         title: 'El título debe tener al menos 3 caracteres'
        //     });
        //     return;
        // }

        // if (formValues.start >= formValues.end) {
        //     setformValidation({
        //         ...formValidation,
        //         start: 'La fecha de inicio no es válida',
        //         end: 'La fecha de finalización no es válida'
        //     });
        //     return;
        // }

        // if (formValues.requiriments.length === 0) {
        //     setformValidation({
        //         ...formValidation,
        //         requiriments: 'Debes seleccionar al menos un requerimiento'
        //     });
        //     return;
        // }

        // if (formValues.description.trim().length <= 3) {
        //     setformValidation({
        //         ...formValidation,
        //         description: 'La descripción es obligatoria'
        //     });
        //     return;
        // }


        isFormValid();
        
        startSavingEvent(formValues);
    }

    const cleanError = (target) => {
        clearErrors(target);
    }
    
    return (
        <>
            <h1 className="text-center text-3xl mb-5">Nueva Solicitud de Evento</h1>
            <form className="flex flex-col gap-5 max-w-screen-lg m-auto" onSubmit={ onSubmit }>
                <div className="flex flex-col gap-1">
                    <label htmlFor="title">Evento *</label>
                    <input 
                        onBlur={ () => cleanError('title')}
                        className={`w-full p-2 bg-violet-400/10 rounded border border-gray-400/10 focus:outline-none focus:ring focus:ring-violet-600 transition ${ !!formValidation.title && 'outline outline-red-500 transition' }`}
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Nombre del evento"
                        onChange={ onInputChange }
                        value={ formValues.title }
                    />
                    <p className={`text-red-500 text-sm transition ${!!formValidation.title ? '' : 'hidden' }`}>* { formValidation.title }</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="start">Fecha de Inicio *</label> 
                        <DatePicker
                            className={`w-full p-2 bg-violet-400/10 rounded border border-gray-400/10 focus:outline-none focus:ring focus:ring-violet-600 transition ${ !!formValidation.start && 'outline outline-red-500' }`}
                            placeholderText="Fecha de inicio del evento"
                            dateFormat='Pp'
                            showTimeSelect
                            locale='es'
                            timeCaption="Hora"
                            selected={ formValues.start }
                            onChange={ (event) => onDateChange(event, 'start') }
                        />
                        <p className={`text-red-500 text-sm transition ${!!formValidation.start ? '' : 'hidden' }`}>* { formValidation.start }</p>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="end">Fecha de Finalización *</label> 
                        <DatePicker
                            className={`w-full p-2 bg-violet-400/10 rounded border border-gray-400/10 focus:outline-none focus:ring focus:ring-violet-600 transition ${ !!formValidation.end && 'outline outline-red-500' }`}
                            placeholderText="Fecha de finalización del evento"
                            dateFormat='Pp'
                            showTimeSelect
                            locale='es'
                            timeCaption="Hora"
                            selected={ formValues.end }
                            minDate={ formValues.start }
                            onChange={ (event) => onDateChange(event, 'end') }
                        />
                        <p className={`text-red-500 text-sm transition ${!!formValidation.end ? '' : 'hidden' }`}>* { formValidation.end }</p>
                    </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <p>Requerimientos *</p> 
                    <div className="flex gap-2">
                        <input onClick={ () => cleanError('requiriments') } type="checkbox" name="fotografia" id="fotografia" value="fotografia" onChange={ onCheckboxChange } />
                        <label htmlFor="fotografia" className="mr-2 text-gray-300">Fotografía</label>
                    </div>
                    <div className="flex gap-2">
                        <input onClick={ () => cleanError('requiriments') } type="checkbox" name="Video" id="Video" value="video" onChange={ onCheckboxChange } />
                        <label htmlFor="Video" className="mr-2 text-gray-300">Video</label>
                    </div>
                    <div className="flex gap-2">
                        <input onClick={ () => cleanError('requiriments') } type="checkbox" name="Reel" id="Reel" value="reel" onChange={ onCheckboxChange } />
                        <label htmlFor="Reel" className="mr-2 text-gray-300">Fotografía</label>
                    </div>
                    <div className="flex gap-2">
                        <input onClick={ () => cleanError('requiriments') } type="checkbox" name="Transmicion" id="Transmicion" value="transmicion" onChange={ onCheckboxChange } />
                        <label htmlFor="Transmicion" className="mr-2 text-gray-300">Transmisión en Vivo</label>
                    </div>
                    <p className={`text-red-500 text-sm transition ${!!formValidation.requiriments ? '' : 'hidden' }`}>* { formValidation.requiriments }</p>
                </div>
                <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="description">Descripción de la Solicitud *</label> 
                        <textarea
                            className={`${ !!formValidation.description && 'outline outline-red-500' } p-2 bg-violet-400/10 rounded border border-gray-400/10 transition focus:outline-none focus:ring focus:ring-violet-600 resize-none`}
                            name="description"
                            id="description"
                            placeholder="Descripción de la solicitud"
                            rows={ 10 }
                            maxLength={ 1020 }
                            onChange={ onInputChange }
                            value={ formValues.description }
                        />
                        <p className={`text-red-500 text-sm transition ${!!formValidation.description ? '' : 'hidden' }`}>* { formValidation.description }</p>
                    </div>
                    <button className="p-4 bg-violet-700 rounded hover:bg-violet-600 focus:bg-violet-800 transition">Enviar Solicitud</button>
            </form>
        </>
    )
}
