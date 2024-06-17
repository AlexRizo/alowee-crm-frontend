import { DevicePhoneMobileIcon, NewspaperIcon, PaintBrushIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { SelectRequest } from '../components'

export const RequestPage = () => {
    return (
        <div className="flex flex-row gap-4">
            <SelectRequest 
                title="Evento"
                subTitle="Si necesitas que se cubra un evento..."
                shortDesc="Solucitud para un evento"
                longDesc="Si necesitas que se cubra un evento ()"
            >
                <NewspaperIcon className="h-10 text-gray-100" />
            </SelectRequest>
        </div>
    )
}
