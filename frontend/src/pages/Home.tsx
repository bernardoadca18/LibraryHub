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
import { Link } from 'react-router-dom';
import NavButton from '../components/Home/NavButton.tsx';


const Home = () : React.ReactNode => {
    const { darkTheme } = useAuthStore();
    const [bookCount, setBookCount] = useState<number>(0);
    const [categoryCount, setCategoryCount] = useState<number>(0);
    const [topRatedBooks, setTopRatedBooks] = useState<BookData[]>([]);
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const {isAuthenticated} = useAuthStore();

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
        class: styles.light,
        iconColor: '#000000'
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
        class: styles.dark,
        iconColor: '#FFFFFF'
    };
    // BUTTONS
    const bookIcon : React.ReactNode = <svg xmlns="http://www.w3.org/2000/svg" width="6rem" height="6rem" fill={colors.iconColor} className="bi bi-book-fill" viewBox="0 0 16 16"><path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/></svg>;
    const profileIcon : React.ReactNode = <svg xmlns="http://www.w3.org/2000/svg" width="6rem" height="6rem" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>;

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

    const navButtonsContent = [
        {text: "Book Catalogue", to: "/catalogue", icon: bookIcon},
        {text: "Profile", to: "/profile", icon: profileIcon}
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
                    <h2 className={`text-2xl font-bold mb-6 ${colors.sectionText}`}>Most Borrowed Books</h2>
                    <div className='flex overflow-x-auto gap-6 pb-4'>
                        {Array.isArray(topRatedBooks) && topRatedBooks.map((book : BookData, index : number) => (
                            <div key={index} className='flex-shrink-0 w-48'>
                                <BookCard
                                    bookId={book.bookId} 
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

            {
                isAuthenticated ? (
                    <>
                        <div className='p-4'>
                            <div className={`${colors.class} max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8`}>
                                <h2 className={`text-2xl font-bold mb-6 ${colors.sectionText}`}>Menus</h2>
                                <div className='flex overflow-x-auto gap-6 pb-4'>
                                    {
                                        navButtonsContent.map((content, index) => (
                                            <NavButton key={index} text={content.text} to={content.to} icon={content.icon} darkTheme={darkTheme}></NavButton>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className='p-4'>
                            <div className={`${colors.class} max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8`}>
                                <h2 className={`text-2xl font-bold mb-6 ${colors.sectionText}`}>Categories</h2>
                                <div className='flex overflow-x-auto gap-6 pb-4'>
                                    {Array.isArray(categories) && categories.map((category : CategoryData, index : number) => (
                                        <div key={index} className='flex-shrink-0 w-48'>
                                            <Link key={index} to={`/catalogue?category=${category.categoryId}`} className='flex-shrink-0 w-48'>
                                                <CategoryCard name={category.name}></CategoryCard>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ): (
                    <></>
                )
            }
        </div>
    )
}

export default Home