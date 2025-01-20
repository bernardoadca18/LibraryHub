import requests

url = "http://127.0.0.1:8080/api"

# Author Endpoints
# GET Requests
authorId = 1
getAllAuthorsEnpoint = "/authors"
getAuthorByIdEndpoint = "/authors/id/" + str(authorId)
getAuthorBooksEndpoint = "/authors/id/" + str(authorId) + "/books"

# POST / PUT
updatedAuthorId = 13 # Último índice no banco de dados de testes | Last index in the tests db
createAuthorEndpoint = "/authors"
updateAuthorEndpoint = "/authors/id"
authorData = {
    "name": "Bernardo A.",
    "birthDate": "2001-09-02"
}
authorDataUpdate = {
    "name": "Bernardo A. A. C.",
    "birthDate": "2002-09-02"
}
deleteAuthorEndpoint = "/authors/id"
deleteAuthorId = updatedAuthorId
#################################################################################################

# Book Endpoints
# GET
bookId = 1
newBookId = 8
bookSearchString = "the"
bookCategoryId = 1
bookAuthorId = 1
bookData = {
    "title": "Harry Potter and the Deathly Hallows",
    "isbn": "9780545010221",
    "publishYear": 2007,
    "availableCopies": 6,
    "coverUrl": "",
    "authorId": 1,
    "categoryId": 4,
    "authorName": "",
    "categoryName": ""
}
bookUpdateData = {
    "title": "Harry Potter and the Deathly Hallows",
    "isbn": "9780545010221",
    "publishYear": 2007,
    "availableCopies": 16,
    "coverUrl": "",
    "authorId": 1,
    "categoryId": 4,
    "authorName": "",
    "categoryName": ""
}
searchParams = {
    "title": "the"
}

getAllBooksEndpoint = "/books"
searchBooksEndpoint = "/books/search"
getBookByIdEndpoint = "/books/id/" + str(bookId)
getBookByCategoryEndpoint = "/books/category/" + str(bookCategoryId)
getBookByAuthorEndpoint = "/books/author/" + str(bookAuthorId)
getBookBorrowsByIdEndpoint = "/books/id/" + str(bookId) + "/borrows"
getBookStatsEndpoint = "/books/stats"
createNewBookEndpoint = "/books"
updateBookEndpoint = "/books/id"

#################################################################################################
def make_get_request(url, endpoint):
    final_url = url + endpoint
    
    print("Making Request: \nGET ", final_url, "\n")
    
    response = requests.get(final_url, timeout=5)
    
    if response.status_code == 200:
        print("GET Response: ", response.json(), "\nStatus Code: ", response.status_code)
    else:
        print("GET Failed with status code:", response.status_code)
    print("\n\n")
    return response.json();

def make_get_request_with_param(url, endpoint, params):
    final_url = url + endpoint
    
    print("Making Request: \nGET ", final_url, "\n")
    
    response = requests.get(final_url, timeout=5, params=params)
    
    if response.status_code == 200:
        print("GET Response: ", response.json(), "\nStatus Code: ", response.status_code)
    else:
        print("GET Failed with status code:", response.status_code)
    print("\n\n")
    return response.json();

def make_post_request(url, endpoint, data):
    final_url = url + endpoint
    
    print("Making Request: \nPOST ", final_url, '\n Data: ', data, "\n")
    
    response = requests.post(final_url, json=data, timeout=5)
    
    if response.status_code == 201:  # 201 Created
        print("POST Response:", response.json())
    else:
        print("POST Failed with status code:", response.status_code)
        
    print("\n\n")
    return response.json()

def make_put_request(url, endpoint, id, data):
    final_url = url + endpoint + "/" + str(id)
    
    print("Making Request: \nPUT ", final_url, '\n Data: ', data, "\n")
    
    response = requests.put(final_url, json=data, timeout=5)
    
    if response.status_code == 200:
        print("PUT Response:", response.json())
    else:
        print("PUT Failed with status code:", response.status_code)
        
    print("\n\n")
    return response.json()

def make_delete_request(url, endpoint, id):
    final_url = url + endpoint + "/" + str(id)
    
    print("Making Request: \nDELETE ", final_url, "\n")
    
    response = requests.delete(final_url, timeout=5)
    
    if response.status_code == 204:
        print("DELETE Response: Success")
    else:
        print("DELETE Failed with status code:", response.status_code)
    print("\n\n")
    return 0
#################################################################################################

def make_all_author_requests():
    responseArr = []
    print("Making Author Requests\n")
    getAllAuthorsResponse = make_get_request(url=url, endpoint=getAllAuthorsEnpoint)
    getAuthorByIdResponse = make_get_request(url=url, endpoint=getAuthorByIdEndpoint)
    getAuthorBooksResponse = make_get_request(url=url, endpoint=getAuthorBooksEndpoint)
    createAuthorResponse = make_post_request(url=url, endpoint=createAuthorEndpoint, data=authorData)
    updateAuthorResponse = make_put_request(url=url, endpoint=updateAuthorEndpoint, id=updatedAuthorId, data=authorDataUpdate)
    deleteAuthorResponse = make_delete_request(url=url, endpoint=deleteAuthorEndpoint, id=deleteAuthorId)
    
    responseArr.append(getAllAuthorsResponse)
    responseArr.append(getAuthorByIdResponse)
    responseArr.append(getAuthorBooksResponse)
    responseArr.append(createAuthorResponse)
    responseArr.append(updateAuthorResponse)
    responseArr.append(deleteAuthorResponse)
    
    return responseArr

def make_all_book_requests():
    responseArr = []
    print("Making Book Requests\n")
    getAllBooksResponse = make_get_request(url=url, endpoint=getAllBooksEndpoint)
    searchBooksResponse = make_get_request_with_param(url=url, endpoint=searchBooksEndpoint, params=searchParams)
    getBookByIdResponse = make_get_request(url=url, endpoint=getBookByIdEndpoint)
    getBookByCategoryResponse = make_get_request(url=url, endpoint=getBookByCategoryEndpoint)
    getBookByAuthorResponse = make_get_request(url=url, endpoint=getBookByAuthorEndpoint)
    getBookBorrowsByIdResponse = make_get_request(url=url, endpoint=getBookBorrowsByIdEndpoint)
    getBookStatsResponse = make_get_request(url=url, endpoint=getBookStatsEndpoint)
    createNewBookResponse = make_post_request(url=url, endpoint=createNewBookEndpoint, data=bookData)
    updateBookResponse = make_put_request(url=url, endpoint=updateBookEndpoint, id=newBookId, data=bookUpdateData)
    deleteBookResponse = make_delete_request(url=url, endpoint=deleteBookEndpoint, id=newBookId)
    
    responseArr.append(getAllBooksResponse)
    responseArr.append(searchBooksResponse)
    responseArr.append(getBookByIdResponse)
    responseArr.append(getBookByCategoryResponse)
    responseArr.append(getBookByAuthorResponse)
    responseArr.append(getBookBorrowsByIdResponse)
    responseArr.append(getBookStatsResponse)
    responseArr.append(createNewBookResponse)
    responseArr.append(updateBookResponse)
    responseArr.append(deleteBookResponse)
    
    return responseArr

make_all_author_requests()
make_all_book_requests()