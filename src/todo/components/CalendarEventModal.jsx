import Modal from 'react-modal';

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

export const CalendarEventModal = ({ title, notes, start, end, bgColor, user }) => {
    return (
        <Modal
            isOpen={ isDateModalOpen }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            <div className="">
                <h1>{ title }</h1>
            </div>
            <div>
                <p>{ notes }</p>
                <p>Inicia: { start } | Finaliza: { end }</p>
            </div>
            <div>
                <p>Autor: { user.name }</p>
            </div>  
        </Modal>
    )
}