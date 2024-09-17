import { useSelector } from "react-redux";
import { usePreviewStore } from "../../hooks";
import { LoadingComponent, TaskPreview } from "../components"
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";

export const TaskPage = () => {
    const { loadPreviewTask } = usePreviewStore();
    const { state } = useLocation();
    const { previewTask, isLoadingPreview } = useSelector(state => state.preview);
    const { id } = useParams();

    const isLoading = useMemo(() => isLoadingPreview === true, [isLoadingPreview]);
    
    useEffect(() => {
        if (previewTask && previewTask?.id === id) return;
        loadPreviewTask(id, state?.type);
    }, []);

    if (isLoading) {        
        return (<LoadingComponent />);
    }

    return (
        <div className="animate__animated animate__fadeIn">
            <h1>Task Page</h1>
            
            {
                previewTask?.id && (<TaskPreview task={ previewTask }/>)
            }
        </div>
    )
}
