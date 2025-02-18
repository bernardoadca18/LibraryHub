import React from 'react'
import useAuthStore from '../../services/AuthStore';
import { getUsernameFromToken } from '../../services/Auth';
import styles from './ManageAuthors.module.css'

const ManageBooks = () => {
    const { darkTheme } = useAuthStore();

    const colors = darkTheme
    ? {
        button: styles.buttonLight,
        lightbulbIconColor: 'text-black',
        buttonActive : styles.buttonActiveLight,
        background_1: styles.lightBackground1,
        background_2: styles.lightBackground2,
        background_3: styles.lightBackground3,
    }
    : {
        button: styles.buttonDark,
        lightbulbIconColor: 'text-white',
        buttonActive : styles.buttonActive,
        background_1: styles.darkBackground1,
        background_2: styles.darkBackground2,
        background_3: styles.darkBackground3,
    };
  return (
    <div className={`w-full h-32`}>
        <div className={`w-full h-full ${colors.background_1} p-8`}>
            <h1 className={`text-2xl font-semibold`}>Welcome, {getUsernameFromToken()}</h1>
            <h3 className={`text-gray-400`}>Monitor and edit the books from here.</h3>
        </div>
    </div>
  )
}

export default ManageBooks