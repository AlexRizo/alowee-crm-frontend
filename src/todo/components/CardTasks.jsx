import { DocumentPlusIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const CardData = ({ top = 1 }) => {
    return (
        <div className='bg-gray-600 w-96 rounded-sm shadow flex flex-row'>
            <div className='p-5 bg-white/10 w-min flex items-center rounded-'>
                <DocumentPlusIcon className='h-8 w-8 text-white' />
            </div>
            <div className='flex flex-col py-4 px-5 w-full'>
                <p className='text-2xl text-white'>178</p>
                <div className='flex items-center justify-between'>
                    <p className='text-gray-200'>Tareas creadas</p>
                    <span className='flex items-center'>
                        <div className='p-2 h-2 w-2 rounded-full bg-yellow-400 mr-2'></div>
                        <p className='text-gray-100'>Top { top }</p>
                    </span>
                </div>
            </div>
        </div>
    )
}