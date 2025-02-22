import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './EditAuthorForm.module.css'
import useAuthStore from '../../services/AuthStore'
import CrudInput from '../../components/crud/CrudInput'
import CrudButton from '../../components/crud/CrudButton'
import { createBook } from '../../services/BookService'

const CreateBookForm = () : React.ReactNode => {

	const {darkTheme} = useAuthStore();

	const [title, setTitle] = React.useState('');
	const [isbn, setIsbn] = React.useState('');
	const [authorId, setAuthorId] = React.useState('');
	const [categoryId, setCategoryId] = React.useState('');
	const [publishYear, setPublishYear] = React.useState('');
	const [availableCopies, setAvailableCopies] = React.useState('');
	const [borrowCount, setBorrowCount] = React.useState('');
	const [coverUrl, setCoverUrl] = React.useState('');

	const navigate = useNavigate();

	const colors = darkTheme
	? {
		class: styles.light,
	}
	: {
		class: styles.dark,
	};

	const handleSave = async () => {
		await createBook({
			title: title,
			isbn: isbn,
			authorId: Number(authorId),
			categoryId: Number(categoryId),
			publishYear: Number(publishYear),
			availableCopies: Number(availableCopies),
			borrowCount: 0,
			coverUrl: coverUrl
		} );
		navigate('/admin/dashboard/book')
	}

	const handleClear = () => {
		setTitle('');
		setIsbn('');
		setAuthorId('');
		setCategoryId('');
		setPublishYear('');
		setAvailableCopies('');
		setBorrowCount('');
		setCoverUrl('');
	}

	return (
		<div className={`w-full flex items-center justify-center`}>
			<div className={`fixed left-96 top-8`}>
				<CrudButton text='Back' onClick={()=> navigate('/admin/dashboard/book')} darkTheme={darkTheme}></CrudButton>
			</div>
			<div className={`shadow-sm p-8 flex flex-col gap-8 ${colors.class}`}>
				<h1 className={`text-4xl font-semibold`}>Create New Book</h1>
				<CrudInput text='TITLE' darkTheme={darkTheme} value={title} onChange={(e) => setTitle(e.target.value)} type='text'></CrudInput>
				<CrudInput text='ISBN' darkTheme={darkTheme} value={isbn} onChange={(e) => setIsbn(e.target.value)} type='text'></CrudInput>
				<CrudInput text='AUTHOR ID' darkTheme={darkTheme} value={authorId.toString()} onChange={(e) => setAuthorId(e.target.value)}></CrudInput>
				<CrudInput text='CATEGORY ID' darkTheme={darkTheme} value={categoryId.toString()} onChange={(e) => setCategoryId(e.target.value)}></CrudInput>
				<CrudInput text='PUBLISH YEAR' darkTheme={darkTheme} value={publishYear.toString()} onChange={(e) => setPublishYear(e.target.value)}></CrudInput>
				<CrudInput text='AVAILABLE COPIES' darkTheme={darkTheme} value={availableCopies.toString()} onChange={(e) => setAvailableCopies(e.target.value)}></CrudInput>
				<CrudInput text='BORROW COUNT' darkTheme={darkTheme} value={borrowCount.toString()} onChange={(e) => setBorrowCount(e.target.value)}></CrudInput>
				<CrudInput text='COVER URL' darkTheme={darkTheme} value={coverUrl.toString()} onChange={(e) => setCoverUrl(e.target.value)}></CrudInput>
				<div className={`flex gap-8`}>
					<CrudButton text='Save' onClick={handleSave} darkTheme={darkTheme}></CrudButton>
					<CrudButton text='Clear' onClick={handleClear} darkTheme={darkTheme}></CrudButton>
				</div>
			</div>
		</div>
	)
}

export default CreateBookForm