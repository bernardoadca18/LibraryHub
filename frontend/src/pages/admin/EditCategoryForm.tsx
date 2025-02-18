import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './EditAuthorForm.module.css'
import useAuthStore from '../../services/AuthStore'
import CrudInput from '../../components/crud/CrudInput'
import CrudButton from '../../components/crud/CrudButton'
import { updateCategory } from '../../services/CategoryService'

const EditCategoryForm = () : React.ReactNode => {
    const { categoryId } = useParams<{ categoryId: string }>()
    const { darkTheme } = useAuthStore()
    const navigate = useNavigate()

    const [name, setName] = React.useState('')

    const colors = darkTheme
    ? { class: styles.light }
    : { class: styles.dark }

    const handleSave = async () => {
        await updateCategory(Number(categoryId), { name: name })
        navigate('/admin/dashboard/category')
    }

    const handleClear = () => {
        setName('')
    }

    return (
        <div className={`w-full flex items-center justify-center`}>
            <div className={`fixed left-96 top-8`}>
                <CrudButton text='Back' onClick={() => navigate('/admin/dashboard/category')} darkTheme={darkTheme}/>
            </div>
            <div className={`shadow-sm p-8 flex flex-col gap-8 ${colors.class}`}>
                <h1 className={`text-4xl font-semibold`}>Edit Category (ID: {categoryId})</h1>
                <CrudInput 
                    text='Name' 
                    darkTheme={darkTheme} 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    type='text'
                />
                <div className={`flex gap-8`}>
                    <CrudButton text='Save' onClick={handleSave} darkTheme={darkTheme}/>
                    <CrudButton text='Clear' onClick={handleClear} darkTheme={darkTheme}/>
                </div>
            </div>
        </div>
    )
}

export default EditCategoryForm