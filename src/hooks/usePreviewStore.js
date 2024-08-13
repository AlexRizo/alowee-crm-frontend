import { useDispatch } from "react-redux";
import { todoApi } from "../api";
import { setPreviewTask, toggleIsLoadingPreview } from "../store";
import { fireModal } from "../helpers";

export const usePreviewStore = () => {
    const dispatch = useDispatch();

    const loadPreviewTask = async(id = '', type = '') => {
        dispatch(toggleIsLoadingPreview());
        try {
            const { data } = await todoApi.get(`/events/${ id }?type=${ type }`);
            dispatch(setPreviewTask(data.event));
            setTimeout(() => {
                dispatch(toggleIsLoadingPreview());
            }, 2000);
            return true;
        } catch (error) {
            console.error(error);
            setTimeout(() => {
                dispatch(toggleIsLoadingPreview());
            }, 2000);
            fireModal({
                title: 'Error',
                text: error.response.data.message || 'Error al cargar la tarea',
                icon: 'error'
            });
            return ;
        }
    }

    return {
        loadPreviewTask
    }
};