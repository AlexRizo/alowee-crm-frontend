import { useParams } from "react-router-dom"
import { TaskDescription } from "./TaskDescription"
import { useSelector } from "react-redux";
import { useState } from "react";
import { loadPreviewTask } from "../../helpers";
import { useEffect } from "react";
import { useMemo } from "react";

export const TaskPreview = () => {
    const [task, setTask] = useState(null);

    const { id } = useParams();
    const { activeEvent } = useSelector(state => state.calendar);

    useEffect(() => {
        // Si no hay un activeEvent o el id no coincide, cargamos la tarea usando la función `loadPreviewTask`
        if (!activeEvent || id !== activeEvent.id) {
            loadPreviewTask(id).then(fetchedTask => {
                setTask(fetchedTask);
            }).catch(error => {
                console.error('Error al cargar la tarea:', error);
                setTask(null);  // O manejar el error de alguna manera
            });
        } else {
            setTask(activeEvent);
        }
    }, [id, activeEvent]);

    useMemo(() => {
        
    }, [task]);

    return (
        <>
            <h1>Previsualización de la Tarea</h1>
            <div>
                <h2>Detalles de la Tarea</h2>
                <TaskDescription value={ task?.title } />
            </div>
        </>
    )
}
