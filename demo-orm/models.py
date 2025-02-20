from datetime import date
from sqlalchemy import create_engine, Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()

class Category(Base):
    __tablename__ = 'categories'
    category_id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)

class Author(Base):
    __tablename__ = 'authors'
    author_id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    birth_date = Column(Date)

class Book(Base):
    __tablename__ = 'books'
    book_id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    isbn = Column(String(13), nullable=False)
    publish_year = Column(Integer, nullable=False)
    available_copies = Column(Integer, nullable=False)
    cover_url = Column(String(255))
    borrow_count = Column(Integer, default=0)
    author_id = Column(Integer, ForeignKey('authors.author_id'))
    category_id = Column(Integer, ForeignKey('categories.category_id'))