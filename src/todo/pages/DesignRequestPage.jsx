import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker"
import { es } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import { useCalendarStore, useUiStore } from "../../hooks";
import { fireModal } from "../../helpers";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

registerLocale('es', es);

const InvitacionComponent = () => {
    return (
        <>
            
        </>
    );
};

export const DesignRequestPage = () => {
    const { startSavingPost, message } = useCalendarStore();
    const { isCheckingForm } = useUiStore();

    const { control, register, setValue, handleSubmit, formState: { errors } } = useForm();

    const isCheckingData = useMemo(() => isCheckingForm === true, [isCheckingForm]);

    const [printType, setPrintType] = useState("invitacion");

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

    const handleSelect = ({ target }) => {
        setValue('printType', target.value)
        setPrintType(target.value)
    }

    return (
        <div className="bg-white w-min p-6 rounded shadow mx-auto">
            <h1 className="text-center text-2xl font-medium mb-5">Solicitud de Diseño para Impresión</h1>
            <form className="flex flex-col gap-5 max-w-screen-lg m-auto" onSubmit={ onSubmit }>
                <div className="flex flex-col gap-1">
                    <label htmlFor="designType">Tipo de Diseño *</label>
                    <select 
                        className="w-full p-2 bg-white selected:text-gray-800 border focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded transition disabled:bg-gray-200 disabled:text-gray-500"
                        name="designType"
                        disabled
                        {...register('designType') }
                    >
                        <option value="impresion" >Impresión</option>    
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="printType">Tipo de Impresión *</label>
                    <select 
                        value={ printType }
                        className="w-full p-2 bg-white selected:text-gray-800 border focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded transition disabled:bg-gray-200 disabled:text-gray-500"
                        name="printType"
                        {...register('printType') }
                        onChange={ handleSelect }
                    >
                        <option value="invitacion" className="text-gray-500" >Invitación</option>    
                        <option value="lona" className="text-gray-500" >Lona</option>    
                        <option value="folleto" className="text-gray-500" >Folleto</option>  
                        <option value="documento oficial" className="text-gray-500" >Documento Oficial</option>  
                        <option value="volante" className="text-gray-500" >Volante</option>  
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
                                className="p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded transition file:bg-violet-600 file:rounded file:text-gray-100 file:border-none file:p-1 text-gray-400 bg-white"
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
                <button className="p-2 bg-violet-800/90 rounded hover:bg-violet-600 focus:bg-violet-700 transition text-white" disabled={ isCheckingData } >Enviar Solicitud</button>
            </form>
        </div>
    )
}