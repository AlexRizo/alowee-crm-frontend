import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker"
import { es } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import { useCalendarStore, useUiStore } from "../../hooks";
import { fireModal, validateFile } from "../../helpers";
import { ErrorComponent } from "../components";

registerLocale('es', es);

export const OtherRequestPage = () => {
    const { startSavingOther, message } = useCalendarStore();
    const { isCheckingForm } = useUiStore();

    const { control, register, handleSubmit, formState: { errors } } = useForm();
    
    const isCheckingData = useMemo(() => isCheckingForm === true, [ isCheckingForm ]);
    
    const onSubmit = handleSubmit((data) => {
        startSavingOther(data);
    });
    
    useEffect(() => {
        if(message !== undefined) {
            fireModal({ title: 'Ha ocurrido un error', text: message, icon: 'error' })
        }
    }, [message]);

    return (
        <div className="bg-white w-full p-6 rounded shadow container mx-auto">
            <h1 className="text-xl font-medium">Solicitud de diseño personalizado</h1>
            <p className="text-gray-600 mb-6">Compártenos los detalles de la solicitud</p>
            <form className="flex flex-col gap-5" onSubmit={ onSubmit }>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="designType">Tipo de Diseño</label>
                        <select 
                            value="otro"
                            className="w-full p-2 bg-white selected:text-gray-800 border focus:outline-none focus:ring-2 focus:ring-sky-700 rounded transition disabled:bg-gray-200 disabled:text-gray-500"
                            name="designType"
                            disabled
                        >
                            <option value="otro" >Otro</option>    
                        </select>
                    </div>
                </div>
                <div className="flex gap-4">
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
                        <label htmlFor="start">Fecha de Entrega</label> 
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
                                    placeholderText="Fecha estimada de entrega"
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
                    <button className="py-2 px-4 bg-sky-600 rounded-sm hover:bg-sky-600/90 focus:bg-sky-700 transition text-white" disabled={ isCheckingData } >Enviar Solicitud</button>
                </div>
            </form>
        </div>
    )
}