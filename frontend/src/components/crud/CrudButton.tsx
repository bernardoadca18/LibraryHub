import React from 'react'
import styles from './CrudButton.module.css'

interface CrudButtonProps {
    text : string
    onClick : () => void;
    darkTheme: boolean;
} 

const CrudButton = ({ text, onClick, darkTheme } : CrudButtonProps) : React.ReactNode => {
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
    <button onClick={onClick} className={`${styles.buttonAuth} ${colors.class} ${colors.textColor} self-center text-xl rounded-xl w-44 h-12 mt-8`}>{text}</button>
  )
}

export default CrudButton