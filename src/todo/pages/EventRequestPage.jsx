import DatePicker, { registerLocale } from "react-datepicker"
import { es } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { addHours } from "date-fns";

registerLocale('es', es);

export const EventRequestPage = () => {
    const [formValues, setFormValues] = useState({
        title: '',
        // user: '',
        // email: '',
        requirements: [],
        start: new Date(),
        end: addHours(new Date(), 2),
        description: ''
    })

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
                requirements: [
                    ...formValues.requirements,
                    target.value
                ]
            });
        } else {
            setFormValues({
                ...formValues,
                requirements: formValues.requirements.filter(req => req !== target.value)
            });
        }
    }

    const onDateChange = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log({formValues});
    }
    
    return (
        <>
            <h1 className="text-center text-3xl mb-5">Nueva Solicitud de Evento</h1>
            <form className="flex flex-col gap-5 max-w-screen-xl m-auto" onSubmit={ onSubmit }>
                <div className="flex flex-col gap-1">
                    <label htmlFor="title">Evento</label>
                    <input 
                        className="p-2 bg-blue-400/10 rounded border border-gray-400/10 focus:outline-none focus:ring focus:ring-blue-600 transition"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Nombre del evento"
                        onChange={ onInputChange }
                        value={ formValues.title }
                    />
                </div>
                {/* <div className="flex gap-4">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="user">Nombre del Solicitante</label>
                        <input 
                            className="p-2 bg-blue-400/10 rounded border border-gray-400/10 focus:outline-none focus:ring focus:ring-blue-600 transition"
                            type="text"
                            name="user"
                            id="user"
                            placeholder="Nombre completo del solicitante"
                            onChange={ onInputChange }
                            value={ formValues.user }
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="email">Correo del Solicitante</label>
                        <input 
                            className="p-2 bg-blue-400/10 rounded border border-gray-400/10 focus:outline-none focus:ring focus:ring-blue-600 transition"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Correo electrónico del solicitante"
                            onChange={ onInputChange }
                            value={ formValues.email }
                        />
                    </div>
                </div> */}
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="start">Fecha de Inicio</label>
                        <DatePicker
                            className="w-full p-2 bg-blue-400/10 rounded border border-gray-400/10 focus:outline-none focus:ring focus:ring-blue-600 transition"
                            placeholderText="Fecha de inicio del evento"
                            dateFormat='Pp'
                            showTimeSelect
                            locale='es'
                            timeCaption="Hora"
                            selected={ formValues.start }
                            onChange={ (event) => onDateChange(event, 'start') }
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="end">Fecha de Finalización</label>
                        <DatePicker
                            className="w-full p-2 bg-blue-400/10 rounded border border-gray-400/10 focus:outline-none focus:ring focus:ring-blue-600 transition"
                            placeholderText="Fecha de finalización del evento"
                            dateFormat='Pp'
                            showTimeSelect
                            locale='es'
                            timeCaption="Hora"
                            selected={ formValues.end }
                            minDate={ formValues.start }
                            onChange={ (event) => onDateChange(event, 'end') }
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    Requerimientos
                    <div className="flex gap-2">
                        <input type="checkbox" name="fotografia" id="fotografia" value="fotografia" onChange={ onCheckboxChange } />
                        <label htmlFor="fotografia" className="mr-2 text-gray-300">Fotografía</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="Video" id="Video" value="video" onChange={ onCheckboxChange } />
                        <label htmlFor="Video" className="mr-2 text-gray-300">Video</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="Reel" id="Reel" value="reel" onChange={ onCheckboxChange } />
                        <label htmlFor="Reel" className="mr-2 text-gray-300">Fotografía</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="Transmicion" id="Transmicion" value="transmicion" onChange={ onCheckboxChange } />
                        <label htmlFor="Transmicion" className="mr-2 text-gray-300">Transmisión en Vivo</label>
                    </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="description">Descripción de la Solicitud</label>
                        <textarea
                            className="p-2 bg-blue-400/10 rounded border border-gray-400/10 focus:outline-none focus:ring focus:ring-blue-600 transition resize-none"
                            name="description"
                            id="description"
                            placeholder="Descripción de la solicitud"
                            rows={ 10 }
                            maxLength={ 1020 }
                            onChange={ onInputChange }
                            value={ formValues.description }
                        />
                    </div>
                    <button className="p-4 bg-blue-700 rounded hover:bg-blue-600 focus:bg-blue-800 transition">Enviar Solicitud</button>
            </form>
        </>
    )
}
