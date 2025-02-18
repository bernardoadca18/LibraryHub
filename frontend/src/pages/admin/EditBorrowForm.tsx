import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './EditAuthorForm.module.css'
import useAuthStore from '../../services/AuthStore'
import CrudInput from '../../components/crud/CrudInput'
import CrudButton from '../../components/crud/CrudButton'
import { updateBorrow } from '../../services/BorrowService'

const EditBorrowForm = () : React.ReactNode => {
    const { borrowId } = useParams<{ borrowId: string }>()
    
    const { darkTheme } = useAuthStore()
    const navigate = useNavigate()

    const [userId, setUserId] = React.useState('')
    const [bookId, setBookId] = React.useState('')
    const [borrowDate, setBorrowDate] = React.useState('')
    const [dueDate, setDueDate] = React.useState('')
    const [returnDate, setReturnDate] = React.useState('')

    const colors = darkTheme 
    ? { class: styles.light } 
    : { class: styles.dark }

    const handleSave = async () => {
        await updateBorrow(Number(borrowId), {
            userId: Number(userId),
            bookId: Number(bookId),
            borrowDate,
            dueDate,
            returnDate: returnDate
        })
        navigate('/admin/dashboard/borrow')
    }

    const handleClear = () => {
        setUserId('')
        setBookId('')
        setBorrowDate('')
        setDueDate('')
        setReturnDate('')
    }

    return (
        <div className={`${styles.formContainer} ${colors.class}`}>
            <h1 className={styles.formTitle}>Edit Borrow</h1>
            
            <div className={styles.inputGroup}>
                <CrudInput
                    text="User ID"
                    type="number"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    darkTheme={darkTheme}
                />
                <CrudInput
                    text="Book ID"
                    type="number"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    darkTheme={darkTheme}
                />
            </div>

            <div className={styles.inputGroup}>
                <CrudInput
                    text="Borrow Date"
                    type="date"
                    value={borrowDate}
                    onChange={(e) => setBorrowDate(e.target.value)}
                    darkTheme={darkTheme}
                />
                <CrudInput
                    text="Due Date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    darkTheme={darkTheme}
                />
            </div>

            <div className={styles.inputGroup}>
                <CrudInput
                    text="Return Date"
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    darkTheme={darkTheme}
                />
            </div>

            <div className={styles.buttonGroup}>
                <CrudButton onClick={handleSave} text='Save' darkTheme={darkTheme}></CrudButton>
                <CrudButton onClick={handleClear} text='Clear' darkTheme={darkTheme}></CrudButton>
            </div>
        </div>
    )
}

export default EditBorrowForm