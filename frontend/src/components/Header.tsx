import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import "bootstrap-icons/font/bootstrap-icons.css"
import useAuthStore from '../services/AuthStore.ts'
import { getUsernameFromToken } from '../services/Auth.ts'
const menus = ['HOME', 'CATEGORIES', 'BOOKS']
const links = ['/']

const Header = () : React.ReactNode => {
    const { isAuthenticated, logout, darkTheme, toggleTheme } = useAuthStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Estado para as cores
    const [colors, setColors] = useState({
        background: 'bg-white',
        shadow: 'shadow-sm',
        text: 'text-slate-700',
        hoverText: 'hover:text-slate-900',
        border: 'border-slate-300',
        focusRing: 'focus:ring-slate-400',
        dropdownBackground: 'bg-white',
        dropdownHover: 'hover:bg-slate-100',
        dropdownBorder: 'border-slate-200',
        lightbulbIconColor: 'text-black',
        otherFontColor: 'text-black'
    });

    const setDarkThemeElements = () => {
        setColors({
            background: 'bg-gray-900',
            shadow: 'shadow-sm',
            text: 'text-gray-100',
            hoverText: 'hover:text-white',
            border: 'border-gray-700',
            focusRing: 'focus:ring-gray-500',
            dropdownBackground: 'bg-gray-800',
            dropdownHover: 'hover:bg-gray-700',
            dropdownBorder: 'border-gray-700',
            lightbulbIconColor: 'text-white',
            otherFontColor: 'text-gray-300'
        });

    };

    const setLightThemeElements = () => {
        setColors({
            background: 'bg-white',
            shadow: 'shadow-sm',
            text: 'text-slate-700',
            hoverText: 'hover:text-slate-900',
            border: 'border-slate-300',
            focusRing: 'focus:ring-slate-400',
            dropdownBackground: 'bg-white',
            dropdownHover: 'hover:bg-slate-100',
            dropdownBorder: 'border-slate-200',
            lightbulbIconColor: 'text-black',
            otherFontColor: 'text-black'
        });
    }

    useEffect(() => {
        if (darkTheme)
        {
            setLightThemeElements();
        }
        else
        {
            setDarkThemeElements();
        }
    }, [darkTheme])

    const changeTheme = () => {
        toggleTheme();
    }

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

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
    }

    return (
        <header className={`${colors.background} ${colors.shadow} fixed w-full top-0`}>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16'>
                    <div className='flex items-center'>
                        <Link className={`${colors.text} text-xl font-semibold flex items-center gap-2 whitespace-nowrap`} to={links[0]}>
                            LibraryHub<i className="bi bi-book flex-shrink-0 ${colors.text}"></i>
                        </Link>
                        <div className='hidden md:flex items-center space-x-8 ml-10'>
                            <Link className={`${colors.text} ${colors.hoverText}`} to={links[0]}>{menus[0]}</Link>
                            {isAuthenticated && (
                                <>
                                    <Link className={`${colors.text} ${colors.hoverText}`} to={''}>{menus[1]}</Link>
                                    <Link className={`${colors.text} ${colors.hoverText}`} to={''}>{menus[2]}</Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <div className='relative'>
                            <input className={`w-64 ml-4 px-4 py-2 rounded-lg border ${colors.border} focus:outline-none focus:ring-2 ${colors.focusRing} ${colors.text} placeholder:${colors.text}`} type="search" placeholder='Search'/>
                            <i className='bi bi-search absolute right-3 top-2.5 text-slate-400'></i>
                        </div>
                        {isAuthenticated ? (
                            <div className="dropdown" ref={dropdownRef} style={{position: 'relative'}}>
                                <button className={`${colors.text} btn btn-link dropdown-toggle cursor-pointer p-2`} type="button" onClick={toggleDropdown}>
                                    {getUsernameFromToken()}
                                </button>
                                {isDropdownOpen && (
                                    <div className={`dropdown-menu show ${colors.dropdownBackground} p-2`} style={{width: '100%', display: 'flex', flexDirection: 'column', position: 'absolute', left: 0, justifyContent: 'flex-start'}}>
                                        <button className={`dropdown-item cursor-pointer py-2 ${colors.dropdownBorder} ${colors.dropdownHover} ${colors.text}`}>Configurações</button>
                                        <button className={`dropdown-item cursor-pointer py-2 ${colors.dropdownBorder} ${colors.dropdownHover} ${colors.text}`} onClick={handleLogout}>Logout</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className={`${colors.text} ${colors.hoverText}`}>Login</Link>
                                <Link to="/register" className={`${colors.text} ${colors.hoverText}`}>Register</Link>
                            </>
                        )}
                        {
                            darkTheme ? (
                                <button onClick={changeTheme}>
                                    <i className={`bi bi-brightness-high-fill cursor-pointer p-4 text-2xl ${colors.lightbulbIconColor}`}></i>
                                </button>
                            ) : (
                                <button onClick={changeTheme}>
                                    <i className={`bi bi-moon-fill cursor-pointer p-4 text-2xl ${colors.lightbulbIconColor}`}></i>
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header