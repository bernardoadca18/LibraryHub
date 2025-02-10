import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import "bootstrap-icons/font/bootstrap-icons.css"
import useAuthStore from '../services/AuthStore.ts'
import { getUsernameFromToken } from '../services/Auth.ts'

const menus = ['HOME', 'CATEGORIES', 'BOOKS']
const links = ['/']

const Header = () : React.ReactNode => {
    const { isAuthenticated, logout } = useAuthStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleClickOutsideDropdown = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node))
        {
            setIsDropdownOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideDropdown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropdown);
        };
    }, []);

    const CheckAuth = () => {
        
        console.log(isAuthenticated)
    }

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
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
                            isAuthenticated ? (
                                <div className="dropdown" ref={dropdownRef} style={{position: 'relative'}} >
                                    <button className="btn btn-link dropdown-toggle cursor-pointer p-2" type="button" onClick={toggleDropdown}>
                                        {getUsernameFromToken()}
                                    </button>
                                    {
                                        isDropdownOpen && (
                                            <div className='dropdown-menu show bg-white p-2' style={{width: '100%', display: 'flex', flexDirection: 'column', position: 'absolute', left: 0, justifyContent: 'flex-start'}}>
                                                <button className='dropdown-item cursor-pointer py-2 border-b border-slate-200 hover:bg-slate-100'>Perfil</button>
                                                <button className='dropdown-item cursor-pointer py-2 border-b border-slate-200 hover:bg-slate-100'>Configurações</button>
                                                <button className='dropdown-item cursor-pointer py-2 border-b border-slate-200 hover:bg-slate-100' onClick={handleLogout}>Logout</button>
                                            </div>
                                        )
                                    }
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