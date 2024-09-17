import { TaskDescription } from "./TaskDescription"

export const TaskPreview = ({ task }) => {

    return (
        <>
            <h1>Previsualización de la Tarea</h1>
            <div>
                <h2>Detalles de la Tarea</h2>
                <TaskDescription {...task } />
            </div>
        </>
    )
}
