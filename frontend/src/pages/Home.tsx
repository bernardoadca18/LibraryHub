import React, { useEffect, useState } from 'react'
import PageTitle from '../components/Home/PageTitle.tsx'
import DescriptiveCard from '../components/Home/DescriptiveCard.tsx';
import { /*fetchBooks,*/ fetchBooksCount, fetchTopRatedBooks } from '../services/BookService.ts';
import { fetchCategoryCount } from '../services/CategoryService.ts';
import BookCard from '../components/BookCard.tsx';
import {BookData} from '../services/BookService.ts'



const Home = () : React.ReactNode => {

    const [bookCount, setBookCount] = useState<number>(0);
    const [categoryCount, setCategoryCount] = useState<number>(0);
    const [topRatedBooks, setTopRatedBooks] = useState<BookData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [booksCount, categoriesCount, topRated] = await Promise.all([
                    fetchBooksCount(),
                    fetchCategoryCount(),
                    fetchTopRatedBooks(1, 10)
                ]);

                setBookCount(booksCount);
                setCategoryCount(categoriesCount);
                setTopRatedBooks(topRated);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }



    const pageTitle : string = "Explore our literary collection";
    const pageDescription : string = "Discover thousands of books in various categories";
    const categoryCountStr : string = categoryCount.toString();

    const statsContent = [
        {count: bookCount, desc: "Available books"},
        {count: categoryCountStr, desc: "Categories"},
        {count: '24h', desc: "Available for you"}
    ]
    return (
        <>
            <PageTitle title={pageTitle} description={pageDescription}/>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-row gap-8 justify-center">
                {statsContent.map((stats, index) => (
                    <DescriptiveCard key={index} title={stats.count.toString()} description={stats.desc} />
                ))}
            </div>


            <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
                <h2 className='text-2xl font-bold text-slate-800 mb-6'>Top Rated Books</h2>
                <div className='flex overflow-x-auto gap-6 pb-4'>
                    {Array.isArray(topRatedBooks) && topRatedBooks.map((book : BookData, index : number) => (
                            <div key={index}  className='flex-shrink-0 w-48'>
                                <BookCard imageUrl={book.coverUrl || '/public/default-book-cover.png'} title={book.title} author={book.authorName} year={book.publishYear} category={book.categoryName}></BookCard>
                            </div>
                        ))
                    }
                    
                </div>
            </div>
        </>
    )
}

export default Home