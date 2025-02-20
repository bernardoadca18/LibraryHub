import json
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Category, Author, Book

DATABASE_URL = 'postgresql://postgres:02040638@localhost:5432/librarydb'
SAMPLE_COVER_URL= 'https://i.ibb.co/4RMzQK1S/samplebook.png'
engine  = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

def load_data(json_path):
    with open (json_path) as f:
        return json.load(f)

def parse_date(date_str):
    return datetime.strptime(date_str, '%Y-%m-%d').date()

def populate_database(data):
    categories = [{'name':name} for name in data['categories']]
    session.bulk_insert_mappings(Category, categories)
    
    
    authors = []
    
    for author in data['authors']:
        authors.append({
            'name': author['author_name'],
            'birth_date': parse_date(author['author_birthdate'])
        })
    session.bulk_insert_mappings(Author, authors)
    session.commit()
    
    
    books = []
    for book in data['books']:
        books.append({
            'title': book['title'],
            'isbn': book['isbn'],
            'publish_year': book['publish_year'],
            'available_copies': book['available_copies'],
            'cover_url': SAMPLE_COVER_URL,
            'borrow_count': 0,
            'author_id': book['author_id'],
            'category_id': book['category_id']
        })
    session.bulk_insert_mappings(Book, books)
    session.commit()


if __name__ == '__main__':
    data = load_data('data.json')
    populate_database(data)
    print('Data populated successfully')