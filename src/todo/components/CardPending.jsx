import { DocumentTextIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const CardPending = ({ events = [] }) => {
    return (
        <div className='bg-gray-600 w-96 rounded-sm shadow'>
            <div className='flex flex-row shadow'>
                <div className='p-5 bg-white/10 w-min flex items-center'>
                    <DocumentTextIcon className='h-8 w-8 text-white' />
                </div>
                <div className='flex flex-col py-4 px-5 w-full'>
                    <p className='text-2xl text-white'>Tareas recientes</p>
                    <p className='text-gray-200'>Tus últimas Tareas pendientes</p>
                </div>
            </div>
            <div className='bg-black/10'>
                {
                    events.map(event => (
                        <span key={event.id} className='flex items-center py-2 px-2 cursor-pointer hover:bg-black/20 transition text-white'>
                            <InformationCircleIcon className='h-4 w-4 mr-2' />
                            { event.title }
                        </span>
                    ))
                }
            </div>
        </div>
    )
}
