import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookData, fetchBookById } from '../services/BookService.ts';
import { createBorrow } from '../services/BorrowService.ts';
import { getUserIdFromToken } from '../services/Auth.ts';
import useAuthStore from '../services/AuthStore.ts';
import styles from './BookPage.module.css'

const BookPage = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const [book, setBook] = useState<BookData | null>(null);
    const [loading, setLoading] = useState(true);
    const { darkTheme, isAuthenticated } = useAuthStore();
    const [error, setError] = useState('');

    const colors = darkTheme
    ? {
        background: 'bg-black',
        text: 'text-gray-100',
        class: styles.light,
    }
    : {
        background: 'bg-white',
        text: 'text-slate-800',
        class: styles.dark,
    };


    const handleBorrow = async () => {
        if (!book) return;

        try {
            setError('');
            const userId = await getUserIdFromToken();
            if (userId === -1) {
                setError('Usuário não autenticado');
                return;
            }
            
            const borrowData = {
                bookId: Number(book.bookId),
                userId: Number(userId),
                borrowDate: new Date().toISOString().split('T')[0],
                dueDate: new Date(Date.now() + 12096e5).toISOString().split('T')[0],
                returnDate: ''
            };
    
            await createBorrow(borrowData);
            const updatedBook = await fetchBookById(book.bookId);
            setBook(updatedBook);
        } catch (err) {
            setError('Error borrowing book. Please try again.');
            console.error('Borrow error:', err);
            console.log(error);
        }
    };

    useEffect(() => {
        const loadBook = async () => {
            try {
                const bookData = await fetchBookById(Number(bookId));
                setBook(bookData);
            } catch (error) {
                console.error('Error loading book:', error);
            } finally {
                setLoading(false);
            }
        };
        loadBook();
    }, [bookId]);

    if (loading) return <div>Loading...</div>;
    if (!book) return <div>Book not found</div>;
    

    return (
        <main className='flex flex-col'>
            <div className={`mt-16 flex p-8 shadow-sm`}>
            <div>
                <h1 className={`text-4xl font-semibold`}>{book.title}</h1>
                <p className={`mt-2 text-xl`}>{book.publishYear}</p>
            </div>
            <div className='flex-grow'></div>
            <div>
                <p className='text-xl font-semibold'>Overall Rating</p>
                <div className='flex gap-2'>
                    <i className="bi bi-star-fill text-xl"></i>
                    <p className='font-semibold text-xl'>{book.averageRating}/10</p>
                </div>
            </div>
            </div>
            
            <div className='p-8 w-full h-dvh'>
                <img className='w-full h-48 object-cover rounded-t-lg' src={book.coverUrl || ""} alt={`Capa do livro ${book.title}`} />
            </div>

            <div className='flex flex-col p-8'>
            {
                    isAuthenticated && book.availableCopies > 0 && (
                        <button 
                            onClick={handleBorrow}
                            className={`mt-4 px-6 py-2 rounded-lg transition-colors ${colors.class} ${""} hover:cursor-pointer`}
                        >
                            Borrow Book ({book.availableCopies} available)
                        </button>
                    )
            }
            </div>

        </main>
    );
};

export default BookPage;