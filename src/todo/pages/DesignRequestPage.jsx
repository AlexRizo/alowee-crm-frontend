import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker"
import { es } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import { useCalendarStore, useUiStore } from "../../hooks";
import { fireModal } from "../../helpers";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

registerLocale('es', es);

const LonaComponent = ({ setValue }) => {
    const [loneSize, setLoneSize] = useState({ x: 0, y: 0 });

    const onChange = ({ target }) => {
        const { name, value } = target;
        setLoneSize({...loneSize, [name]: value })
        setValue('loneSize', loneSize)
        console.log(loneSize);
    }
    
    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-full">
                <label htmlFor="loneSize">Base *</label>
                <input onChange={ onChange } type="number" name="x" id="x" required placeholder="Medida de la base"/>
            </div>
            <div className="flex flex-col gap-1 w-full">
                <label htmlFor="loneSize">Altura *</label>
                <input onChange={ onChange } type="number" name="y" id="y" required placeholder="Medida de la Altura"/>
            </div>
        </div>
    );
};

const InvitacionComponent = ({ setValue }) => {
    const [printSize, setPrintSize] = useState('a7');

    const handleSelect = ({ target }) => {
        setPrintSize(target.value)
        setValue('printSize', printSize)
    }
    
    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor="printSize">Tamaño de la Invitación *</label>
            <select value={ printSize } onChange={ handleSelect } name="printSize" id="printZize" className="w-full p-2 bg-white border focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded transition disabled:bg-gray-200 disabled:text-gray-500">
                <option value="a7" className="text-gray-500">A7 (5" x 7")</option>
                <option value="a6" className="text-gray-500">A6 (4.5" x 6.25")</option>
                <option value="a2" className="text-gray-500">A2 (4.25" x 5.5")</option>
                <option value="dl" className="text-gray-500">DL (3.9" x 8.2")</option>
                <option value="square" className="text-gray-500">Square (5.5" x 5.5")</option>
            </select>
        </div>
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
        
        if (!allowedTypes.includes(type)) return 'Tipo de archivo no permitido. Sólo se permiten archivos de tipo: ' + allowedTypes.join(', ');
        if (file[0].size > maxSize) return 'El archivo excede el tamaño permitido. Sólo se permiten archivos de hasta 25MB';
    };
    
    const onSubmit = handleSubmit((data) => {
        console.log(data);
        // startSavingPost(data);
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
        <div className="bg-white w-full p-6 rounded shadow">
            <h1 className="text-xl font-medium">Solicitud de Diseño para Impresión</h1>
            <p className="text-gray-600 mb-6">Compártenos los detalles de la solicitud para impresión</p>
            <form className="flex flex-col gap-5" onSubmit={ onSubmit }>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1 w-full">
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
                    <div className="flex flex-col gap-1 w-full">
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
                </div>
                {
                    printType === 'invitacion' ? <InvitacionComponent setValue={ setValue } /> 
                                : 'lona' ? <LonaComponent setValue={ setValue } /> : null 
                }
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="printContent">Contenido de la Impresión *</label>
                        <textarea
                            className={`p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded transition resize-none`}
                            name="printContent"
                            { ...register('printContent', { 
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
                            errors.printContent && <span className="text-red-500 text-sm flex gap-1 mt-1">
                                <ExclamationCircleIcon className="h-5 w-5" />
                                { errors.printContent.message }
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
                                { errors.description.message }
                            </span> 
                        }
                    </div>
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
                                { errors.postDate.message }
                            </span>
                        }
                    </div>
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
                    <p className="text-gray-500">
                        
                        Nota: Por motivos de practicidad únicamente se 
                        permite la subida de un solo archivo. Si necesitas 
                        subir más de uno, puedes hacerlo comprimiendo los 
                        archivos en <code>.zip</code> o <code>.rar</code>.
                        <br />
                        Si no tienes idea de cómo hacerlo, aquí tienes un 
                        tutorial de cómo hacerlo:
                        &nbsp; 
                        <a href="#" className="font-medium underline text-purple-700">
                            ¿Cómo comprimir archivos?
                        </a>
                    </p>
                </div>
                <button className="p-2 bg-violet-800/90 rounded hover:bg-violet-600 focus:bg-violet-700 transition text-white" disabled={ isCheckingData } >Enviar Solicitud</button>
            </form>
        </div>
    )
}