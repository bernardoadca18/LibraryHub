import React, { useState, useEffect } from 'react';
import { fetchBooks, fetchBooksByCategory, fetchBooksByAuthor, searchBooks } from '../services/BookService.ts';
import { fetchAllCategories } from '../services/CategoryService.ts';
import BookCard from '../components/BookCard.tsx';
import PageTitle from '../components/Home/PageTitle.tsx';

const BookCatalogue = () => {
    return (
        <div>BookCatalogue</div>
    )
}

export default BookCatalogue