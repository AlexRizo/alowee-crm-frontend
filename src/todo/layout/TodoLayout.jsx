import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../../UI/components'

export const TodoLayout = () => {
    return (
        <div className='flex flex-row'>
            <Navbar />
            <Outlet />
        </div>
    )
}
