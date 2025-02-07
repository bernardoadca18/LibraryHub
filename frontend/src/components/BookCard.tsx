import React from 'react'

interface BookCardProps {
    imageUrl: string;
    title: string;
    author: string;
    year: number;
    category: string;
}

const BookCard = ({ imageUrl, title, author, year, category } : BookCardProps) => {
    return (
        <div className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-100'>
            <img className='w-full h- object-cover rounded-t-lg' src={imageUrl} alt={`Capa do livro ${title}`} />
            <div className='p-4'>
                <h3 className='font-semibold text-slate-800 mb-2'>{title}</h3>
                <p className='text-sm text-slate-600 mb-1'>{author}</p>
                <div className='flex justify-between text-sm text-slate-500'>
                    <span>{year}</span>
                    <span>{category}</span>
                </div>
            </div>
        </div>
    )
}

export default BookCard