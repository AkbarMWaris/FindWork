import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

function AppLayout() {
    return (
        <>
        <div className="grid-background"></div>
        <main className='min-h-screen container'>
        <Header />
        <Outlet />
        </main>
        <div className="p-10 text-center bg-gray-800 mt-6">Made with 💌 from AM Waris</div>
        </>
    )
}

export default AppLayout
