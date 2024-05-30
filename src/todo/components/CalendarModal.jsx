import Modal from 'react-modal';
import { useUiStore } from '../../hooks';

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

export const CalendarEventModal = () => {
    const { isModalOpen, closeModal } = useUiStore();
    
    return (
        <Modal
            isOpen={ isModalOpen }
            onRequestClose={ closeModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            <div className="">
                <h1>{ formValues.title }</h1>
            </div>
            <div>
                <p>{ formValues.note }</p>
                <p>Inicia: { formValues.start } | Finaliza: { formValues.end }</p>
            </div>
            <div>
                <p>Autor: { formValues.user.name }</p>
            </div>  
        </Modal>
    )
}