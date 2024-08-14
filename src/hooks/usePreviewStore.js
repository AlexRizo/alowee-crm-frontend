import { useDispatch } from "react-redux";
import { todoApi } from "../api";
import { setPreviewTask, toggleIsLoadingPreview } from "../store";
import { fireModal } from "../helpers";

export const usePreviewStore = () => {
    const dispatch = useDispatch();

    const loadPreviewTask = async(id = '', type = '') => {
        dispatch(toggleIsLoadingPreview(true)); 
        try {
            const { data } = await todoApi.get(`/events/${ id }?type=${ type }`);
            const { _id, __v, ...rest } = data.event;
            
            dispatch(setPreviewTask({id: _id, ...rest}));
            return true;
        } catch (error) {
            console.error(error);
            fireModal({
                title: 'Error',
                text: error.response.data.message || 'Error al cargar la tarea',
                icon: 'error'
            });
            return false;
        } finally {
            setTimeout(() => dispatch(toggleIsLoadingPreview(false)), 2000);
        }
    }

    return {
        loadPreviewTask
    }
};