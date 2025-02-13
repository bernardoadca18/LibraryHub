import React, {useState, useEffect} from 'react'
import styles from './BookCatalogue.module.css'
import Searchbar from '../components/Searchbar.tsx';
import { searchBooks, fetchBooks, BookData } from '../services/BookService';
import { fetchAllCategories, CategoryData } from '../services/CategoryService';
import { fetchAllAuthors, AuthorDTO } from '../services/AuthorService';
import BookCard from '../components/BookCard';
import useAuthStore from '../services/AuthStore';

const BookCatalogue = () : React.ReactNode => {

  const Pagination = () => {
    return (
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className="px-4 py-2 mx-1 border rounded disabled:opacity-50"
        >
          Anterior
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-4 py-2 mx-1 border rounded ${
              currentPage === i ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {i + 1}
          </button>
        ))}
        
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
          className="px-4 py-2 mx-1 border rounded disabled:opacity-50"
        >
          Próximo
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
  const [minRating, setMinRating] = useState<number>(0);
  
  // filter options
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [authors, setAuthors] = useState<AuthorDTO[]>([]);

  const { darkTheme } = useAuthStore();


  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 20;

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


    useEffect(() => {
      const loadFilterOptions = async () => {
        try 
        {
          const [categoriesData, authorsData] = await Promise.all([
            fetchAllCategories(),
            fetchAllAuthors()
          ]);

          setCategories(categoriesData);
          setAuthors(authorsData);
        } 
        catch (error)
        {
          console.error('Error loading filter options:', error);
        }
      };
      loadFilterOptions();
    }, []);
    
    useEffect(() => {
      const fetchFilteredBooks = async () => {
          try {
              let response;
  
              // Buscar todos os livros sem paginação
              if (searchQuery) {
                  response = await searchBooks(searchQuery);
              } else {
                  response = await fetchBooks(0, 1000); // Número grande para pegar todos
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
                  const matchesRating = book.averageRating >= minRating;
                  
                  return matchesCategory && matchesAuthor && matchesYear && matchesAvailability && matchesRating;
              });
  
              // Atualizar o total de páginas com base em todos os livros filtrados
              setTotalPages(Math.ceil(filteredBooks.length / pageSize));
  
              // Paginar os livros filtrados
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
      showAvailableOnly, minRating, currentPage, pageSize]);

  return (
    <div className=''>
      {/* Search Bar */}
      <div className={`mt-16 mb-4 flex flex-col items-center p-8 shadow-sm gap-4 ${colors.class}`}>
        <h1 className={`text-3xl ${colors.text}`}>Search Books</h1>
        <Searchbar className={''} type='text' placeholder='Search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></Searchbar>
      </div>
      {/* Filters Section */}
      <div className='mb-4 flex flex-wrap gap-4'>
        {/* Category Filter */}
        <select className='p-2 border rounded' value={selectedCategory || ''} onChange={(e) => setSelectedCategory(Number(e.target.value) || null)}>
          <option value="">All Categories</option>
          {categories.map(category => (
              <option key={category.categoryId} value={category.categoryId}>
                  {category.name}
              </option>
          ))}
        </select>

        {/* Author Filter */}
        <select value={selectedAuthor || ''} onChange={(e) => setSelectedAuthor(Number(e.target.value) || null)} className="p-2 border rounded" >
            <option value="">All Authors</option>
            {authors.map(author => (
                <option key={author.authorId} value={author.authorId}>
                    {author.name}
                </option>
            ))}
        </select>

        {/* Year Filter */}
        <input type="number" placeholder="Publication Year" value={selectedYear || ''} onChange={(e) => setSelectedYear(Number(e.target.value) || null)} className="p-2 border rounded" />

        {/* Availability Filter */}
        <label className="flex items-center">
            <input type="checkbox" checked={showAvailableOnly} onChange={(e) => setShowAvailableOnly(e.target.checked)} className="mr-2"/>
            Available Only
        </label>

        {/* Rating Filter */}
        <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="p-2 border rounded" >
            <option value={0}>All Ratings</option>
            <option value={3}>3+ Stars</option>
            <option value={4}>4+ Stars</option>
            <option value={5}>5 Stars</option>
        </select>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book) => (
              <BookCard key={book.bookId} imageUrl={book.coverUrl} title={book.title} author={book.authorName} year={book.publishYear} category={book.categoryName} availableCopies={book.availableCopies} darkTheme={darkTheme} />
          ))}
      </div>
      {/* Pagination */}
      {<Pagination></Pagination>}
    </div>
  )
}


export default BookCatalogue