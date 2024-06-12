import { DevicePhoneMobileIcon, NewspaperIcon, PaintBrushIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { NavLink } from 'react-router-dom'

export const RequestPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <NavLink to={'/requests/new-event'} className='bg-gradient-to-r from-gray-700 to-gray-500 rounded cursor-pointer hover:from-violet-700 hover:to-violet-400'>
                <div className="p-5 w-full flex gap-2 items-center">
                    <div className='rounded-full p-5 bg-gray-500/50 w-min'>
                        <NewspaperIcon className='h-8 w-8 text-white' />
                    </div>
                    <div>
                        <p className='text-xl mb-1 text-gray-100'>Solicitud de Evento</p>
                        <p className='text-gray-300'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus quas qui voluptas saepe. Laborum cupiditate est sed incidunt aliquam delectus quibusdam quo dolores exercitationem culpa. Ducimus est placeat quaerat mollitia.</p>
                    </div>
                </div>
            </NavLink>
            <NavLink to={'/'} className='bg-gradient-to-r from-gray-700 to-gray-500 rounded cursor-pointer hover:from-blue-700 hover:to-blue-400'>
                <div className="p-5 w-full flex gap-2 items-center">
                    <div className='rounded-full p-5 bg-gray-500/50 w-min'>
                        <PaintBrushIcon className='h-8 w-8 text-white' />
                    </div>
                    <div>
                        <p className='text-xl mb-1 text-gray-100'>Solicitud de Diseño</p>
                        <p className='text-gray-300'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus quas qui voluptas saepe. Laborum cupiditate est sed incidunt aliquam delectus quibusdam quo dolores exercitationem culpa. Ducimus est placeat quaerat mollitia.</p>
                    </div>
                </div>
            </NavLink>
            <NavLink to={'/requests/new-post'} className='bg-gradient-to-r from-gray-700 to-gray-500 rounded cursor-pointer hover:from-orange-700 hover:to-orange-400'>
                <div className="p-5 w-full flex gap-2 items-center">
                    <div className='rounded-full p-5 bg-gray-500/50 w-min'>
                        <DevicePhoneMobileIcon className='h-8 w-8 text-white' />
                    </div>
                    <div>
                        <p className='text-xl mb-1 text-gray-100'>Publicación para Redes</p>
                        <p className='text-gray-300'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus quas qui voluptas saepe. Laborum cupiditate est sed incidunt aliquam delectus quibusdam quo dolores exercitationem culpa. Ducimus est placeat quaerat mollitia.</p>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}
