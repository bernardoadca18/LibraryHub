import React from 'react'
import useAuthStore from '../services/AuthStore.ts';
import styles from './Searchbar.module.css'

interface SearchBarProps {
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className: string;
}

const Searchbar = ({ type='search', placeholder='Search', value, onChange, className }: SearchBarProps) : React.ReactNode => {
    const { darkTheme } = useAuthStore();

    const colors = darkTheme
    ? {
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
        class: styles.light
    }
    : {
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
        class: styles.dark
    };

    return (
            <div className='relative block w-3/4'>
                <input value={value} onChange={onChange} className={`w-full px-4 py-2 rounded-lg border ${colors.border} ${className} focus:outline-none focus:ring-2 ${colors.focusRing} ${colors.text} placeholder:${colors.text}`} type={type} placeholder={placeholder}/>
                <i className={`bi bi-search absolute right-4 top-2.5 ${colors.border} ${colors.text}`}></i>
            </div>
    )
}

export default Searchbar