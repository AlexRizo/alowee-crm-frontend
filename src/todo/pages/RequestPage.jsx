import { DevicePhoneMobileIcon, NewspaperIcon, PaintBrushIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { NavLink } from 'react-router-dom'

export const RequestPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <NavLink to={'/requests/new-event'} className='bg-gray-500/10 rounded cursor-pointer hover:bg-violet-800 transition'>
                <div className="p-5 w-full flex gap-2 items-center">
                    <div className='rounded-full p-5 bg-violet-400/20 w-min'>
                        <NewspaperIcon className='h-8 w-8 text-white' />
                    </div>
                    <div>
                        <p className='text-xl font-bold mb-1'>Solicitud de Evento</p>
                        <p className='text-gray-300'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus quas qui voluptas saepe. Laborum cupiditate est sed incidunt aliquam delectus quibusdam quo dolores exercitationem culpa. Ducimus est placeat quaerat mollitia.</p>
                    </div>
                </div>
            </NavLink>
            <div className='bg-gray-500/10 rounded cursor-pointer hover:bg-blue-600 transition'>
                <div className="p-5 w-full flex gap-2 items-center">
                    <div className='rounded-full p-5 bg-violet-400/20 w-min'>
                        <PaintBrushIcon className='h-8 w-8 text-white' />
                    </div>
                    <div>
                        <p className='text-xl font-bold mb-1'>Solicitud de Diseño</p>
                        <p className='text-gray-300'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus quas qui voluptas saepe. Laborum cupiditate est sed incidunt aliquam delectus quibusdam quo dolores exercitationem culpa. Ducimus est placeat quaerat mollitia.</p>
                    </div>
                </div>
            </div>
            <div className='bg-gray-500/10 rounded cursor-pointer hover:bg-orange-700 transition'>
                <div className="p-5 w-full flex gap-2 items-center">
                    <div className='rounded-full p-5 bg-violet-400/20 w-min'>
                        <DevicePhoneMobileIcon className='h-8 w-8 text-white' />
                    </div>
                    <div>
                        <p className='text-xl font-bold mb-1'>Publicación para Redes</p>
                        <p className='text-gray-300'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus quas qui voluptas saepe. Laborum cupiditate est sed incidunt aliquam delectus quibusdam quo dolores exercitationem culpa. Ducimus est placeat quaerat mollitia.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
