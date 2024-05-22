import { DocumentTextIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const CardPending = ({ top = 1 }) => {
    return (
        <div className='my-color border border-gray-700 py-5 px-8 w-96 rounded-sm'>
            <div className='flex items-center mb-2'>
                <div className='p-5 bg-white/10 w-min rounded-full mr-5'>
                    <DocumentTextIcon className='h-8 w-8 text-white' />
                </div>
                <div>
                    <h1 className='text-xl'>Tareas Pendientes</h1>
                    <p className='text-gray-400'>Más recientes</p>
                </div>
            </div>
            <div className='flex flex-col'>
                <span className='flex items-center py-1 px-2 cursor-pointer hover:bg-white/10 transition text-gray-200'>
                    <InformationCircleIcon className='h-4 w-4 text-blue-400 mr-2' />
                    Tarea de prueba 1
                </span>
                <span className='flex items-center py-1 px-2 cursor-pointer hover:bg-white/10 transition text-gray-200'>
                    <InformationCircleIcon className='h-4 w-4 text-blue-400 mr-2' />
                    Tarea de prueba 2
                </span>
                <span className='flex items-center py-1 px-2 cursor-pointer hover:bg-white/10 transition text-gray-200'>
                    <InformationCircleIcon className='h-4 w-4 text-blue-400 mr-2' />
                    Tarea de prueba 3
                </span>
            </div>
        </div>
    )
}
