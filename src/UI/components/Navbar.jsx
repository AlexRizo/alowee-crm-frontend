import { NavLink } from "react-router-dom"
import { CalendarIcon, HomeIcon, UserIcon, ArrowLeftEndOnRectangleIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline"

export const Navbar = () => {
    return (
        <nav className="w-60 min-w-60 h-screen p-4 my-color color-white">
            <h1 className="text-white text-2xl font-bold mb-5 p-2">Alowee CRM</h1>
            <div className="p-2 flex flex-col">
                <div className="p-2 text-gray-300 text-sm">
                    <span>Menú</span>
                </div>
                <NavLink to={'/'} className={ ({ isActive }) => `p-2 rounded-sm mb-2 flex ${ isActive ? 'bg-white/15' : '' }` }>
                    <HomeIcon className="h-5 w-5 text-white mr-2" />
                    <span>Inicio</span>
                </NavLink>
                <NavLink to={'/calendar'} className={ ({ isActive }) => `p-2 rounded-sm mb-2 flex ${ isActive ? 'bg-white/15' : '' }` }>
                    <CalendarIcon className="h-5 w-5 text-white mr-2" />
                    <span>Calendario</span>
                </NavLink>
                <NavLink to={'/requests'} className={ ({ isActive }) => `p-2 rounded-sm mb-2 flex ${ isActive ? 'bg-white/15' : '' }` }>
                    <ClipboardDocumentListIcon className="h-5 w-5 text-white mr-2" />
                    <span>Solicitudes</span>
                </NavLink>
                <div className="p-2 text-gray-300 text-sm">
                    <span>Otros</span>
                </div>
                <NavLink to={'/account'} className={ ({ isActive }) => `p-2 rounded-sm mb-2 flex ${ isActive ? 'bg-white/15' : '' }` }>
                    <UserIcon className="h-5 w-5 text-white mr-2" />
                    <span>Cuenta</span>
                </NavLink>
                <NavLink to={'/logout'} className={ ({ isActive }) => `p-2 rounded-sm mb-2 flex ${ isActive ? 'bg-white/15' : '' }` }>
                    <ArrowLeftEndOnRectangleIcon className="h-5 w-5 text-white mr-2" />
                    <span>Cerrar Sesión</span>
                </NavLink>
            </div>
        </nav>
    )
}
