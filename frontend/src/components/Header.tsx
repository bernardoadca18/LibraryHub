import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import "bootstrap-icons/font/bootstrap-icons.css"
import useAuthStore from '../services/AuthStore.ts'
import { getUsernameFromToken } from '../services/Auth.ts'

const menus = ['HOME', 'CATEGORIES', 'BOOKS']
const links = ['/']

const Header = () : React.ReactNode => {
    const { isAuthenticated } = useAuthStore();
    const CheckAuth = () => {
        
        console.log(isAuthenticated)
    }

    return (
        <header className='bg-white shadow-sm fixed w-full top-0'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16'>
                    <div className='flex items-center'>
                        <Link className='text-slate-700 text-xl font-semibold flex items-center gap-2 whitespace-nowrap' to={links[0]}>LibraryHub<i className="bi bi-book flex-shrink-0 text-slate-700"></i></Link>
                        <div className='hidden md:flex items-center space-x-8 ml-10'>
                            <Link className='text-slate-600 hover:text-slate-900' to={links[0]} >{menus[0]}</Link>
                            <Link className='text-slate-600 hover:text-slate-900' to={''} >{menus[1]}</Link>
                            <Link className='text-slate-600 hover:text-slate-900' to={''} >{menus[2]}</Link>
                            <button onClick={CheckAuth} className='bg-amber-900 p-2 cursor-pointer'>TESTAR AUTH</button>
                        </div>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <div className='relative'>
                            <input className='w-64 ml-4 px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400' type="search" placeholder='Search'/>
                            <i className='bi bi-search absolute right-3 top-2.5 text-slate-400'></i>
                        </div>
                        {
                            useAuthStore(state => state.isAuthenticated) ? (
                                <div className="dropdown">
                                    
                                    <button className="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {getUsernameFromToken()}
                                    </button>
                                    
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="text-slate-600 hover:text-slate-900">Login</Link>
                                    <Link to="/register" className="text-slate-600 hover:text-slate-900">Register</Link>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header