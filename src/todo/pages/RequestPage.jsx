import { DevicePhoneMobileIcon, NewspaperIcon, PaintBrushIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { SelectRequest } from '../components'

export const RequestPage = () => {
    return (
        <div className="flex flex-row flex-wrap gap-4">
            <SelectRequest
                url="/requests/new-event"
                color="indigo"
                title="Evento"
                shortDesc="Solucitud para eventos"
                subTitle="Cobertura de eventos"
                longDesc="Cubrir un evento con fotografía y/o video"
            >
                <NewspaperIcon className="h-10 text-gray-100" />
            </SelectRequest>

            <SelectRequest
                url="/requests/new-post"
                color="violet"
                title="Publicación"
                shortDesc="Solictud para publicación"
                subTitle="Publicación en redes"
                longDesc="Publicación en redes sociales con diseño y contenido personalizado"
            >
                <DevicePhoneMobileIcon className="h-10 text-gray-100" />
            </SelectRequest>

            <SelectRequest
                url="/requests/new-design"
                color="pink"
                title="Diseño"
                shortDesc="Solictud para diseño"
                subTitle="Diseños personalizados"
                longDesc="Diseño de contenido para redes, impresiones, playeras, etc..."
            >
                <PaintBrushIcon className="h-10 text-gray-100" />
            </SelectRequest>
        </div>
    )
}
