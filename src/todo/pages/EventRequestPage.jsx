import { useEffect, useMemo, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker"
import { es } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";
import { fireModal } from "../../helpers";
import { useForm } from "react-hook-form";

registerLocale('es', es);

export const EventRequestPage = () => {
    const { startSavingEvent, message } = useCalendarStore();
    const { isCheckingForm } = useUiStore();

    const isCheckingData = useMemo(() => isCheckingForm === true, [isCheckingForm]);

    const { control, register, handleSubmit, formState: { errors } } = useForm();

    const [formValidation, setFormValidation] = useState({
        title: null,
        start: null,
        end: null,
        requiriments: null,
        description: null
    });
    
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

    const onSubmit = handleSubmit((data) => {

        const { title, start, end, requiriments, description } = formValues;

        const errors = {
            title: title.trim() === '' ? 'El título es obligatorio' : null,
            start: start > end ? 'La fecha de inicio no puede ser mayor a la fecha de finalización' 
                : !start ? 'La fecha de inicio es obligatoria'
                : start < new Date() ? 'La fecha de inicio no puede ser menor a la fecha actual'
                : null,
            end: end < start ? 'La fecha de finalización no puede ser menor a la fecha de inicio'
                : !end ? 'La fecha de finalización es obligatoria'
                : null,
            requiriments: requiriments.length === 0 ? 'Debes seleccionar al menos un requerimiento' : null,
            description: description.trim() === '' ? 'La descripción es obligatoria' : null
        }

        if (Object.values(errors).some(error => error !== null)) {
            setFormValidation(errors);
            return;
        }

        startSavingEvent(formValues);
    })

    const cleanError = (target) => {
        setFormValidation({
            ...formValidation,
            [target]: null
        });
    }

    useEffect(() => {
        if(message !== undefined) {
            fireModal({ title: 'Ha ocurrido un error', text: message, icon: 'error' })
        }
    }, [message]);
    
    return (
        <>
            <h1 className="text-center text-3xl mb-5">Nuevo Evento</h1>
            <form className="flex flex-col gap-5 max-w-screen-lg m-auto" onSubmit={ onSubmit }>
                <div className="flex flex-col gap-1">
                    <label htmlFor="title">Evento *</label>
                    <input 
                        onBlur={ () => cleanError('title')}
                        className={`w-full p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded transition ${ !!formValidation.title && 'outline outline-red-500 transition' }`}
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
                            onBlur={() => cleanError('start')}
                            className={`w-full p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded transition ${ !!formValidation.start && 'outline outline-red-500' }`}
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
                            onBlur={() => cleanError('end')}
                            className={`w-full p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded transition ${ !!formValidation.end && 'outline outline-red-500' }`}
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
                        <label htmlFor="fotografia" className="mr-2 text-gray-900">Fotografía</label>
                    </div>
                    <div className="flex gap-2">
                        <input onClick={ () => cleanError('requiriments') } type="checkbox" name="Video" id="Video" value="video" onChange={ onCheckboxChange } />
                        <label htmlFor="Video" className="mr-2 text-gray-700">Video</label>
                    </div>
                    <div className="flex gap-2">
                        <input onClick={ () => cleanError('requiriments') } type="checkbox" name="Reel" id="Reel" value="reel" onChange={ onCheckboxChange } />
                        <label htmlFor="Reel" className="mr-2 text-gray-700">Reel</label>
                    </div>
                    <div className="flex gap-2">
                        <input onClick={ () => cleanError('requiriments') } type="checkbox" name="Transmicion" id="Transmicion" value="transmicion" onChange={ onCheckboxChange } />
                        <label htmlFor="Transmicion" className="mr-2 text-gray-700">Transmisión en Vivo</label>
                    </div>
                    <p className={`text-red-500 text-sm transition ${!!formValidation.requiriments ? '' : 'hidden' }`}>* { formValidation.requiriments }</p>
                </div>
                <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="description">Descripción de la Solicitud *</label> 
                        <textarea
                            onBlur={ () => cleanError('description')}
                            className={`${ !!formValidation.description && 'outline outline-red-500' } p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded transition resize-none`}
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
                    <button className="p-4 bg-indigo-800/90 rounded hover:bg-indigo-600 focus:bg-indigo-700 transition text-white" disabled={ isCheckingData } >Enviar Solicitud</button>
            </form>
        </>
    )
}
