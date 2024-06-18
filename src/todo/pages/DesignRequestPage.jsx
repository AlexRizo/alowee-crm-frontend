import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker"
import { es } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import { useCalendarStore, useUiStore } from "../../hooks";
import { fireModal } from "../../helpers";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

registerLocale('es', es);

export const DesignRequestPage = () => {
    const { startSavingPost, message } = useCalendarStore();
    const { isCheckingForm } = useUiStore();

    const { control, register, setValue, handleSubmit, formState: { errors } } = useForm();

    const isCheckingData = useMemo(() => isCheckingForm === true, [isCheckingForm]);

    const [select, setSelect] = useState("")

    const validateFile = (file) => {
        if (!file) return true;
        
        const allowedTypes = ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'zip', 'rar', 'nef'];
        const type = file[0].name.split('.').pop().toLowerCase();
        const maxSize = 1024 * 1024 * 25; //? 25MB
        
        if (!allowedTypes.includes(type)) return 'Tipo de archivo no permitido. Sólo se permiten archivos de tipo: jpg, jpeg, png, pdf, doc, docx, xls, xlsx, ppt, pptx, txt, zip, rar';
        if (file[0].size > maxSize) return 'El archivo excede el tamaño permitido. Sólo se permiten archivos de hasta 25MB';
    };
    
    const onSubmit = handleSubmit((data) => {

        startSavingPost(data);
    });
    
    useEffect(() => {
        if(message !== undefined) {
            fireModal({ title: 'Ha ocurrido un error', text: message, icon: 'error' })
        }
    }, [message]);

    const onHandleSelect = ({ target }) => {
        setValue('designType', target.value)
        setSelect(target.value)
    }

    return (
        <>
            <h1 className="text-center text-3xl mb-5">Nueva Solicitud de Diseño</h1>
            <form className="flex flex-col gap-5 max-w-screen-lg m-auto" onSubmit={ onSubmit }>
                <div className="flex flex-col gap-1">
                    <label htmlFor="designType">Tipo de Solicitud *</label>
                    <select 
                        value={ select }
                        className="w-full p-2 bg-white placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded transition"
                        name="designType"
                        {...register('designType', {
                            required: {
                                value: true,
                                message: 'El tipo de diseño es obligatorio'
                            },
                        })}
                        onChange={ onHandleSelect }
                    >
                        <option value="" className="text-gray-300">-Selecciona una opción -</option>    
                        <option value="impresion" >Impresión</option>    
                        <option value="playeras" >Playeras</option>    
                        <option value="digital" >Digital</option>    
                        <option value="otro" >Otro (especificar)</option>    
                    </select>
                    {
                        errors.title && <span className="text-red-500 text-sm flex gap-1 mt-1">
                            <ExclamationCircleIcon className="h-5 w-5" />
                            { errors.title.message }.
                        </span> 
                    }
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="description">Archivos Adjuntos</label> 
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
                        <label htmlFor="start">Fecha Estimada de Entrega *</label> 
                        <Controller
                            control={ control }
                            name="postDate"
                            rules={{ 
                                required: {
                                    value: true,
                                    message: 'La fecha de entrega es obligatoria'
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