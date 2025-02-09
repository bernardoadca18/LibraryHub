import React from 'react'
import styles from './AuthButton.module.css'

interface AuthButtonProps {
    text : string
    onClick : () => void;
} 

const AuthButton = ({ text, onClick } : AuthButtonProps) : React.ReactNode => {
  return (
    <button onClick={onClick} className={`${styles.buttonAuth} bg-black text-white self-center text-xl rounded-xl w-96 h-12 mt-8`}>{text}</button>
  )
}

export default AuthButton