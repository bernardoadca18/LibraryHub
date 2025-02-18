import { useEffect, useState } from 'react'
import useAuthStore from '../../services/AuthStore';
import { getUsernameFromToken } from '../../services/Auth';
import styles from './ManageAuthors.module.css'
import Searchbar from '../../components/Searchbar';
import stylesTable from './TableStyles.module.css'
import { useNavigate } from 'react-router-dom';
import { BookData, deleteBook, searchBooks } from '../../services/BookService';

const ManageBooks = () => {
    const { darkTheme } = useAuthStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 20;

    const [books, setBooks] = useState<BookData[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchFilteredBooks = async () => {
            try {
                const response = await searchBooks(searchQuery, currentPage, pageSize);
                
                if (!response || !response.content) {
                    console.error('Resposta inválida da API:', response);
                    return;
                }
                
                setBooks(response.content);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error('Error fetching filtered books:', error);
            }
        };
        const timeoutId = setTimeout(fetchFilteredBooks, 300);
        return () => clearTimeout(timeoutId);
    }, [searchQuery, currentPage, pageSize]);


    const Pagination = () => {
    return (
        <div className="flex justify-center mt-8">
            <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))} 
                disabled={currentPage === 0} 
                className={`px-4 py-2 mx-1 border rounded disabled:opacity-50 ${colors.button}`}
            >
                Anterior
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-4 py-2 mx-1 border rounded ${
                        currentPage === i ? colors.buttonActive : colors.button
                    } ${colors.buttonText}`}
                >
                    {i + 1}
                </button>
            ))}
            
            <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))} 
                disabled={currentPage === totalPages - 1} 
                className={`px-4 py-2 mx-1 border rounded disabled:opacity-50 ${colors.button}`}
            >
                Próximo
            </button>
        </div>
    );
    };

    const handleEditClick = (id: number | undefined) => {
        navigate(`/admin/dashboard/book/edit/${id}`);
    }

    const handleDeleteClick = async (id: number | undefined) => {
        await deleteBook(Number(id));
        const response = await searchBooks(searchQuery, currentPage, pageSize);
        setBooks(response.content);
        setTotalPages(response.totalPages);
    }

    const handleCreateClick = () => {
        navigate(`/admin/dashboard/book/create`);
    }

    const colors = darkTheme
    ? {
        button: styles.buttonLight,
        lightbulbIconColor: 'text-black',
        buttonActive : styles.buttonActiveLight,
        background_1: styles.lightBackground1,
        background_2: styles.lightBackground2,
        background_3: styles.lightBackground3,
        text: 'text-black',
        buttonText: 'text-white'
    }
    : {
        button: styles.buttonDark,
        lightbulbIconColor: 'text-white',
        buttonActive : styles.buttonActive,
        background_1: styles.darkBackground1,
        background_2: styles.darkBackground2,
        background_3: styles.darkBackground3,
        text: 'text-white',
        buttonText: 'text-black'
    };

    return (
        <div className={`w-full h-full`}>
            <div className={`w-full h-32 shadow-sm`}>
                <div className={`w-full h-full ${colors.background_1} p-8 flex items-center`}>
                    <div>
                        <h1 className={`text-2xl font-semibold`}>Welcome, {getUsernameFromToken()}</h1>
                        <h3 className={`text-gray-400`}>Monitor and edit the books from here.</h3>
                    </div>
                    <div className={`flex-grow`}></div>
                    <div className={`mt-4 w-128`}>
                        <Searchbar className={``} type='text' placeholder='Search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></Searchbar>
                    </div>
                </div>
                
                <div className={`w-full p-12 h-[calc(100vh-200px)] overflow-y-auto`}>
                    <div className={`flex`}>
                        <h1 className={`text-3xl font-semibold ml-2 mb-8`}>Books</h1>
                        <div className={`flex-grow`}></div>
                        <button className={`${colors.button} cursor-pointer p-4 rounded text-xl font-semibold mr-40`} onClick={handleCreateClick}>Create New Book</button>
                    </div>
                    <table className={`shadow-sm ${stylesTable.tableContainer}`}>
                        <thead className={`shadow-sm`}>
                            <th className={`text-xl text-start ${stylesTable.table_cell_g}`}>ID</th>
                            <th className={`text-xl text-start ${stylesTable.table_cell_g}`}>TITLE</th>
                            <th className={`text-xl text-start ${stylesTable.table_cell_g}`}>ISBN</th>
                            <th className={`text-xl text-start ${stylesTable.table_cell_g}`}>AUTHOR ID</th>
                            <th className={`text-xl text-start ${stylesTable.table_cell_g}`}>CATEGORY ID</th>
                            <th className={`text-xl text-start ${stylesTable.table_cell_g}`}>PUBLISH YEAR</th>
                            <th className={`text-xl text-start ${stylesTable.table_cell_g}`}>AVAILABLE COPIES</th>
                            <th className={`text-xl text-start ${stylesTable.table_cell_g}`}>BORROW COUNT</th>
                            <th className={`text-xl text-start ${stylesTable.table_cell_g}`}>COVER URL</th>
                        </thead>

                        <tbody>
                            {
                                books.map((book) => (
                                    <tr key={book.bookId}>
                                        <td className={`${stylesTable.table_cell_g} text-xl text-start`}>{book.bookId}</td>
                                        <td className={`${stylesTable.table_cell_g} text-xl text-start`}>{book.title}</td>
                                        <td className={`${stylesTable.table_cell_g} text-xl text-start`}>{book.isbn}</td>
                                        <td className={`${stylesTable.table_cell_g} text-xl text-start`}>{book.authorId}</td>
                                        <td className={`${stylesTable.table_cell_g} text-xl text-start`}>{book.categoryId}</td>
                                        <td className={`${stylesTable.table_cell_g} text-xl text-start`}>{book.publishYear}</td>
                                        <td className={`${stylesTable.table_cell_g} text-xl text-start`}>{book.availableCopies}</td>
                                        <td className={`${stylesTable.table_cell_g} text-xl text-start`}>{book.borrowCount}</td>
                                        <td className={`${stylesTable.table_cell_g} text-xl text-start`}>{book.coverUrl}</td>
                                        <td className={`${stylesTable.table_cell_g} text-xl text-start`}><button className={`${colors.button} cursor-pointer p-2 rounded`} onClick={(() => handleEditClick(book.bookId))}>Edit</button></td>
                                        <td className={`${stylesTable.table_cell_g} text-xl text-start`}><button className={`${colors.button} cursor-pointer p-2 rounded`} onClick={(() => handleDeleteClick(book.bookId))}>Delete</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <Pagination></Pagination>
                </div>
            </div>
        </div>
    )
}

export default ManageBooks