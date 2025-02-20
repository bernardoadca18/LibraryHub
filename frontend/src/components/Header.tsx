import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import "bootstrap-icons/font/bootstrap-icons.css"
import useAuthStore from '../services/AuthStore.ts'
import { getUsernameFromToken } from '../services/Auth.ts'
import { fetchUserByUsername } from '../services/UserService.ts'
const menus = ['HOME', 'BOOKS']
const links = ['/', '/catalogue']

const Header = () : React.ReactNode => {
    const { isAuthenticated, logout, darkTheme, toggleTheme } = useAuthStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    

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
        otherFontColor: 'text-black',
        iconText: 'text-black'
    });

    const setDarkThemeElements = () => {
        setColors({
            background: 'bg-black',
            shadow: 'shadow-sm',
            text: 'text-gray-100',
            hoverText: 'hover:text-white',
            border: 'border-gray-700',
            focusRing: 'focus:ring-gray-500',
            dropdownBackground: 'bg-black',
            dropdownHover: 'hover:bg-gray-700',
            dropdownBorder: 'border-gray-700',
            lightbulbIconColor: 'text-white',
            otherFontColor: 'text-gray-300',
            iconText: 'text-white'
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
            otherFontColor: 'text-black',
            iconText: 'text-black'
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
        navigate('/login');
    }

    useEffect(() => {

        const checkAdminStatus = async () => {

            if (isAuthenticated) {
                try {
                    const username = getUsernameFromToken();
                    const user = await fetchUserByUsername(username);
                    setIsAdmin(user.role === 'ADMIN');
                } catch (error) {
                    console.error('Error checking admin status:', error);
                    setIsAdmin(false);
                }
            }
        };
        
        checkAdminStatus();

    }, [isAuthenticated]);

    return (
        <header className={`${colors.background} ${colors.shadow} fixed w-full top-0 border-b ${colors.border} z-[1000]`}>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16'>
                    <div className='flex items-center'>
                        <Link className={`${colors.iconText} text-xl font-semibold flex items-center gap-2 whitespace-nowrap`} to={links[0]}>
                            LibraryHub<i className={`bi bi-book flex-shrink-0 ${colors.iconText}`}></i>
                        </Link>
                        <div className='hidden md:flex items-center space-x-8 ml-10'>
                            <Link className={`${colors.text} ${colors.hoverText}`} to={links[0]}>{menus[0]}</Link>
                            {isAuthenticated && (
                                <>
                                    <Link className={`${colors.text} ${colors.hoverText}`} to={links[1]}>{menus[1]}</Link>
                                    <Link className={`${colors.text} ${colors.hoverText}`} to={links[2]}>{menus[2]}</Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='flex items-center space-x-4 mr-8'>
                        {isAuthenticated ? (
                            <div className="dropdown" ref={dropdownRef} style={{position: 'relative'}}>
                                <button className={`${colors.text} btn btn-link dropdown-toggle cursor-pointer p-2`} type="button" onClick={toggleDropdown}>
                                    {getUsernameFromToken()}
                                </button>
                                {isDropdownOpen && (
                                    <div className={`dropdown-menu show ${colors.dropdownBackground} p-2`} style={{zIndex:1001, display: 'flex', flexDirection: 'column', position: 'absolute', left: 0, justifyContent: 'flex-start'}}>
                                        <Link to={'/profile'}><button className={`dropdown-item cursor-pointer p-2 ${colors.dropdownBorder} ${colors.dropdownHover} ${colors.text}`}>My Account</button></Link>
                                        {
                                        isAdmin ? (
                                            <Link to={"/admin/dashboard"}><button className={`dropdown-item cursor-pointer p-2 ${colors.dropdownBorder} ${colors.dropdownHover} ${colors.text}`}>Dashboard</button></Link>
                                        ) : (<></>)
                                        }
                                        <button className={`dropdown-item cursor-pointer p-2 ${colors.dropdownBorder} ${colors.dropdownHover} ${colors.text}`} onClick={handleLogout}>Logout</button>
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
                            <div>
                                {
                                    darkTheme ? (
                                        <button onClick={changeTheme} className='w-2'>
                                            <i className={`bi bi-brightness-high-fill cursor-pointer p-4 text-3xl ${colors.lightbulbIconColor}`}></i>
                                        </button>
                                    ) : (
                                        <button onClick={changeTheme} className='w-2'>
                                            <i className={`bi bi-moon-fill cursor-pointer p-4 text-2xl ${colors.lightbulbIconColor}`}></i>
                                        </button>
                                    )
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header