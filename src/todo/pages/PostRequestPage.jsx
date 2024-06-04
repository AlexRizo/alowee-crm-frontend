import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker"
import { es } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import { useEventStore, useUiStore } from "../../hooks";
import { fireModal } from "../../helpers";
import { addHours } from "date-fns";

registerLocale('es', es);

export const PostRequestPage = () => {
    const { startSavingEvent, message } = useEventStore();
    const { isCheckingForm } = useUiStore();

    const { control, register, handleSubmit, formState: { errors } } = useForm();

    const isCheckingData = useMemo(() => isCheckingForm === true, [isCheckingForm]);

    const onSubmit = handleSubmit((data) => {

        console.log(data);
        // startSavingEvent(data);
    });

    useEffect(() => {
        if(message !== undefined) {
            fireModal({ title: 'Ha ocurrido un error', text: message, icon: 'error' })
        }
    }, [message]);
    
    return (
        <>
            <h1 className="text-center text-3xl mb-5">Nueva Solicitud de Publicación</h1>
            <form className="flex flex-col gap-5 max-w-screen-lg m-auto" onSubmit={ onSubmit }>
                <div className="flex flex-col gap-1">
                    <label htmlFor="title">Título de la Publicación *</label>
                    <input 
                        className={`w-full p-2 bg-violet-400/10 rounded border border-gray-400/10 focus:outline-none focus:ring focus:ring-violet-600 transition`}
                        type="text"
                        name="title"
                        {...register('title', { required: true })}
                        placeholder="Nombre del evento"
                    />
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="post_description">Contenido de la Publicación *</label> 
                    <textarea
                        className={`p-2 bg-violet-400/10 rounded border border-gray-400/10 transition focus:outline-none focus:ring focus:ring-violet-600 resize-none`}
                        name="post_description"
                        {...register('post_description', { required: true })}
                        placeholder="Descripción de la solicitud"
                        rows={ 5 }
                    />
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="description">Instrucciones Adjuntas</label> 
                    <input
                        type="file"
                        className="p-2 bg-violet-400/10 rounded border border-gray-400/10 transition focus:outline-none focus:ring focus:ring-violet-600 resize-none file:bg-violet-600 file:rounded file:text-gray-100 file:border-none file:p-1 text-gray-400"
                        name="files"
                        {...register('files')}
                    />
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="start">Fecha de publicación *</label> 
                        <Controller
                            control={ control }
                            name="start"
                            rules={{ 
                                required: true,
                                validate: (value) => value > new Date() || 'La fecha de publicación no es válida'
                            }}
                            render={({ field }) => (
                                <DatePicker
                                    className={`w-full p-2 bg-violet-400/10 rounded border border-gray-400/10 focus:outline-none focus:ring focus:ring-violet-600 transition`}
                                    placeholderText="Fecha en la que se publicará"
                                    dateFormat='Pp'
                                    showTimeSelect
                                    locale='es'
                                    name="start"
                                    timeCaption="Hora"
                                    minDate={ new Date() }
                                    onChange={ (event) => field.onChange(event) }
                                    selected={ field.value }
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <p>Requerimientos *</p> 
                    <div className="flex gap-2">
                        <input type="checkbox" name="Facebook" value="facebook" {...register('requiriments')} />
                        <label htmlFor="Facebook" className="mr-2 text-gray-300">Facebook</label>
                    </div> {...register('requiriments')}
                    <div className="flex gap-2">
                        <input type="checkbox" name="Instagram" value="instagram" {...register('requiriments')} />
                        <label htmlFor="Instagram" className="mr-2 text-gray-300">Instagram</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="Otro" value="otro" {...register('requiriments')} />
                        <label htmlFor="Otro" className="mr-2 text-gray-300">Otro</label>
                    </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="description">Descripción de la Solicitud *</label>
                    <textarea
                        className={`p-2 bg-violet-400/10 rounded border border-gray-400/10 transition focus:outline-none focus:ring focus:ring-violet-600 resize-none`}
                        name="description"
                        
                        placeholder="Descripción de la solicitud"
                    />
                </div>
                <button className="p-4 bg-violet-700 rounded hover:bg-violet-600 focus:bg-violet-800 transition" disabled={ isCheckingData } >Enviar Solicitud</button>
            </form>
        </>
    )
}