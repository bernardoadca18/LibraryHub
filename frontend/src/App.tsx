import './App.css'
import useAuthStore from './services/AuthStore.ts'
import {useEffect} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Home from './pages/Home'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import { removeToken } from './services/Auth.ts'
import BookCatalogue from './pages/BookCatalogue.tsx'
import BookPage from './pages/BookPage.tsx'
import Profile from './pages/Profile.tsx'
import Dashboard from './pages/admin/Dashboard.tsx'
import ManageAuthors from './pages/admin/ManageAuthors.tsx'
import ManageBooks from './pages/admin/ManageBooks.tsx'
import EditAuthorForm from './pages/admin/EditAuthorForm.tsx'
import CreateAuthorForm from './pages/admin/CreateAuthorForm.tsx'
import EditBookForm from './pages/admin/EditBookForm.tsx'
import CreateBookForm from './pages/admin/CreateBookForm.tsx'
import ManageBorrows from './pages/admin/ManageBorrows.tsx'
import EditBorrowForm from './pages/admin/EditBorrowForm.tsx'
import CreateBorrowForm from './pages/admin/CreateBorrowForm.tsx'
import ManageCategories from './pages/admin/ManageCategories.tsx'
import EditCategoryForm from './pages/admin/EditCategoryForm.tsx'
import CreateCategoryForm from './pages/admin/CreateCategoryForm.tsx'


const App = () => {
  
  useEffect(() => {
    const initialize = () => {
      try {
          useAuthStore.getState().initialize();
      } catch {
          removeToken();
          useAuthStore.getState().logout();
      }
  };
    initialize();
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/catalogue" element={<BookCatalogue/>}/>
          <Route path='/book/:bookId' element={<BookPage/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
        </Route>

        <Route path='/admin/dashboard' element={<Dashboard/>}>
          <Route path='author' element={<ManageAuthors/>}/>
          <Route path='author/edit/:authorId' element={<EditAuthorForm/>}/>
          <Route path='author/create' element={<CreateAuthorForm/>}/>
          <Route path='book' element={<ManageBooks/>}/>
          <Route path='book/edit/:bookId' element={<EditBookForm/>}/>
          <Route path='book/create' element={<CreateBookForm/>}/>
          <Route path='borrow' element={<ManageBorrows/>}/>
          <Route path='borrow/edit/:borrowId' element={<EditBorrowForm/>}/>
          <Route path='borrow/create' element={<CreateBorrowForm/>}/>

          <Route path='category' element={<ManageCategories/>}/>
          <Route path='category/edit/:categoryId' element={<EditCategoryForm/>}/>
          <Route path='category/create' element={<CreateCategoryForm/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
