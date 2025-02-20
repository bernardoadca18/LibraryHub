import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {  BookData, fetchBookById } from '../services/BookService.ts';
import { createBorrow, checkActiveBorrow, BorrowDTO, fetchActiveUserBorrows, returnBorrow } from '../services/BorrowService.ts';
import { getUserIdFromToken } from '../services/Auth.ts';
import useAuthStore from '../services/AuthStore.ts';
import styles from './BookPage.module.css'

const BookPage = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const [book, setBook] = useState<BookData | null>(null);
    const [loading, setLoading] = useState(true);
    const { darkTheme, isAuthenticated } = useAuthStore();
    const [error, setError] = useState('');

    const [hasActiveBorrow, setHasActiveBorrow] = useState(false);
    const [activeBorrowId, setActiveBorrowId] = useState<number | null>(null);


    const colors = darkTheme
    ? {
        background: 'bg-black',
        text: 'text-gray-100',
        class: styles.light,
        bgClass1: styles.lightBg1,
        bgClass2: styles.lightBg2,
        regularText: 'text-slate-800'
    }
    : {
        background: 'bg-white',
        text: 'text-slate-800',
        class: styles.dark,
        bgClass1: styles.darkBg1,
        bgClass2: styles.darkBg2,
        regularText: 'text-gray-100'
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
            try 
            {
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

    useEffect(() => {
        const checkBorrowStatus = async () => {
            if (isAuthenticated && book) {
                try {
                    const userId = await getUserIdFromToken();
                    const isBorrowed = await checkActiveBorrow(userId, book.bookId);
                    setHasActiveBorrow(isBorrowed);
                    
                    // Buscar ID do empréstimo ativo
                    const activeBorrows = await fetchActiveUserBorrows(userId);
                    let activeBorrow: BorrowDTO | undefined;
                    activeBorrows.map((borrow : BorrowDTO) => {
                        if ((borrow.bookId === book.bookId) && (!borrow.returnDate || borrow.returnDate == ''))
                        {
                            activeBorrow = borrow;
                        }
                    })
                    if (activeBorrow && activeBorrow.borrowId) setActiveBorrowId(activeBorrow.borrowId);
                } catch (error) {
                    console.error('Error checking borrow status:', error);
                }
            }
        };

        checkBorrowStatus();
    }, [book, isAuthenticated]);

    const handleReturn = async () => {
        if (!activeBorrowId || !book) return;
    
        try {
            setError('');
            await returnBorrow(activeBorrowId);
            const updatedBook = await fetchBookById(book.bookId);
            setBook(updatedBook);
            setHasActiveBorrow(false);
        } catch (err) {
            setError('Erro ao devolver livro. Tente novamente.');
            console.error('Return error:', err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!book) return <div>Book not found</div>;
    

    return (
        <main className='flex flex-col'>
            <div className={`mt-16 flex p-8 shadow-sm ${colors.bgClass1} ${colors.regularText}`}>
            <div>
                <h1 className={`text-4xl font-semibold`}>{book.title}</h1>
                <p className={`mt-2 text-xl`}>{book.publishYear}</p>
            </div>
            <div className='flex-grow'></div>
            
            </div>
            
            <div className={`p-8 w-full h-dvh ${colors.bgClass2} ${colors.regularText}`}>
                <img className='w-48 h-fit object-cover rounded-t-lg' src={book.coverUrl || ""} alt={`Capa do livro ${book.title}`} />
            </div>

            <div className={`flex flex-col p-8 items-center ${colors.bgClass1} ${colors.regularText}`}>
            {
                isAuthenticated && (
                    <div className='w-full flex items-center justify-center gap-8'>
                        {
                            hasActiveBorrow ? (
                                <button onClick={handleReturn} className={`w-3/4 mt-4 px-6 py-2 rounded-lg transition-colors ${colors.class} ${""} hover:cursor-pointer`}>
                                    Return Book
                                </button>
                            ) : book.availableCopies > 0 ? (
                                <button onClick={handleBorrow} className={`w-3/4 mt-4 px-6 py-2 rounded-lg transition-colors ${colors.class} ${""} hover:cursor-pointer`}>
                                Borrow Book ({book.availableCopies} available)
                                </button>
                            ) : null
                        }
                    </div>
                )
            }
            </div>

        </main>
    );
};

export default BookPage;