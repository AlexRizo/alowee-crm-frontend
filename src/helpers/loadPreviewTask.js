import { todoApi } from "../api";

export const loadPreviewTask = async(id) => {
    try {
        const { data } = await todoApi.get(`/events/${ id }`);
        console.log(data.event);
        return data.event; 
    } catch (error) {
        console.error(error);
        return false;
    }
}