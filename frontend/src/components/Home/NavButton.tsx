import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavButton.module.css'

interface NavButtonProps {
    text: string,
    to: string,
    icon: React.ReactNode,
    darkTheme: boolean
}

const NavButton = ({text, to, icon, darkTheme} : NavButtonProps) : React.ReactNode => {
  const colors = darkTheme
    ? {
        backgroundColor: "bg-slate-100",
        textColor: "text-black"
    }
    : {
        backgroundColor: "bg-black",
        textColor: "text-white"
    };

  return (
    <Link to={to}>
        <div className={`w-64 ${styles.navButton} ${colors.backgroundColor} ${colors.textColor} rounded-lg shadow-sm hover:shadow-md transition-shadow border-2 flex flex-col border-slate-100 p-4 justify-center text-center items-center min-h-32`}>
            {icon}
            <h3 className='font-bold text-2xl'>{text}</h3>
        </div>
    </Link>
  )
}

export default NavButton