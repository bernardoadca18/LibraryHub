import React from 'react'

interface BookCardProps {
    imageUrl: string;
    title: string;
    author: string;
    year: number;
    category: string;
    availableCopies?: number;
    darkTheme: boolean;
}

const BookCard = ({ imageUrl, title, author, year, category, availableCopies = 0 } : BookCardProps) => {
    const availabilityColor = availableCopies > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    const availabilityText = availableCopies > 0 ? 'Disponível' : 'Indisponível';

    const isOnFrontPage = location.pathname === '/';

    return (
        <div className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border-2 border-slate-100'>
            <img className='w-full h-48 object-cover rounded-t-lg' src={imageUrl || ""} alt={`Capa do livro ${title}`} />
            <div className='p-4'>
                <h3 className='font-semibold text-slate-800 mb-2'>{title}</h3>
                <p className='text-sm text-slate-600 mb-1'>{author}</p>
                <div className='flex justify-between text-sm text-slate-500 mb-2'>
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
    );
};

export default BookCard