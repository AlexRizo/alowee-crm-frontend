import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker"
import { es } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import { useCalendarStore, useUiStore } from "../../hooks";
import { fireModal } from "../../helpers";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

registerLocale('es', es);

export const PostRequestPage = () => {
    const { startSavingPost, message } = useCalendarStore();
    const { isCheckingForm } = useUiStore();

    const [socialNetworkError, setSocialNetworkError] = useState('');

    const { control, register, handleSubmit, formState: { errors } } = useForm();

    const isCheckingData = useMemo(() => isCheckingForm === true, [isCheckingForm]);

    const validateCheckbox = (array = []) => {
        const selectedNetworks = array.filter(network => network);
    
        if (selectedNetworks.length === 0) {
          setSocialNetworkError('Selecciona al menos una red social');
          return false;
        }
    
        setSocialNetworkError('');
        return true;
    };

    
    const validateFile = (file) => {
        if (!file) return true;
        
        const allowedTypes = ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'zip', 'rar', 'nef'];
        const type = file[0].name.split('.').pop().toLowerCase();
        const maxSize = 1024 * 1024 * 25; //? 25MB
        
        if (!allowedTypes.includes(type)) return 'Tipo de archivo no permitido. Sólo se permiten archivos de tipo: jpg, jpeg, png, pdf, doc, docx, xls, xlsx, ppt, pptx, txt, zip, rar';
        if (file[0].size > maxSize) return 'El archivo excede el tamaño permitido. Sólo se permiten archivos de hasta 25MB';
    };
    
    const onSubmit = handleSubmit((data) => {
        const { facebook, instagram, otro, ...newData } = data;
        if (!validateCheckbox([facebook, instagram, otro])) return;
        newData.socialNetworks = [facebook, instagram, otro].filter(network => network);
        startSavingPost(newData);
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
                        errors.title && <span className="text-red-500 text-sm flex gap-1 mt-1">
                            <ExclamationCircleIcon className="h-5 w-5" />
                            { errors.title.message }.
                        </span> 
                    }
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="postDescription">Contenido de la Publicación *</label> 
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
                        errors.postDescription && <span className="text-red-500 text-sm flex gap-1 mt-1">
                            <ExclamationCircleIcon className="h-5 w-5" />
                            { errors.postDescription.message }.
                        </span> 
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
                        errors.file && <span className="text-red-500 text-sm flex gap-1 mt-1">
                            <ExclamationCircleIcon className="h-5 w-5" />
                            { errors.file.message }.
                        </span> 
                    }
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="start">Fecha de publicación *</label> 
                        <Controller
                            control={ control }
                            name="postDate"
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
                                    name="postDate"
                                    timeCaption="Hora"
                                    minDate={ new Date() }
                                    onChange={ (event) => field.onChange(event) }
                                    selected={ field.value }
                                />
                            )}
                        />
                        {
                            errors.postDate && <span className="text-red-500 text-sm flex gap-1 mt-1">
                                <ExclamationCircleIcon className="h-5 w-5" />
                                { errors.postDate.message }.
                            </span>
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <p>Redes Sociales *</p> 
                    <div className="flex gap-2">
                        <input onClick={ () => setSocialNetworkError('') } type="checkbox" name="Facebook" id="Facebook" value="facebook" {...register('facebook') } />
                        <label htmlFor="Facebook" className="mr-2 text-gray-700">Facebook</label>
                    </div> 
                    <div className="flex gap-2">
                        <input onClick={ () => setSocialNetworkError('') } type="checkbox" name="Instagram" id="Instagram" value="instagram" {...register('instagram')} />
                        <label htmlFor="Instagram" className="mr-2 text-gray-700">Instagram</label>
                    </div>
                    <div className="flex gap-2">
                        <input onClick={ () => setSocialNetworkError('') } type="checkbox" name="Otro" id="Otro" value="otro" {...register('otro')} />
                        <label htmlFor="Otro" className="mr-2 text-gray-700">Otro</label>
                    </div>
                    {
                        socialNetworkError && <span className="text-red-500 text-sm flex gap-1 mt-1">
                            <ExclamationCircleIcon className="h-5 w-5" />
                            { socialNetworkError }.
                        </span>
                    }
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="description">Descripción de la Solicitud *</label>
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
                        errors.description && <span className="text-red-500 text-sm flex gap-1 mt-1">
                            <ExclamationCircleIcon className="h-5 w-5" />
                            { errors.description.message }.
                        </span> 
                    }
                </div>
                <button className="p-4 bg-indigo-800/90 rounded hover:bg-indigo-600 focus:bg-indigo-700 transition text-white" disabled={ isCheckingData } >Enviar Solicitud</button>
            </form>
        </>
    )
}