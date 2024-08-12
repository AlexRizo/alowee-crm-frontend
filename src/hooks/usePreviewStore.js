import { useDispatch } from "react-redux";
import { todoApi } from "../api";

export const usePreviewStore = () => {
    const dispatch = useDispatch();

    const loadPreviewTask = async(id) => {
        try {
            const { data } = await todoApi.get(`/events/${ id }`);
            console.log(data.event);
            return data.event; 
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    return {
        loadPreviewTask
    }
};