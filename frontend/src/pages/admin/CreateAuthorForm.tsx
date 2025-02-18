import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './EditAuthorForm.module.css'
import useAuthStore from '../../services/AuthStore'
import CrudInput from '../../components/crud/CrudInput'
import CrudButton from '../../components/crud/CrudButton'
import { createAuthor } from '../../services/AuthorService'

const CreateAuthorForm = () : React.ReactNode => {

	const {darkTheme} = useAuthStore();

	const [name, setName] = React.useState('');
	const [birthDate, setBirthDate] = React.useState('');

	const navigate = useNavigate();

	const colors = darkTheme
	? {
		class: styles.light,
	}
	: {
		class: styles.dark,
	};

	const handleSave = async () => {
		await createAuthor({name: name, birthDate: birthDate})
		navigate('/admin/dashboard/author')
	}

	const handleClear = () => {
		setBirthDate('')
		setName('')
	}

	return (
		<div className={`w-full flex items-center justify-center`}>
			<div className={`fixed left-96 top-8`}>
				<CrudButton text='Back' onClick={()=> navigate('/admin/dashboard/author')} darkTheme={darkTheme}></CrudButton>
			</div>
			<div className={`shadow-sm p-8 flex flex-col gap-8 ${colors.class}`}>
				<h1 className={`text-4xl font-semibold`}>Create New Author</h1>
				<CrudInput text='Name' darkTheme={darkTheme} value={name} onChange={(e) => setName(e.target.value)} type='text'></CrudInput>
				<CrudInput text='BirthDate' darkTheme={darkTheme} value={birthDate} onChange={(e) => setBirthDate(e.target.value)} type='date'></CrudInput>
				<div className={`flex gap-8`}>
					<CrudButton text='Save' onClick={handleSave} darkTheme={darkTheme}></CrudButton>
					<CrudButton text='Clear' onClick={handleClear} darkTheme={darkTheme}></CrudButton>
				</div>
			</div>
		</div>
	)
}

export default CreateAuthorForm