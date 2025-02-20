import { useEffect, useState } from 'react'
import useAuthStore from '../../services/AuthStore';
import { getUsernameFromToken } from '../../services/Auth';
import styles from './ManageAuthors.module.css'
import Searchbar from '../../components/Searchbar';
import { AuthorDTO, deleteAuthor, searchAuthors } from '../../services/AuthorService';
import stylesTable from './TableStyles.module.css'
import { useNavigate } from 'react-router-dom';

const ManageAuthors = () => {
    const { darkTheme } = useAuthStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 20;

    const [authors, setAuthors] = useState<AuthorDTO[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchFilteredAuthors = async () => {
            try {
                const response = await searchAuthors(searchQuery, currentPage, pageSize);
                
                if (!response || !response.content) {
                    console.error('Resposta inválida da API:', response);
                    return;
                }
                
                setAuthors(response.content);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error('Error fetching filtered books:', error);
            }
        };
        const timeoutId = setTimeout(fetchFilteredAuthors, 300);
        return () => clearTimeout(timeoutId);
    }, [searchQuery, currentPage, pageSize]);


    const Pagination = () => {
        const maxButtons = 5; // Número máximo de botões de página a serem exibidos
        const startPage = Math.max(0, currentPage - Math.floor(maxButtons / 2));
        const endPage = Math.min(totalPages - 1, startPage + maxButtons - 1);
            return (
            <div className="flex justify-center mt-8">
                <button 
                onClick={() => setCurrentPage(0)} 
                disabled={currentPage === 0} 
                className={`px-4 py-2 mx-1 border rounded disabled:opacity-50 ${colors.button}`}
                >
                Start
                </button>
                <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))} 
                disabled={currentPage === 0} 
                className={`px-4 py-2 mx-1 border rounded disabled:opacity-50 ${colors.button}`}
                >
                Previous
                </button>
                
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                const page = startPage + i;
                return (
                    <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 mx-1 border rounded ${
                        currentPage === page ? colors.buttonActive : colors.button
                    } ${colors.buttonText}`}
                    >
                    {page + 1}
                    </button>
                );
                })}
                
                <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))} 
                disabled={currentPage === totalPages - 1} 
                className={`px-4 py-2 mx-1 border rounded disabled:opacity-50 ${colors.button}`}
                >
                Next
                </button>
                <button 
                onClick={() => setCurrentPage(totalPages - 1)} 
                disabled={currentPage === totalPages - 1} 
                className={`px-4 py-2 mx-1 border rounded disabled:opacity-50 ${colors.button}`}
                >
                End
                </button>
            </div>
            );
        };
    
    const handleEditClick = (id: number | undefined) => {
        navigate(`/admin/dashboard/author/edit/${id}`);
    }

    const handleDeleteClick = async (id: number | undefined) => {
        await deleteAuthor(Number(id));
        const response = await searchAuthors(searchQuery, currentPage, pageSize);
        setAuthors(response.content);
        setTotalPages(response.totalPages);
    }

    const handleCreateClick = () => {
        navigate(`/admin/dashboard/author/create`);
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
                        <h3 className={`text-gray-400`}>Monitor and edit the authors from here.</h3>
                    </div>
                    <div className={`flex-grow`}></div>
                    <div className={`mt-4 w-128`}>
                        <Searchbar className={``} type='text' placeholder='Search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></Searchbar>
                    </div>
                </div>
                
                <div className={`w-full p-12 h-[calc(100vh-200px)] overflow-y-auto`}>
                    <div className={`flex`}>
                        <h1 className={`text-3xl font-semibold ml-2 mb-8`}>Authors</h1>
                        <div className={`flex-grow`}></div>
                        <button className={`${colors.button} cursor-pointer p-4 rounded text-xl font-semibold mr-40`} onClick={handleCreateClick}>Create New Author</button>
                    </div>
                    <table className={`shadow-sm ${stylesTable.tableContainer}`}>
                        <thead className={`shadow-sm`}>
                            <th className={`text-2xl text-start ${stylesTable.table_cell_g}`}>ID</th>
                            <th className={`text-2xl text-start ${stylesTable.table_cell_g}`}>BIRTH DATE</th>
                            <th className={`text-2xl text-start ${stylesTable.table_cell_g}`}>NAME</th>
                        </thead>

                        <tbody>
                            {
                                authors.map((author) => (
                                    <tr key={author.authorId}>
                                        <td className={`${stylesTable.table_cell_g} text-xl text-start`}>{author.authorId}</td>
                                        <td className={`${stylesTable.table_cell_g} text-xl text-start`}>{author.birthDate}</td>
                                        <td className={`${stylesTable.table_cell_g} text-xl text-start`}>{author.name}</td>
                                        <td className={`${stylesTable.table_cell_g} text-xl text-start`}><button className={`${colors.button} cursor-pointer p-2 rounded`} onClick={(() => handleEditClick(author.authorId))}>Edit</button></td>
                                        <td className={`${stylesTable.table_cell_g} text-xl text-start`}><button className={`${colors.button} cursor-pointer p-2 rounded`} onClick={(() => handleDeleteClick(author.authorId))}>Delete</button></td>
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

export default ManageAuthors