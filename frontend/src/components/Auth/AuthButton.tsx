import React from 'react'
import styles from './AuthButton.module.css'

interface AuthButtonProps {
    text : string
    onClick : () => void;
    darkTheme: boolean;
} 

const AuthButton = ({ text, onClick, darkTheme } : AuthButtonProps) : React.ReactNode => {
  const colors = darkTheme
  ? {//light
      class: styles.buttonAuthLight,
      textColor: 'text-white'
  }
  : {//dark
      class: styles.buttonAuthDark,
      textColor: 'text-black'
  };

  
  return (
    <button onClick={onClick} className={`${styles.buttonAuth} ${colors.class} ${colors.textColor} self-center text-xl rounded-xl w-96 h-12 mt-8`}>{text}</button>
  )
}

export default AuthButton