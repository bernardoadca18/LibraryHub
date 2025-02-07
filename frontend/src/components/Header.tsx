import React from 'react'

import 'bootstrap/dist/js/bootstrap.bundle.min'
import "bootstrap-icons/font/bootstrap-icons.css"

const menus = ['HOME', 'CATEGORIES', 'BOOKS']

const Header = () : React.ReactNode => {
    return (
        <header className='bg-white shadow-sm fixed w-full top-0'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16'>
                    <div className='flex items-center'>
                        <a className='text-slate-700 text-xl font-semibold' href="#">LibraryHub<i className="bi bi-book ml-2 text-slate-700"></i></a>
                        <div className='hidden md:flex items-center space-x-8 ml-10'>
                            <a className='text-slate-600 hover:text-slate-900' href="#">{menus[0]}</a>
                            <a className='text-slate-600 hover:text-slate-900' href="#">{menus[1]}</a>
                            <a className='text-slate-600 hover:text-slate-900' href="#">{menus[2]}</a>
                        </div>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <div className='relative'>
                            <input className='w-64 px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400' type="search" placeholder='Search'/>
                            <i className='bi bi-search absolute right-3 top-2.5 text-slate-400'></i>
                        </div>
                        <a href="#" className="text-slate-600 hover:text-slate-900">Login</a>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header