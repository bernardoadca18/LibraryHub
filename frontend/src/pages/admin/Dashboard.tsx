import React, { useEffect, useState } from 'react'
import { getUsernameFromToken } from '../../services/Auth.ts'
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '../../services/AuthStore.ts';
import styles from './Dashboard.module.css'

const Dashboard = () => {
    const { isAuthenticated, logout, darkTheme, toggleTheme } = useAuthStore();
    
    const [colors, setColors] = useState({
        button: styles.buttonLight,
        lightbulbIconColor: 'text-black',
        buttonActive : styles.buttonActiveLight,
        background_1: styles.lightBackground1,
        background_2: styles.lightBackground2,
        background_3: styles.lightBackground3,
    })


    const setDarkThemeElements = () => {
        setColors({
            button: styles.buttonDark,
            lightbulbIconColor: 'text-white',
            buttonActive : styles.buttonActive,
            background_1: styles.darkBackground1,
            background_2: styles.darkBackground2,
            background_3: styles.darkBackground3,
        });

    };

    const setLightThemeElements = () => {
        setColors({
            button: styles.buttonLight,
            lightbulbIconColor: 'text-black',
            buttonActive : styles.buttonActiveLight,
            background_1: styles.lightBackground1,
            background_2: styles.lightBackground2,
            background_3: styles.lightBackground3,
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

  return (
    <div className={`min-h-screen w-full`}>
        {/* Barra Lateral */}
        <div className={`w-80 fixed inset-y-0 left-0 shadow-xl`}>
            <nav className={`${colors.background_2} h-full`}>
                <div className={`flex gap-2 p-4 shadow-sm mb-8 ${colors.background_1} h-16`}>
                    <h1 className={`font-semibold text-2xl`}>LibraryHub</h1>
                    <i className={`bi bi-book flex-shrink-0 text-2xl ${''}`}></i>
                    {
                            <div className={`ml-16`}>
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

                <div className={`relative flex flex-col items-center gap-8 `}>
                    <NavLink to={'/admin/dashboard/author'} className={({ isActive }) => `font-semibold text-2xl p-4 w-9/10 text-center rounded-lg ${colors.button} ${isActive ? colors.buttonActive : ''}`}>
                        Authors
                    </NavLink>

                    <NavLink to={'/admin/dashboard/book'} className={({ isActive }) => `font-semibold text-2xl p-4 w-9/10 text-center rounded-lg ${colors.button} ${isActive ? colors.buttonActive : ''}`}>
                        Books
                    </NavLink>
                </div>
            </nav>
        </div>

        <main className={`${colors.background_3} flex-grow min-h-screen ml-80 flex`}>
            <Outlet/>
        </main>
    </div>
  )
}

export default Dashboard