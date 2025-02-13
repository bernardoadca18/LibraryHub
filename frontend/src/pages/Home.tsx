import React, { useEffect, useState } from 'react'
import PageTitle from '../components/Home/PageTitle.tsx'
import DescriptiveCard from '../components/Home/DescriptiveCard.tsx';
import { fetchBooksCount, fetchTopRatedBooks } from '../services/BookService.ts';
import { fetchCategoryCount } from '../services/CategoryService.ts';
import BookCard from '../components/BookCard.tsx';
import {BookData} from '../services/BookService.ts';
import {CategoryData, fetchAllCategories} from '../services/CategoryService.ts';
import useAuthStore from '../services/AuthStore.ts';
import styles from './Home.module.css'
import CategoryCard from '../components/CategoryCard.tsx';


const Home = () : React.ReactNode => {
    const { darkTheme } = useAuthStore();
    const [bookCount, setBookCount] = useState<number>(0);
    const [categoryCount, setCategoryCount] = useState<number>(0);
    const [topRatedBooks, setTopRatedBooks] = useState<BookData[]>([]);
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const colors = darkTheme
    ? {
        background: 'bg-white',
        text: 'text-slate-800',
        cardBackground: 'bg-white',
        cardBorder: 'border-slate-100',
        cardText: 'text-slate-800',
        cardDescription: 'text-slate-600',
        sectionBackground: 'bg-gradient-to-r from-slate-100 to-slate-200',
        sectionText: 'text-slate-800',
        class: styles.light
    }
    : {
        background: 'bg-black',
        text: 'text-gray-100',
        cardBackground: 'bg-gray-800',
        cardBorder: 'border-gray-700',
        cardText: 'text-gray-100',
        cardDescription: 'text-gray-300',
        sectionBackground: 'bg-gray-900',
        sectionText: 'text-gray-100',
        class: styles.dark
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [booksCount, categoriesCount, topRated, categories] = await Promise.all([
                    fetchBooksCount(),
                    fetchCategoryCount(),
                    fetchTopRatedBooks(1, 20),
                    fetchAllCategories()
                ]);

                setBookCount(booksCount);
                setCategoryCount(categoriesCount);
                setTopRatedBooks(topRated);
                setCategories(categories);
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
        <div className={`${colors.background} mt-16 min-h-[calc(100vh-4rem)]`}>
            <PageTitle title={pageTitle} description={pageDescription} darkTheme={darkTheme}/>
            <div className={`max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-row gap-8 justify-center ${colors.background}`}>
                {statsContent.map((stats, index) => (
                    <DescriptiveCard 
                        key={index} 
                        title={stats.count.toString()} 
                        description={stats.desc} 
                        darkTheme={darkTheme}
                    />
                ))}
            </div>

            <div className='p-4'>
                <div className={`${colors.class} max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8`}>
                    <h2 className={`text-2xl font-bold mb-6 ${colors.sectionText}`}>Top Rated Books</h2>
                    <div className='flex overflow-x-auto gap-6 pb-4'>
                        {Array.isArray(topRatedBooks) && topRatedBooks.map((book : BookData, index : number) => (
                            <div key={index} className='flex-shrink-0 w-48'>
                                <BookCard 
                                    imageUrl={book.coverUrl || '/public/default-book-cover.png'} 
                                    title={book.title} 
                                    author={book.authorName} 
                                    year={book.publishYear} 
                                    category={book.categoryName}
                                    darkTheme={darkTheme}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='p-4'>
                <div className={`${colors.class} max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8`}>
                    <h2 className={`text-2xl font-bold mb-6 ${colors.sectionText}`}>Categories</h2>
                    <div className='flex overflow-x-auto gap-6 pb-4'>
                        {Array.isArray(categories) && categories.map((category : CategoryData, index : number) => (
                            <div key={index} className='flex-shrink-0 w-48'>
                                <CategoryCard name={category.name}></CategoryCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home