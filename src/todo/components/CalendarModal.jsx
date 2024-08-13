import Modal from 'react-modal';
import { useUiStore } from "../../hooks";
import { useSelector } from 'react-redux';
import { EventModal } from './EventModal';
import { RequestModal } from './RequestModal';
import { NavLink } from 'react-router-dom';

export const CalendarModal = () => {
    const { isModalOpen, closeModal } = useUiStore();
    const { activeEvent } = useSelector(state => state.calendar);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',   
        },
    };
    
    Modal.setAppElement('#root');

    return (
        <Modal
            isOpen={ isModalOpen }
            onRequestClose={ closeModal }
            style={ customStyles }
            className="bg-white w-96 py-5 px-7 outline-none rounded"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            {
                activeEvent?.type === 'evento' ? <EventModal data={ activeEvent } />
                : <RequestModal data={ activeEvent } />
            }
            <div className='flex gap-2 justify-end'>
                <NavLink 
                    to={`/task/${ activeEvent?.id }/preview?type=${ activeEvent?.type }`} 
                    className='border border-gray-300 rounded outline-none p-2 hover:bg-gray-100 transition'
                >
                    Ir al evento
                </NavLink>
                <button className='rounded outline-none p-2 bg-black text-white hover:bg-black/80 transition' onClick={closeModal}>Cerrar</button>
            </div>
        </Modal>
    )
}