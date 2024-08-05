import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker"
import { es } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import { useCalendarStore, useUiStore } from "../../hooks";
import { fireModal, validateCheckboxes, validateFile } from "../../helpers";
import { ErrorComponent, InformationComponent } from "../components";

registerLocale('es', es);

export const PostRequestPage = () => {
    const { startSavingPost, message } = useCalendarStore();
    const { isCheckingForm } = useUiStore();

    const { control, register, handleSubmit, formState: { errors }, watch } = useForm();
    
    const socialNetworks = watch('socialNetworks');

    const isCheckingData = useMemo(() => isCheckingForm === true, [isCheckingForm]);

    const onSubmit = handleSubmit((data) => {
        console.log({data});
        startSavingPost(data);
    });
    
    useEffect(() => {
        if(message !== undefined) {
            fireModal({ title: 'Ha ocurrido un error', text: message, icon: 'error' })
        }
    }, [message]);

    return (
        <div className="bg-white w-full p-6 rounded shadow container mx-auto">
            <h1 className="text-xl font-medium">Solicitud de Publicación</h1>
            <p className="text-gray-600 mb-6">Compártenos los detalles de la plublicación</p>
            <form className="flex flex-col gap-5" onSubmit={ onSubmit }>
                <div className="flex flex-col gap-1">
                    <label htmlFor="title">Título de la Publicación</label>
                    <input 
                        className={`w-full p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded transition`}
                        type="text"
                        name="title"
                        {...register('title', {
                            required: {
                                value: true,
                                message: 'El título es obligatorio'
                            },
                            maxLength: {
                                value: 100,
                                message: 'El título no puede exceder los 100 caracteres'
                            },
                            minLength: {
                                value: 5,
                                message: 'El título debe tener al menos 5 caracteres'
                            }
                        })}
                        placeholder="Títlo de la publicación"
                    />
                    { 
                        errors.title && <ErrorComponent error={ errors.title.message } />

                    }
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="postDescription">Contenido de la Publicación</label> 
                    <textarea
                        className={`p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded transition resize-none`}
                        name="postDescription"
                        { ...register('postDescription', {
                            required: {
                                value: true,
                                message: 'La descripción de la publicación es obligatoria'
                            },
                            maxLength: {
                                value: 1020,
                                message: 'Sólo se permiten 1020 caracteres'
                            },
                        })}
                        placeholder="Contenido de la publicación"
                        rows={ 5 }
                    />
                    { 
                        errors.postDescription && <ErrorComponent error={ errors.postDescription.message } />
                    }
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="description">Instrucciones Adjuntas</label> 
                    <Controller
                        name="file"
                        control={ control }
                        rules={{
                            validate: (value) => validateFile(value) || true,
                        }}
                        render={({ field }) => (
                            <input
                                type="file"
                                className="p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded transition file:bg-indigo-600 file:rounded file:text-gray-100 file:border-none file:p-1 text-gray-400 bg-white"
                                name="file"
                                onChange={ (event) => field.onChange(event.target.files) }
                            />
                        )}
                    />
                    { 
                        errors.file && <ErrorComponent error={ errors.file.message } />
                    }
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="start">Fecha de publicación *</label> 
                        <Controller
                            control={ control }
                            name="deadline"
                            rules={{ 
                                required: {
                                    value: true,
                                    message: 'La fecha de publicación es obligatoria'
                                },
                                validate: (value) => value > new Date() || 'A caso tienes una máquina del tiempo?'
                            }}
                            render={({ field }) => (
                                <DatePicker
                                    className={`w-full p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded transition`}
                                    placeholderText="Fecha en la que se publicará"
                                    dateFormat='Pp'
                                    showTimeSelect
                                    locale='es'
                                    name="deadline"
                                    timeCaption="Hora"
                                    minDate={ new Date() }
                                    onChange={ (event) => field.onChange(event) }
                                    selected={ field.value }
                                />
                            )}
                        />
                        {
                            errors.deadline && <ErrorComponent error={ errors.deadline.message } />
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <p>Redes Sociales</p> 
                    <div className="flex gap-2">
                        <input type="checkbox" name="Facebook" id="Facebook" value="facebook" {...register('socialNetworks', { validate: validateCheckboxes }) } />
                        <label htmlFor="Facebook" className="mr-2 text-gray-700">Facebook</label>
                    </div> 
                    <div className="flex gap-2">
                        <input type="checkbox" name="Instagram" id="Instagram" value="instagram" {...register('socialNetworks', { validate: validateCheckboxes })} />
                        <label htmlFor="Instagram" className="mr-2 text-gray-700">Instagram</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="Otro" id="Otro" value="otro" {...register('socialNetworks', { validate: validateCheckboxes })} />
                        <label htmlFor="Otro" className="mr-2 text-gray-700">Otro</label>
                    </div>
                    {
                        socialNetworks?.includes('otro') && <InformationComponent info="Por favor, especifica la red social en el siguiente campo" />
                    }
                    {
                        errors.socialNetworks && <ErrorComponent error="selecciona al menos una opción" />
                    }
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="description">Descripción de la Solicitud</label>
                    <textarea
                        className={`p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded transition resize-none`}
                        name="description"
                        { ...register('description', { 
                            required: {
                                value: true,
                                message: 'Este campo es obligatorio'
                            },
                            maxLength: {
                                value: 1020,
                                message: 'Sólo se permiten 1020 caracteres'
                            }
                        })}
                        placeholder="Descripción de la solicitud"
                        rows={ 5 }
                    />
                    {
                        errors.description && <ErrorComponent error={ errors.description.message } />
                    }
                </div>
                <div className="flex justify-end">
                    <button className="py-2 px-4 bg-sky-600 rounded-sm hover:bg-sky-600/90 focus:bg-sky-700 transition text-white" disabled={ isCheckingData } >Enviar Solicitud</button>
                </div>
            </form>
        </div>
    )
}