import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../../UI/components'

export const TodoLayout = () => {
    return (
        <div className='flex flex-row'>
            <Navbar />
            <div className="p-10 md:p-5 w-full max-h-screen">
                <Outlet />
            </div>
        </div>
    )
}
