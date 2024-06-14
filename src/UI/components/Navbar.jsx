import { NavLink } from "react-router-dom"
import { CalendarIcon, HomeIcon, UserIcon, ArrowLeftEndOnRectangleIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline"
import { useAuthStore } from "../../hooks";

export const Navbar = () => {
    const { startLogout } = useAuthStore();
    
    const onLogout = () => {
        startLogout();
    };
    
    return (
        <>
        <div className="w-60 min-w-60 h-screen"></div>
        <nav className="w-60 min-w-60 h-screen fixed p-4 bg-indigo-800/80 color-white">
            <h1 className="text-white text-2xl font-bold mb-5 p-2">Alowee CRM</h1>
            <div className="p-2 flex flex-col">
                <div className="p-2 text-gray-100 text-sm">
                    <span>Menú</span>
                </div>
                <NavLink to={'/'} className={ ({ isActive }) => `p-2 rounded-sm mb-2 flex text-white ${ isActive ? 'bg-black/20' : '' }` }>
                    <HomeIcon className="h-5 w-5 mr-2" />
                    <span>Inicio</span>
                </NavLink>
                <NavLink to={'/calendar'} className={ ({ isActive }) => `p-2 rounded-sm mb-2 flex text-white ${ isActive ? 'bg-black/20' : '' }` }>
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    <span>Calendario</span>
                </NavLink>
                <NavLink to={'/requests'} className={ ({ isActive }) => `p-2 rounded-sm mb-2 flex text-white ${ isActive ? 'bg-black/20' : '' }` }>
                    <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
                    <span>Solicitudes</span>
                </NavLink>
                <hr />
                <div className="p-2 text-gray-100 text-sm">
                    <span>Otros</span>
                </div>
                <NavLink to={'/account'} className={ ({ isActive }) => `p-2 rounded-sm mb-2 flex text-white ${ isActive ? 'bg-black/20' : '' }` }>
                    <UserIcon className="h-5 w-5 mr-2" />
                    <span>Cuenta</span>
                </NavLink>
                <div className="p-2 rounded-sm mb-2 flex cursor-pointer text-white" onClick={ onLogout }>
                    <ArrowLeftEndOnRectangleIcon className="h-5 w-5 text-white mr-2" />
                    <span>Cerrar Sesión</span>
                </div>
            </div>
        </nav>
        </>

    )
}
