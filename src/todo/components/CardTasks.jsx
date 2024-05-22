import { DocumentPlusIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const CardData = ({ top = 1 }) => {
    return (
        <div className='my-color border border-gray-700 py-5 px-8 w-96 rounded-sm'>
            <div className='p-5 bg-white/10 w-min rounded-full mb-5'>
                <DocumentPlusIcon className='h-8 w-8 text-white' />
            </div>
            <div className='flex justify-between items-end'>
                <span>
                    <h1 className='text-3xl font-black font-mono'>178</h1>
                    <p className='text-gray-400'>Tareas creadas</p>
                </span>
                <span className='flex items-center'>
                    <div className='p-2 h-2 w-2 rounded-full bg-purple-500 mr-2'></div>
                    <p className='text-gray-400'>Top { top }</p>
                </span>
            </div>
        </div>
    )
}
