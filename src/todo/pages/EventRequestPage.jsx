import { useEffect, useMemo } from "react";
import DatePicker, { registerLocale } from "react-datepicker"
import { es } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import { useCalendarStore, useUiStore } from "../../hooks";
import { fireModal, validateCheckboxes } from "../../helpers";
import { Controller, useForm } from "react-hook-form";
import { ErrorComponent } from "../components";

registerLocale('es', es);

export const EventRequestPage = () => {
    const { startSavingEvent, message } = useCalendarStore();
    const { isCheckingForm } = useUiStore();

    const isCheckingData = useMemo(() => isCheckingForm === true, [isCheckingForm]);

    const { control, register, handleSubmit, formState: { errors }, watch } = useForm();

    const startDate = watch('start');

    const onSubmit = handleSubmit((data) => {
        startSavingEvent(data);
    })

    useEffect(() => {
        if(message !== undefined) {
            fireModal({ title: 'Ha ocurrido un error', text: message, icon: 'error' })
        }
    }, [message]);
    
    return (
        <div className="bg-white w-full p-6 rounded shadow container mx-auto">
            <h1 className="text-xl font-medium">Solicitud de Evento</h1>
            <p className="text-gray-600 mb-6">Compártenos los detalles del evento</p>
            <form className="flex flex-col gap-5" onSubmit={ onSubmit }>
                <div className="flex flex-col gap-1">
                    <label htmlFor="title">Evento</label>
                    <input 
                        className={`w-full p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded transition`}
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Nombre del evento"
                        { ...register('title', {
                            required: {
                                value: true,
                                message: 'Este campo es obligatorio'
                            },
                            maxLength: {
                                value: 50,
                                message: 'Sólo se permiten 50 caracteres'
                            }
                        }) }
                    />
                    { errors.title && <ErrorComponent error={ errors.title.message } /> }
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="start">Fecha de Inicio</label>
                        <Controller
                            control={ control }
                            name="start"
                            rules={{ 
                                required: {
                                    value: true,
                                    message: 'La fecha de inicio es obligatoria'
                                },
                                validate: (value) => value > new Date() || 'A caso tienes una máquina del tiempo?'
                            }}
                            render={({ field }) => (
                                <DatePicker
                                    className={`w-full p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded transition`}
                                    placeholderText="Fecha de inicio del evento"
                                    dateFormat='Pp'
                                    showTimeSelect
                                    locale='es'
                                    timeCaption="Hora"
                                    minDate={ new Date() }
                                    onChange={ (event) => field.onChange(event) }
                                    selected={ field.value }
                                />
                            )}
                        />
                        { errors.start && <ErrorComponent error={ errors.start.message } /> }
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="end">Fecha de Finalización</label> 
                        <Controller
                            control={ control }
                            name="end"
                            rules={{ 
                                required: {
                                    value: true,
                                    message: 'La fecha de finalización es obligatoria'
                                },
                                validate: (value) => value > new Date() || 'A caso tienes una máquina del tiempo?'
                            }}
                            render={({ field }) => (
                                <DatePicker
                                    className={`w-full p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded transition`}
                                    placeholderText="Fecha de finalización del evento"
                                    dateFormat='Pp'
                                    showTimeSelect
                                    locale='es'
                                    timeCaption="Hora"
                                    selected={ field.value }
                                    minDate={ startDate }
                                    onChange={ (event) => field.onChange(event) }
                                />
                            )}
                        />
                        { errors.end && <ErrorComponent error={ errors.end.message } /> }
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="location">Ubicación</label>
                    <input 
                        className={`w-full p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded transition`}
                        type="text"
                        name="location"
                        id="location"
                        placeholder="Ubicación del evento"
                        { ...register('location', {
                            required: {
                                value: true,
                                message: 'Este campo es obligatorio'
                            },
                            maxLength: {
                                value: 100,
                                message: 'Sólo se permiten 100 caracteres'
                            }
                        }) }
                    />
                    { errors.title && <ErrorComponent error={ errors.title.message } /> }
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <p>Requerimientos</p> 
                    <div className="flex gap-2">
                        <input 
                            type="checkbox"
                            name="fotografia"
                            id="fotografia"
                            value="fotografia"
                            {...register("requiriments", { validate: validateCheckboxes })}    
                        />
                        <label htmlFor="fotografia" className="mr-2 text-gray-900">Fotografía</label>
                    </div>
                    <div className="flex gap-2">
                        <input 
                            type="checkbox"
                            name="Video"
                            id="Video"
                            value="video"
                            {...register("requiriments", { validate: validateCheckboxes })}    
                        />
                        <label htmlFor="Video" className="mr-2 text-gray-700">Video</label>
                    </div>
                    <div className="flex gap-2">
                        <input 
                            type="checkbox"
                            name="Reel"
                            id="Reel"
                            value="reel"
                            {...register("requiriments", { validate: validateCheckboxes })}    
                        />
                        <label htmlFor="Reel" className="mr-2 text-gray-700">Reel</label>
                    </div>
                    <div className="flex gap-2">
                        <input 
                            type="checkbox"
                            name="Transmision"
                            id="Transmision"
                            value="transmision"
                            {...register("requiriments", { validate: validateCheckboxes })}    
                        />
                        <label htmlFor="Transmision" className="mr-2 text-gray-700">Transmisión en Vivo</label>
                    </div>
                    { errors.requiriments && <ErrorComponent error="Selecciona al menos una opción" /> }
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="description">Descripción de la Solicitud</label> 
                    <textarea
                        onBlur={ () => cleanError('description')}
                        className={`p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded transition resize-none`}
                        name="description"
                        id="description"
                        placeholder="Descripción de la solicitud"
                        rows={ 10 }
                        maxLength={ 1020 }
                        { ...register('description', {
                            required: {
                                value: true,
                                message: 'Este campo es obligatorio'
                            },
                            maxLength: {
                                value: 1020,
                                message: 'Sólo se permiten 1020 caracteres'
                            }
                        }) }
                    />
                    { errors.description && <ErrorComponent error={ errors.description.message } /> }
                </div>
                <div className="flex justify-end">
                    <button className="py-2 px-4 bg-sky-600 rounded hover:bg-sky-600/90 focus:bg-sky-700 transition text-white" disabled={ isCheckingData } >Enviar Solicitud</button>
                </div>
            </form>
        </div>
    )
}