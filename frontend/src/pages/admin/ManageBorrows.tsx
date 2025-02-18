import { useEffect, useState } from 'react'
import useAuthStore from '../../services/AuthStore'
import { getUsernameFromToken } from '../../services/Auth'
import styles from './ManageAuthors.module.css'
import Searchbar from '../../components/Searchbar'
import stylesTable from './TableStyles.module.css'
import { useNavigate } from 'react-router-dom'
import { BorrowDTO, deleteBorrow, fetchAllBorrows } from '../../services/BorrowService'

const ManageBorrows = () => {
    const { darkTheme } = useAuthStore()
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const pageSize = 20

    const [borrows, setBorrows] = useState<BorrowDTO[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchFilteredBorrows = async () => {
            try {
                const response = await fetchAllBorrows(currentPage, pageSize)
                
                if (!response?.content) {
                    console.error('Resposta inválida da API:', response)
                    return
                }
                
                setBorrows(response.content)
                setTotalPages(response.totalPages)
            } catch (error) {
                console.error('Error fetching borrows:', error)
            }
        }
        const timeoutId = setTimeout(fetchFilteredBorrows, 300)
        return () => clearTimeout(timeoutId)
    }, [searchQuery, currentPage, pageSize])

    const Pagination = () => (
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
    )

    const handleEditClick = (id: number | undefined) => {
        navigate(`/admin/dashboard/borrow/edit/${id}`)
    }

    const handleDeleteClick = async (id: number | undefined) => {
        await deleteBorrow(Number(id))
        const response = await fetchAllBorrows(currentPage, pageSize)
        setBorrows(response.content)
        setTotalPages(response.totalPages)
    }

    const handleCreateClick = () => {
        navigate(`/admin/dashboard/borrow/create`)
    }

    const colors = darkTheme ? {
        button: styles.buttonLight,
        buttonActive: styles.buttonActiveLight,
        background_1: styles.lightBackground1,
        text: 'text-black',
        buttonText: 'text-white'
    } : {
        button: styles.buttonDark,
        buttonActive: styles.buttonActive,
        background_1: styles.darkBackground1,
        text: 'text-white',
        buttonText: 'text-black'
    }

    return (
        <div className="w-full h-full">
            <div className="w-full h-32 shadow-sm">
                <div className={`w-full h-full ${colors.background_1} p-8 flex items-center`}>
                    <div>
                        <h1 className={`text-2xl font-semibold`}>Welcome, {getUsernameFromToken()}</h1>
                        <h3 className="text-gray-400">Manage borrow records</h3>
                    </div>
                    <div className="flex-grow"></div>
                    <div className="mt-4 w-128">
                        <Searchbar 
                            type="text" 
                            className=''
                            placeholder="Search" 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)
                            }
                        />
                    </div>
                </div>
                
                <div className="w-full p-12 h-[calc(100vh-200px)] overflow-y-auto">
                    <div className="flex">
                        <h1 className="text-3xl font-semibold ml-2 mb-8">Borrows</h1>
                        <div className="flex-grow"></div>
                        <button 
                            className={`${colors.button} cursor-pointer p-4 rounded text-xl font-semibold mr-40`} 
                            onClick={handleCreateClick}
                        >
                            Create New Borrow
                        </button>
                    </div>
                    <table className={`shadow-sm ${stylesTable.tableContainer}`}>
                        <thead className="shadow-sm">
                            <tr>
                                <th className={`text-xl text-start ${stylesTable.table_cell_g}`}>ID</th>
                                <th className={`text-xl text-start ${stylesTable.table_cell_g}`}>User</th>
                                <th className={`text-xl text-start ${stylesTable.table_cell_g}`}>Book</th>
                                <th className={`text-xl text-start ${stylesTable.table_cell_g}`}>Borrow Date</th>
                                <th className={`text-xl text-start ${stylesTable.table_cell_g}`}>Due Date</th>
                                <th className={`text-xl text-start ${stylesTable.table_cell_g}`}>Return Date</th>
                                <th className={`text-xl text-start ${stylesTable.table_cell_g}`}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {borrows.map((borrow) => (
                                <tr key={borrow.borrowId}>
                                    <td className={`${stylesTable.table_cell_g} text-xl text-start`}>{borrow.borrowId}</td>
                                    <td className={`${stylesTable.table_cell_g} text-xl text-start`}>{borrow.userId}</td>
                                    <td className={`${stylesTable.table_cell_g} text-xl text-start`}>{borrow.bookId}</td>
                                    <td className={`${stylesTable.table_cell_g} text-xl text-start`}>
                                        {new Date(borrow.borrowDate).toLocaleDateString()}
                                    </td>
                                    <td className={`${stylesTable.table_cell_g} text-xl text-start`}>
                                        {new Date(borrow.dueDate).toLocaleDateString()}
                                    </td>
                                    <td className={`${stylesTable.table_cell_g} text-xl text-start`}>
                                        {borrow.returnDate ? new Date(borrow.returnDate).toLocaleDateString() : 'Pending'}
                                    </td>
                                    <td className={`${stylesTable.table_cell_g} text-xl text-start`}>
                                        <button 
                                            className={`${colors.button} cursor-pointer p-2 rounded`} 
                                            onClick={() => handleEditClick(borrow.borrowId)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className={`${colors.button} cursor-pointer p-2 rounded ml-2`} 
                                            onClick={() => handleDeleteClick(borrow.borrowId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination />
                </div>
            </div>
        </div>
    )
}

export default ManageBorrows