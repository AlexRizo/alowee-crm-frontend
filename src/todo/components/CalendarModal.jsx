import Modal from 'react-modal';
import { useUiStore } from "../../hooks";

export const CalendarModal = () => {
    const { isModalOpen, closeModal } = useUiStore();
    const { activeEvent } = useSelector(state => state.calendar);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    
    Modal.setAppElement('#root');
    return (
        <Modal
            isOpen={ isModalOpen }
            onRequestClose={ closeModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            {}
        </Modal>
    )
}
