import { useDispatch, useSelector } from "react-redux";
import { onCheckingForm, onCloseModal, onOpenModal } from "../store";

export const useUiStore = () => {
    const dispatch = useDispatch();

    const { isModalOpen } = useSelector(state => state.ui);

    const { isCheckingForm } = useSelector(state => state.ui);

    const openModal = () => {
        dispatch(onOpenModal());
    };

    const closeModal = () => {
        dispatch(onCloseModal());
    };

    const checkingForm = () => {
        dispatch(onCheckingForm());
    };

    return {
        // * Propiedades
        isModalOpen,
        isCheckingForm,
        
        // * Métodos
        openModal,
        closeModal,
        checkingForm,
    }
};