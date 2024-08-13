import { useSelector } from "react-redux";
import { usePreviewStore } from "../../hooks";
import { LoadingComponent, TaskPreview } from "../components"
import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";

export const TaskPage = () => {
    const { loadPreviewTask } = usePreviewStore();
    const { previewTask, isLoadingPreview } = useSelector(state => state.preview);
    const { id } = useParams();
    
    const isLoading = useMemo(() => isLoadingPreview === true, [isLoadingPreview]);

    useEffect(() => {
        loadPreviewTask(id);
    }, []);

    if (isLoading) {
        return (<LoadingComponent />);
    }
    
    return (
        <>
            <h1>Task Page</h1>
            
            <TaskPreview />
        </>
    )
}
