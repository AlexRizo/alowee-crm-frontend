import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useUiStore } from "../../hooks";
import { ComputerDesktopIcon, CubeIcon, ExclamationCircleIcon, PrinterIcon, TagIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';

export const DesignModal = () => {
    const { isModalOpen, closeModal } = useUiStore();
    const [option, setOption] = useState(0);
    const [error, setError] = useState(false);

    
    
    const navigate = useNavigate();

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            
        },
    };

    const handleOption = (opt) => {
        setOption(opt);
    }

    const handleContinue = (opt) => {
        if (option === 0) return setError(true);
        closeModal();
        navigate(`/requests/new-design/${ option }`);
    }

    useEffect(() => {
        setOption(0);
        setError(false);
    }, [isModalOpen])

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
            <h1 className='font-medium text-lg'>Selecciona un Tipo de Diseño</h1>
            <p className='text-gray-500 text-sm'>Elige el tipo de diseño que requieres</p>
            <div className='grid grid-cols-2 gap-3 my-5'>
                <button
                    onClick={ () => handleOption('print') } 
                    className={`flex gap-1 border rounded p-2 justify-center hover:bg-black/5 transition focus:bg-black/8 ${ option === 'print' && 'bg-black/10' }`}>
                    <PrinterIcon className='h-6' />
                    <span>Impreso</span>
                </button>
                <button
                    onClick={ () => handleOption('digital') } 
                    className={`flex gap-1 border rounded p-2 justify-center hover:bg-black/5 transition focus:bg-black/8 ${ option === 'digital' && 'bg-black/10' }`}>
                    <ComputerDesktopIcon className='h-6' />
                    <span>Digital</span>
                </button>
                <button
                    onClick={ () => handleOption('t-shirts') } 
                    className={`flex gap-1 border rounded p-2 justify-center hover:bg-black/5 transition focus:bg-black/8 ${ option === 't-shirts' && 'bg-black/10' }`}>
                    <TagIcon className='h-6' />
                    <span>Playeras</span>
                </button>
                <button
                    onClick={ () => handleOption('others') } 
                    className={`flex gap-1 border rounded p-2 justify-center hover:bg-black/5 transition focus:bg-black/8 ${ option === 'others' && 'bg-black/10' }`}>
                    <CubeIcon className='h-6' />
                    <span>Otros</span>
                </button>
                
            </div>
            <p className={`text-red-500 text-sm flex gap-1 mb-5 transition ${ !error && 'hidden' }`}>
                <ExclamationCircleIcon className='h-5' />
                <span>Selecciona una opción para poder continuar.</span>
            </p>
            <div className='flex gap-2 justify-end'>
                <button onClick={ handleContinue } className='border border-gray-300 rounded outline-none p-2 hover:bg-gray-100 transition'>Continuar</button>
                <button onClick={ closeModal } className='rounded outline-none p-2 bg-black text-white hover:bg-black/80 transition'>Cancelar</button>
            </div>
        </Modal>
    )
}