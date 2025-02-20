import React, { useEffect, useState } from 'react'
import { BorrowDTO, fetchBorrowsByUser, returnBorrow} from '../services/BorrowService.ts'
import { getUsernameFromToken, getUserIdFromToken } from '../services/Auth.ts'
import useAuthStore from '../services/AuthStore.ts'
import { BookData, fetchBookById } from '../services/BookService.ts'
import BookCard from '../components/BookCard.tsx'
import styles from './Profile.module.css'
import { fetchUserByUsername, updateUser } from '../services/UserService.ts'

const Profile = () => {
    const [userBorrows, setUserBorrows] = useState<BorrowDTO[]>([]);
    const [booksData, setBooksData] = useState<BookData[]>([]);
    const { darkTheme } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        email: '',
        username: '',
        role: 'USER'
    });
    const [userData, setUserData] = useState<{ name: string; phone: string } | null>(null);


    const colors = darkTheme ? {
        class: styles.lightTheme,
        class_2: styles.lightTheme2,
        bg_class: styles.bgLight,
        button_class: styles.buttonLight,
        text: "text-black"
    } : {
        class: styles.darkTheme,
        class2: styles.darkTheme2,
        bg_class: styles.bgDark,
        button_class: styles.buttonDark,
        text: "text-white"
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await getUserIdFromToken();
                const userBorrows = await fetchBorrowsByUser(userId);
                setUserBorrows(userBorrows);

                const books = await Promise.all(
                    userBorrows.map((borrow : BorrowDTO) => fetchBookById(borrow.bookId))
                );
                setBooksData(books);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const username = getUsernameFromToken();
            const data = await fetchUserByUsername(username);
            setUserData(data);
            setFormData({
                name: data.name,
                phone: data.phone,
                password: '',
                email: data.email,
                username: username,
                role: 'USER'
            });
        };
        fetchUserData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userId = await getUserIdFromToken();
            await updateUser(userId, formData);
            setUserData({ ...userData!, ...formData });
            setIsEditing(false);
            alert('Dados atualizados com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar:', error);
            alert('Erro ao atualizar dados');
        }
    };

    const getBookForBorrow = (borrow: BorrowDTO) => {
        return booksData.find(book => book.bookId === borrow.bookId);
    };

    const handleReturn = async (borrowId: number) => {
        try {
            await returnBorrow(borrowId);
            const userId = await getUserIdFromToken();
            const updatedBorrows = await fetchBorrowsByUser(userId);
            setUserBorrows(updatedBorrows);
        } catch (err) {
            console.error('Return error:', err);
        }
    };

    return (
        <div className={`mt-16 p-8 flex-grow h-full min-h-[calc(100vh-8rem)] overflow-auto ${colors.bg_class}`}>
            <h1 className='text-3xl font-bold mb-8'>Hello, {getUsernameFromToken()}</h1>

            <div className={``}>
                <h2 className={`text-2xl font-bold mb-6 ${''}`}>Your Borrows</h2>
                <div className={`flex rounded-lg overflow-x-auto gap-24 p-4 ${colors.class2}`}>
                    {
                        userBorrows.length > 0 ? (
                            userBorrows.map((borrow, index) => {
                                const book = getBookForBorrow(borrow);
                                return (
                                    <div key={index} className='flex-shrink-0 w-48'>
                                        <div className={`rounded-lg shadow-sm hover:shadow-md transition-shadow border-2 border-slate-100 p-2 w-64 ${colors.class}`}>
                                            {book && (
                                                <BookCard
                                                    bookId={book.bookId!}
                                                    imageUrl={book.coverUrl}
                                                    title={book.title}
                                                    author={book.authorName!}
                                                    year={book.publishYear}
                                                    category={book.categoryName!}
                                                    availableCopies={book.availableCopies}
                                                    darkTheme={darkTheme}
                                                />
                                            )}
                                            <div className={`mt-2 text-sm font-semibold p-4`}>
                                                <p>Borrow Date: {new Date(borrow.borrowDate).toLocaleDateString()}</p>
                                                <p>Due Date: {new Date(borrow.dueDate).toLocaleDateString()}</p>
                                                <p>Return Date: {borrow.returnDate ? new Date(borrow.returnDate).toLocaleDateString() : 'Pendente'}</p>
                                            </div>
                                            {
                                                !borrow.returnDate && borrow.borrowId && (
                                                    <button onClick={() => handleReturn(borrow.borrowId!)} className={`${colors.button_class} w-[calc(100%)] mt-4 px-6 py-2 rounded-lg transition-colors hover:cursor-pointer self-center`}>Return</button>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        ):(
                            <h2>No borrows yet</h2>
                        )
                    }
                </div>
            </div>



            <div className={`mb-8 p-6 rounded-lg ${colors.class}`}>
            <h2 className={`text-2xl font-bold mb-4 ${colors.text}`}>Meus Dados</h2>
            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className={`block ${colors.text} mb-2`}>Nome Completo</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full p-2 rounded ${colors.class} border`}
                            required
                        />
                    </div>
                    <div>
                        <label className={`block ${colors.text} mb-2`}>Telefone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full p-2 rounded ${colors.class} border`}
                            required
                        />
                    </div>
                    <div>
                        <label className={`block ${colors.text} mb-2`}>Nova Senha (opcional)</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`w-full p-2 rounded ${colors.class} border`}
                        />
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className={`px-4 py-2 rounded ${colors.button_class}`}
                        >
                            Salvar
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className={`px-4 py-2 rounded ${colors.class2}`}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-2">
                    <p className={colors.text}><strong>Nome:</strong> {userData?.name}</p>
                    <p className={colors.text}><strong>Telefone:</strong> {userData?.phone}</p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className={`mt-4 px-4 py-2 rounded ${colors.button_class}`}
                    >
                        Editar Dados
                    </button>
                </div>
            )}
        </div>
        </div>

    )
}

export default Profile