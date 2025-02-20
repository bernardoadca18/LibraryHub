import React, {useState, useEffect} from 'react'
import styles from './BookCatalogue.module.css'
import Searchbar from '../components/Searchbar.tsx';
import { searchBooks, fetchBooks, BookData, fetchBooksCount } from '../services/BookService';
import { fetchAllCategories, CategoryData } from '../services/CategoryService';
import { fetchAllAuthors, AuthorDTO } from '../services/AuthorService';
import BookCard from '../components/BookCard';
import useAuthStore from '../services/AuthStore';
import { useSearchParams } from 'react-router-dom';

const BookCatalogue = () : React.ReactNode => {

  const Pagination = () => {
    const maxButtons = 5;
    const startPage = Math.max(0, currentPage - maxButtons);
    const endPage = Math.min(totalPages - 1, currentPage + maxButtons);
  
    return (
      <div className="flex justify-center mt-8">
        <button onClick={() => setCurrentPage(0)} disabled={currentPage === 0} className="px-4 py-2 mx-1 border rounded disabled:opacity-50">
          Início
        </button>
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))} disabled={currentPage === 0} className="px-4 py-2 mx-1 border rounded disabled:opacity-50">
          Anterior
        </button>
        
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const page = startPage + i;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 mx-1 border rounded ${
                currentPage === page ? 'bg-blue-500 text-white' : ''
              }`}
            >
              {page + 1}
            </button>
          );
        })}
        
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))} disabled={currentPage === totalPages - 1} className="px-4 py-2 mx-1 border rounded disabled:opacity-50">
          Próximo
        </button>
        <button onClick={() => setCurrentPage(totalPages - 1)} disabled={currentPage === totalPages - 1} className="px-4 py-2 mx-1 border rounded disabled:opacity-50">
          Fim
        </button>
      </div>
    );
  };

  // filters and search
  const [books, setBooks] = useState<BookData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  
  // filter options
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [authors, setAuthors] = useState<AuthorDTO[]>([]);

  const { darkTheme } = useAuthStore();


  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 20;
  const [loading, setLoading] = useState(true);
  const [bookCount, setBookCount] = useState<number>(0);

  const colors = darkTheme
    ? {
      background: 'bg-white',
      shadow: 'shadow-sm',
      text: 'text-slate-700',
      hoverText: 'hover:text-slate-900',
      border: 'border-slate-300',
      focusRing: 'focus:ring-slate-400',
      dropdownBackground: 'bg-white',
      dropdownHover: 'hover:bg-slate-100',
      dropdownBorder: 'border-slate-200',
      lightbulbIconColor: 'text-black',
      otherFontColor: 'text-black',
      class: styles.light
    }
    : {
      background: 'bg-black',
      shadow: 'shadow-sm',
      text: 'text-gray-100',
      hoverText: 'hover:text-white',
      border: 'border-gray-700',
      focusRing: 'focus:ring-gray-500',
      dropdownBackground: 'bg-black',
      dropdownHover: 'hover:bg-gray-700',
      dropdownBorder: 'border-gray-700',
      lightbulbIconColor: 'text-white',
      otherFontColor: 'text-gray-300',
      class: styles.dark
    };

    const [searchParams] = useSearchParams();
  
    useEffect(() => {
      const categoryParam = searchParams.get('category');
      if (categoryParam) {
        setSelectedCategory(Number(categoryParam));
      }
    }, [searchParams]);

    useEffect(() => {
      const loadFilterOptions = async () => {
        try 
        {
          const [categoriesData, authorsData, bookCount] = await Promise.all([
            fetchAllCategories(),
            fetchAllAuthors(),
            fetchBooksCount()
          ]);

          setCategories(categoriesData);
          setAuthors(authorsData);
          setBookCount(bookCount);
        } 
        catch (error)
        {
          console.error('Error loading filter options:', error);
        }
        finally
        {
          setLoading(false);
        }
      };
      loadFilterOptions();
    }, []);
    
    useEffect(() => {
      const fetchFilteredBooks = async () => {
          try {
              let response;

              if (searchQuery) {
                  response = await searchBooks(searchQuery);
              } else {
                  response = await fetchBooks(0, bookCount);
              }
  
              if (!response || !response.content) {
                  console.error('Resposta inválida da API:', response);
                  return;
              }
  
              // Aplicar filtros em todos os livros
              const filteredBooks = response.content.filter((book: BookData) => {
                  const matchesCategory = !selectedCategory || book.categoryId === selectedCategory;
                  const matchesAuthor = !selectedAuthor || book.authorId === selectedAuthor;
                  const matchesYear = !selectedYear || book.publishYear === selectedYear;
                  const matchesAvailability = !showAvailableOnly || book.availableCopies > 0;
                  
                  return matchesCategory && matchesAuthor && matchesYear && matchesAvailability;
              });
  
              setTotalPages(Math.ceil(filteredBooks.length / pageSize));
  
              const startIndex = currentPage * pageSize;
              const endIndex = startIndex + pageSize;
              const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
  
              setBooks(paginatedBooks);
          } catch (error) {
              console.error('Error fetching filtered books:', error);
          }
      };
  
      const timeoutId = setTimeout(fetchFilteredBooks, 300);
      return () => clearTimeout(timeoutId);
  
  }, [searchQuery, selectedCategory, selectedAuthor, selectedYear, 
      showAvailableOnly, currentPage, pageSize, bookCount]);

      const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(0);
      };
    
      const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(Number(e.target.value) || null);
        setCurrentPage(0);
      };
    
      const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAuthor(Number(e.target.value) || null);
        setCurrentPage(0);
      };
    
      const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedYear(Number(e.target.value) || null);
        setCurrentPage(0);
      };
    
      const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowAvailableOnly(e.target.checked);
        setCurrentPage(0);
      };

  if (loading)
  {
    return (<div></div>);
  }
  else
  {
    return (
      <div className={`${colors.class} ${colors.text} flex flex-col w-full`}>
        <header className={`pb-8 shadow-sm fixed top-16 w-full z-[999] ${colors.class}`}>
          {/* Search Bar */}
          <div className={`mt-16 mb-4 flex flex-col items-center gap-4`}>
            <h1 className={`text-3xl ${colors.text}`}>Search Books</h1>
            <Searchbar className={''} type='text' placeholder='Search' value={searchQuery} onChange={handleSearchChange}></Searchbar>
          </div>
          {/* Filters Section */}
          <div className='mb-4 flex flex-wrap gap-4 lg:justify-center lg:items-center pr-8 pl-8'>
            {/* Category Filter */}
            <select className={`p-2 border rounded ${colors.class}`} value={selectedCategory || ''} onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              {categories.map(category => (
                  <option key={category.categoryId} value={category.categoryId}>
                      {category.name}
                  </option>
              ))}
            </select>
    
            {/* Author Filter */}
            <select value={selectedAuthor || ''} onChange={handleAuthorChange} className={`p-2 border rounded ${colors.class}`} >
                <option value="">All Authors</option>
                {authors.map(author => (
                    <option key={author.authorId} value={author.authorId}>
                        {author.name}
                    </option>
                ))}
            </select>
    
            {/* Year Filter */}
            <input type="number" placeholder="Publication Year" value={selectedYear || ''} onChange={handleYearChange} className={`p-2 border rounded ${colors.class}`} />
    
            {/* Availability Filter */}
            <label className="flex items-center">
                <input type="checkbox" checked={showAvailableOnly} onChange={handleAvailabilityChange} className="mr-2"/>
                Available Only
            </label>
          </div>
          {/* Pagination */}
          {<Pagination></Pagination>}
        </header>
        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5  gap-4 mt-144 p-8">
            {books.map((book) => (
                <BookCard bookId={book.bookId!} key={book.bookId} imageUrl={book.coverUrl} title={book.title} author={book.authorName!} year={book.publishYear} category={book.categoryName!} availableCopies={book.availableCopies} darkTheme={darkTheme} />
            ))}
        </div>
      </div>
    )
  }
}


export default BookCatalogue