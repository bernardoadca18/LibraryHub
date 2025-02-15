import React from 'react'
import styles from './BookCard.module.css'
import { Link } from 'react-router-dom';
import useAuthStore from '../services/AuthStore.ts';

interface BookCardProps {
    bookId: number,
    imageUrl: string;
    title: string;
    author: string;
    year: number;
    category: string;
    availableCopies?: number;
    darkTheme: boolean;
}

const BookCard = ({ imageUrl, title, author, year, category, availableCopies = 0, darkTheme, bookId } : BookCardProps) => {
    const availabilityColor = availableCopies > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    const availabilityText = availableCopies > 0 ? 'Disponível' : 'Indisponível';

    const isOnFrontPage = location.pathname === '/';

    const {isAuthenticated} = useAuthStore();

    const colors = darkTheme
    ? {
        titleColor: 'text-slate-800',
        authorText: 'text-slate-600',
        otherText: 'text-slate-500',
        class: styles.light
    }
    : {
        titleColor: 'text-white',
        authorText: 'text-gray-200',
        otherText: 'text-gray-300',
        class: styles.dark
    };

    return (
        <>
            {
                isAuthenticated ? (
                    <Link to={`/book/${bookId}`}>
                        <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border-2 border-slate-100 ${colors.class}`}>
                            <img className='w-full h-48 object-cover rounded-t-lg' src={imageUrl || ""} alt={`Capa do livro ${title}`} />
                            <div className='p-4'>
                                <h3 className={`font-semibold mb-2 ${colors.titleColor}`}>{title}</h3>
                                <p className={`text-sm ${colors.authorText} mb-1`}>{author}</p>
                                <div className={`flex justify-between text-sm ${colors.otherText} mb-2`}>
                                    <span>{year}</span>
                                    <span>{category}</span>
                                </div>
                                {
                                    (!isOnFrontPage) ? (
                                        <div className={`text-sm px-2 py-1 rounded-full ${availabilityColor}`}>
                                            {availabilityText}
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                }
                            </div>
                        </div>
                    </Link>
                ) : (
                    <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border-2 border-slate-100 ${colors.class}`}>
                        <img className='w-full h-48 object-cover rounded-t-lg' src={imageUrl || ""} alt={`Capa do livro ${title}`} />
                        <div className='p-4'>
                            <h3 className={`font-semibold mb-2 ${colors.titleColor}`}>{title}</h3>
                            <p className={`text-sm ${colors.authorText} mb-1`}>{author}</p>
                            <div className={`flex justify-between text-sm ${colors.otherText} mb-2`}>
                                <span>{year}</span>
                                <span>{category}</span>
                            </div>
                            {
                                (!isOnFrontPage) ? (
                                    <div className={`text-sm px-2 py-1 rounded-full ${availabilityColor}`}>
                                        {availabilityText}
                                    </div>
                                ) : (
                                    <></>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default BookCard