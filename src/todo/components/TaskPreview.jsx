import { Comments } from "./Comments"
import { TaskDescription } from "./TaskDescription"

export const TaskPreview = ({ task }) => {

    return (
        <>
            <TaskDescription {...task } />
            <Comments />
        </>
    )
}
