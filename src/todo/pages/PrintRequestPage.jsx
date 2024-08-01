import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker"
import { es } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import { useCalendarStore, useUiStore } from "../../hooks";
import { fireModal, validateFile } from "../../helpers";
import { ErrorComponent } from "../components";

registerLocale('es', es);

const DocumentoComponent = ({ register, errors }) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor="printSize">Tamaño del Documento *</label>
            <select 
                name="printSize"
                id="printZize"
                className="w-full p-2 bg-white border focus:outline-none focus:ring-2 focus:ring-sky-700 rounded transition disabled:bg-gray-200 disabled:text-gray-500"
                {...register('printSize', {
                    validate: value => value !== "" || "Debe seleccionar una medida"
                })}
            >
                <option value="" className="text-gray-500">-SELECCIONA UNA MEDIDA-</option>
                <option value="a4" className="text-gray-500">A4 (8.27" x 11.69")</option>
                <option value="a5" className="text-gray-500">A5 (5.83" x 8.27")</option>
                <option value="carta" className="text-gray-500">Carta (8.5" x 11")</option>
                <option value="legal" className="text-gray-500">Legal (8.5" x 14")</option>
                <option value="oficio" className="text-gray-500">Oficio (8.5" x 13")</option>
            </select>
            {
                errors.printSize && <ErrorComponent error={ errors.xSize.message } />
            }
        </div>
    );
};

const FolletoComponent = ({ register, errors }) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor="printSize">Tamaño del Folleto *</label>
            <select 
                name="printSize" 
                id="printZize" 
                className="w-full p-2 bg-white border focus:outline-none focus:ring-2 focus:ring-sky-700 rounded transition disabled:bg-gray-200 disabled:text-gray-500"
                {...register('printSize', {
                    validate: value => value !== "" || "Debe seleccionar una medida"
                })}
            >
                <option value="a4" className="text-gray-500">A4 (8.27" x 11.69")</option>
                <option value="dl" className="text-gray-500">DL (3.9" x 8.2")</option>
                <option value="carta" className="text-gray-500">Carta (8.5" x 11")</option>
                <option value="legal" className="text-gray-500">Legal (8.5" x 14")</option>
            </select>
            {
                errors.printSize && <ErrorComponent error={ errors.xSize.message } />
            }
        </div>
    );
};

const LonaComponent = ({ register, errors }) => {
    
    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-full">
                <label htmlFor="xSize">Base *</label>
                <input 
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-700 transition disabled:bg-gray-200 disabled:text-gray-500"
                    type="number"
                    name="xSize"
                    id="xSize"
                    required
                    placeholder="Medida de la base"
                    { ...register('xSize') }
                />
            {
                errors.xSize && <ErrorComponent error={ errors.xSize.message } />
            }
            </div>
            <div className="flex flex-col gap-1 w-full">
                <label htmlFor="ySize">Altura *</label>
                <input 
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-700 transition disabled:bg-gray-200 disabled:text-gray-500"
                    type="number"
                    name="ySize"
                    id="ySize"
                    required
                    placeholder="Medida de la Altura"
                    { ...register('ySize', {
                        required: {
                            value: true,
                            message: 'Este campo es obligatorio'
                        },
                        type: {
                            value: 'number',
                            message: 'Sólo se permiten números'
                        }
                    }) }
                />
                {
                    errors.ySize && <ErrorComponent error={ errors.ySize.message } />
                }
            </div>
        </div>
    );
};

const InvitacionComponent = ({ register, errors }) => {
    
    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor="printSize">Tamaño de la Invitación *</label>
            <select 
                name="printSize" 
                id="printSize"
                className="w-full p-2 bg-white border focus:outline-none focus:ring-2 focus:ring-sky-700 rounded transition disabled:bg-gray-200 disabled:text-gray-500"
                {...register('printSize', {
                    validate: value => value !== "" || "Debe seleccionar una medida"
                })}
            >
                <option value="" className="text-gray-800">- Selecciona una medida -</option>
                <option value="a7" className="text-gray-500">A7 (5" x 7")</option>
                <option value="a6" className="text-gray-500">A6 (4.5" x 6.25")</option>
                <option value="a2" className="text-gray-500">A2 (4.25" x 5.5")</option>
                <option value="dl" className="text-gray-500">DL (3.9" x 8.2")</option>
                <option value="square" className="text-gray-500">Square (5.5" x 5.5")</option>
            </select>
            {
                errors.printSize && <ErrorComponent error={ errors.printSize.message } />
            }
        </div>
    );
};

export const PrintRequestPage = () => {
    const { startSavingDesign, message } = useCalendarStore();
    const { isCheckingForm } = useUiStore();

    const { control, register, setValue, handleSubmit, formState: { errors } } = useForm();

    const isCheckingData = useMemo(() => isCheckingForm === true, [ isCheckingForm ]);

    const [printType, setPrintType] = useState("invitacion");
    
    const onSubmit = handleSubmit((data) => {
        const { xSize, ySize, ...rest } = data;

        const printSize = xSize && ySize ? { xSize, ySize } : { size: rest.printSize };

        rest.printSize = printSize;

        startSavingDesign(rest);
    });
    
    useEffect(() => {
        if(message !== undefined) {
            fireModal({ title: 'Ha ocurrido un error', text: message, icon: 'error' })
        }
    }, [message]);

    const handleSelect = ({ target }) => {
        setValue('printType', target.value);
        setValue('printSize', '');
        setValue('xSize', '');
        setValue('ySize', '');
        
        setPrintType(target.value)
        console.log(printType)
    }

    return (
        <div className="bg-white w-full p-6 rounded shadow container mx-auto">
            <h1 className="text-xl font-medium">Solicitud de Diseño para Impresión</h1>
            <p className="text-gray-600 mb-6">Compártenos los detalles de la solicitud para impresión</p>
            <form className="flex flex-col gap-5" onSubmit={ onSubmit }>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="designType">Tipo de Diseño</label>
                        <select 
                            value="impresion"
                            className="w-full p-2 bg-white selected:text-gray-800 border focus:outline-none focus:ring-2 focus:ring-sky-700 rounded transition disabled:bg-gray-200 disabled:text-gray-500"
                            name="designType"
                            disabled
                        >
                            <option value="impresion" >Impresión</option>    
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="printType">Tipo de Impresión</label>
                        <select 
                            value={ printType }
                            className="w-full p-2 bg-white selected:text-gray-800 border focus:outline-none focus:ring-2 focus:ring-sky-700 rounded transition disabled:bg-gray-200 disabled:text-gray-500"
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
                            errors.printType && <ErrorComponent error={ errors.printType.message } />
                        }
                    </div>
                </div>
                {
                    printType === 'invitacion' ? <InvitacionComponent register={ register } errors={ errors } /> 
                                : printType === 'lona'       ? <LonaComponent register={ setValue } errors={ register } />
                                : printType === 'folleto'    ? <FolletoComponent register={ setValue } errors={ register } />
                                : printType === 'documento oficial' ? <DocumentoComponent register={ setValue } errors={ register } />
                                : printType === 'volante'    ? <FolletoComponent register={ setValue } errors={ register } /> : 'Ha ocurrido un error inesperado. Por favor, recarga la página y vuelve a intentarlo.'
                }
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="printDescription">Contenido de la Impresión</label>
                        <textarea
                            className={`p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-sky-700 rounded transition resize-none`}
                            name="printDescription"
                            { ...register('printDescription', { 
                                required: {
                                    value: true,
                                    message: 'Este campo es obligatorio'
                                },
                                maxLength: {
                                    value: 1020,
                                    message: 'Sólo se permiten 1020 caracteres'
                                }
                            })}
                            placeholder="Contenido de la impresión"
                            rows={ 5 }
                        />
                        { 
                            errors.printDescription && <ErrorComponent error={ errors.printDescription.message } />

                        }
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="description">Descripción de la Solicitud</label>
                        <textarea
                            className={`p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-sky-700 rounded transition resize-none`}
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
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="start">Fecha Estimada de Entrega</label> 
                        <Controller
                            control={ control }
                            name="deadline"
                            rules={{ 
                                required: {
                                    value: true,
                                    message: 'La fecha de entrega es obligatoria'
                                },
                                validate: (value) => value > new Date() || 'A caso tienes una máquina del tiempo?'
                            }}
                            render={({ field }) => (
                                <DatePicker
                                    className={`w-full p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-sky-700 rounded transition`}
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
                    <label htmlFor="description">Archivos Adjuntos <span className="text-gray-500 text-xs">(opcional)</span></label> 
                    <Controller
                        name="file"
                        control={ control }
                        rules={{
                            validate: (value) => validateFile(value) || true,
                        }}
                        render={({ field }) => (
                            <input
                                type="file"
                                className="p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-sky-700 rounded transition file:bg-sky-600 file:rounded file:text-gray-100 file:border-none file:p-1 text-gray-400 bg-white"
                                name="file"
                                onChange={ (event) => field.onChange(event.target.files) }
                            />
                        )}
                    />
                    { 
                        errors.file && <ErrorComponent error={ errors.file.message } />
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
                        <a href="#" className="font-medium underline text-sky-700">
                            ¿Cómo comprimir archivos?
                        </a>
                    </p>
                </div>
                <div className="flex justify-end">
                    <button className="py-2 px-4 bg-sky-600 rounded hover:bg-sky-600/90 focus:bg-sky-700 transition text-white" disabled={ isCheckingData } >Enviar Solicitud</button>
                </div>
            </form>
        </div>
    )
}