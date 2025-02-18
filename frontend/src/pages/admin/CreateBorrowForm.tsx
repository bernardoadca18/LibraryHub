import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './EditAuthorForm.module.css'
import useAuthStore from '../../services/AuthStore'
import CrudInput from '../../components/crud/CrudInput'
import CrudButton from '../../components/crud/CrudButton'
import { createBorrow } from '../../services/BorrowService'

const CreateBorrowForm = () : React.ReactNode => {
    const { darkTheme } = useAuthStore()
    const navigate = useNavigate()

    const [userId, setUserId] = React.useState('')
    const [bookId, setBookId] = React.useState('')
    const [borrowDate, setBorrowDate] = React.useState('')
    const [dueDate, setDueDate] = React.useState('')

    const colors = darkTheme 
    ? { class: styles.light } 
    : { class: styles.dark }

    const handleSave = async () => {
        await createBorrow({
            userId: Number(userId),
            bookId: Number(bookId),
            borrowDate: borrowDate || new Date().toISOString().split('T')[0],
            dueDate: dueDate || new Date(Date.now() + 12096e5).toISOString().split('T')[0],
            returnDate: ''
        })
        navigate('/admin/dashboard/borrow')
    }

    const handleClear = () => {
        setUserId('')
        setBookId('')
        setBorrowDate('')
        setDueDate('')
    }

    return (
        <div className={`${styles.formContainer} ${colors.class}`}>
            <h1 className={styles.formTitle}>Create New Borrow</h1>
            
            <div className={styles.inputGroup}>
                <CrudInput
                    text="User ID"
                    type="number"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    darkTheme= {darkTheme}
                />
                <CrudInput
                    text="Book ID"
                    type="number"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    darkTheme = {darkTheme}
                />
            </div>

            <div className={styles.inputGroup}>
                <CrudInput
                    text="Borrow Date"
                    type="date"
                    value={borrowDate}
                    onChange={(e) => setBorrowDate(e.target.value)}
                    darkTheme = {darkTheme}
                />
                <CrudInput
                    text="Due Date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    darkTheme = {darkTheme}
                />
            </div>

            <div className={styles.buttonGroup}>
                <CrudButton onClick={handleSave} text="Save" darkTheme={darkTheme}></CrudButton>
                <CrudButton onClick={handleClear} text="Clear" darkTheme={darkTheme}></CrudButton>
            </div>
        </div>
    )
}

export default CreateBorrowForm