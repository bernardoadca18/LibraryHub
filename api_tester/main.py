import requests

url = "http://127.0.0.1:8080/api"

# Author Endpoints
# GET Requests
authorId = 1
getAllAuthorsEnpoint = "/authors"
getAuthorByIdEndpoint = "/authors/id/" + str(authorId)
getAuthorBooksEndpoint = "/authors/id/" + str(authorId) + "/books"

# POST / PUT
# Último índice no banco de dados de testes | Last index in the tests db
updatedAuthorId = 13
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
deleteBookEndpoint = "/books/id"
#################################################################################################

# Category Endpoints

categoryId = 1
newCategoryId = 13
getAllCategoriesEndpoint = "/categories"
getCategoryByIdEndpoint = "/categories/id/" + str(categoryId)
getCategoryBooksEndpoint = "/categories/id/" + str(categoryId) + "/books"
createCategoryEndpoint = "/categories"
updateCategoryEndpoint = "/categories/id"
deleteCategoryEndpoint = "/categories/id"


categoryData = {
    "name": "New Category"
}

categoryDataUpdate = {
    "name": "Updated Category"
}

#################################################################################################

# User Endpoints

userId = 1
newUserId = 6
getAllUsersEndpoint = "/users"
getUserByIdEndpoint = "/users/id/" + str(userId)
getUserByNameEndpoint = "/users/name/John Doe"
getUserByEmailEndpoint = "/users/email/john.doe@example.com"
getUserBorrowsEndpoint = "/users/id/" + str(userId) + "/borrows"
createUserEndpoint = "/users"
updateUserEndpoint = "/users/id"
deleteUserEndpoint = "/users/id"

userData = {
    "name": "New User",
    "email": "new.user@example.com",
    "phone": "555-0000"
}

userDataUpdate = {
    "name": "Updated User",
    "email": "updated.user@example.com",
    "phone": "555-1111"
}


# Borrow Endpoints

borrowId = 1
newBorrowId = 9
getAllBorrowsEndpoint = "/borrows"
getBorrowByIdEndpoint = "/borrows/id/" + str(borrowId)
getBorrowsByUserEndpoint = "/borrows/user/" + str(userId)
getBorrowsByBookEndpoint = "/borrows/book/" + str(bookId)
getActiveBorrowsEndpoint = "/borrows/active"
getActiveUserBorrowsEndpoint = "/borrows/user/" + str(userId) + "/active"
getOverdueBorrowsEndpoint = "/borrows/overdue"
getUserBorrowCountEndpoint = "/borrows/user/" + str(userId) + "/count"
getBorrowStatsEndpoint = "/borrows/statistics"
getLateReturnsEndpoint = "/borrows/late-returns"
createBorrowEndpoint = "/borrows"
extendBorrowEndpoint = "/borrows/extend"
updateBorrowEndpoint = "/borrows/id"
deleteBorrowEndpoint = "/borrows/id"

borrowData = {

    "userId": 1,
    "bookId": 1,
    "borrowDate": "2024-01-20",
    "dueDate": "2024-02-03"
}

borrowDataUpdate = {
    "userId": 1,
    "bookId": 1,
    "borrowDate": "2024-01-20",
    "dueDate": "2024-02-10",
    "returnDate": "2024-02-01"

}

extendBorrowParams = {
    "borrowId": 1,
    "additionalDays": 7
}

#################################################################################################


def make_get_request(url, endpoint):
    final_url = url + endpoint

    print("Making Request: \nGET ", final_url, "\n")

    response = requests.get(final_url, timeout=5)

    if response.status_code == 200:
        print("GET Response: ", response.json(),
              "\nStatus Code: ", response.status_code)
    else:
        print("GET Failed with status code:", response.status_code)
    print("\n\n")
    return response.json()


def make_get_request_with_param(url, endpoint, params):
    final_url = url + endpoint

    print("Making Request: \nGET ", final_url, "\n")

    response = requests.get(final_url, timeout=5, params=params)

    if response.status_code == 200:
        print("GET Response: ", response.json(),
              "\nStatus Code: ", response.status_code)
    else:
        print("GET Failed with status code:", response.status_code)
    print("\n\n")
    return response.json()


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

def make_post_request_with_params(url, endpoint, params):
    final_url = url + endpoint

    print("Making Request: \nPOST ", final_url, '\n Params: ', params, "\n")

    response = requests.post(final_url, params=params, timeout=5)

    if response.status_code == 200:
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
    getAllAuthorsResponse = make_get_request(
        url=url, endpoint=getAllAuthorsEnpoint)
    getAuthorByIdResponse = make_get_request(
        url=url, endpoint=getAuthorByIdEndpoint)
    getAuthorBooksResponse = make_get_request(
        url=url, endpoint=getAuthorBooksEndpoint)
    createAuthorResponse = make_post_request(
        url=url, endpoint=createAuthorEndpoint, data=authorData)
    updateAuthorResponse = make_put_request(
        url=url, endpoint=updateAuthorEndpoint, id=updatedAuthorId, data=authorDataUpdate)
    deleteAuthorResponse = make_delete_request(
        url=url, endpoint=deleteAuthorEndpoint, id=deleteAuthorId)

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
    getAllBooksResponse = make_get_request(
        url=url, endpoint=getAllBooksEndpoint)
    searchBooksResponse = make_get_request_with_param(
        url=url, endpoint=searchBooksEndpoint, params=searchParams)
    getBookByIdResponse = make_get_request(
        url=url, endpoint=getBookByIdEndpoint)
    getBookByCategoryResponse = make_get_request(
        url=url, endpoint=getBookByCategoryEndpoint)
    getBookByAuthorResponse = make_get_request(
        url=url, endpoint=getBookByAuthorEndpoint)
    getBookBorrowsByIdResponse = make_get_request(
        url=url, endpoint=getBookBorrowsByIdEndpoint)
    getBookStatsResponse = make_get_request(
        url=url, endpoint=getBookStatsEndpoint)
    createNewBookResponse = make_post_request(
        url=url, endpoint=createNewBookEndpoint, data=bookData)
    updateBookResponse = make_put_request(
        url=url, endpoint=updateBookEndpoint, id=newBookId, data=bookUpdateData)
    deleteBookResponse = make_delete_request(
        url=url, endpoint=deleteBookEndpoint, id=newBookId)

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


def make_all_category_requests():

    responseArr = []

    print("Making Category Requests\n")

    getAllCategoriesResponse = make_get_request(
        url=url, endpoint=getAllCategoriesEndpoint)

    getCategoryByIdResponse = make_get_request(
        url=url, endpoint=getCategoryByIdEndpoint)

    getCategoryBooksResponse = make_get_request(
        url=url, endpoint=getCategoryBooksEndpoint)

    createCategoryResponse = make_post_request(
        url=url, endpoint=createCategoryEndpoint, data=categoryData)

    updateCategoryResponse = make_put_request(
        url=url, endpoint=updateCategoryEndpoint, id=newCategoryId, data=categoryDataUpdate)

    deleteCategoryResponse = make_delete_request(
        url=url, endpoint=deleteCategoryEndpoint, id=newCategoryId)

    responseArr.extend([getAllCategoriesResponse, getCategoryByIdResponse, getCategoryBooksResponse, createCategoryResponse, updateCategoryResponse, deleteCategoryResponse])

    return responseArr


def make_all_user_requests():

    responseArr = []

    print("Making User Requests\n")

    getAllUsersResponse = make_get_request(
        url=url, endpoint=getAllUsersEndpoint)

    getUserByIdResponse = make_get_request(
        url=url, endpoint=getUserByIdEndpoint)

    getUserByNameResponse = make_get_request(
        url=url, endpoint=getUserByNameEndpoint)

    getUserByEmailResponse = make_get_request(
        url=url, endpoint=getUserByEmailEndpoint)

    getUserBorrowsResponse = make_get_request(
        url=url, endpoint=getUserBorrowsEndpoint)

    createUserResponse = make_post_request(
        url=url, endpoint=createUserEndpoint, data=userData)

    updateUserResponse = make_put_request(
        url=url, endpoint=updateUserEndpoint, id=newUserId, data=userDataUpdate)

    deleteUserResponse = make_delete_request(
        url=url, endpoint=deleteUserEndpoint, id=newUserId)

    responseArr.extend([getAllUsersResponse, getUserByIdResponse, getUserByNameResponse, getUserByEmailResponse, getUserBorrowsResponse, createUserResponse, updateUserResponse, deleteUserResponse])

    return responseArr


def make_all_borrow_requests():

    responseArr = []

    print("Making Borrow Requests\n")

    getAllBorrowsResponse = make_get_request(
        url=url, endpoint=getAllBorrowsEndpoint)

    getBorrowByIdResponse = make_get_request(
        url=url, endpoint=getBorrowByIdEndpoint)

    getBorrowsByUserResponse = make_get_request(
        url=url, endpoint=getBorrowsByUserEndpoint)

    getBorrowsByBookResponse = make_get_request(
        url=url, endpoint=getBorrowsByBookEndpoint)

    getActiveBorrowsResponse = make_get_request(
        url=url, endpoint=getActiveBorrowsEndpoint)

    getActiveUserBorrowsResponse = make_get_request(
        url=url, endpoint=getActiveUserBorrowsEndpoint)

    getOverdueBorrowsResponse = make_get_request(
        url=url, endpoint=getOverdueBorrowsEndpoint)

    getUserBorrowCountResponse = make_get_request(
        url=url, endpoint=getUserBorrowCountEndpoint)

    getBorrowStatsResponse = make_get_request(
        url=url, endpoint=getBorrowStatsEndpoint)

    getLateReturnsResponse = make_get_request(
        url=url, endpoint=getLateReturnsEndpoint)

    createBorrowResponse = make_post_request(
        url=url, endpoint=createBorrowEndpoint, data=borrowData)

    extendBorrowResponse = make_post_request_with_params(url=url, endpoint=extendBorrowEndpoint, params=extendBorrowParams)

    updateBorrowResponse = make_put_request(
        url=url, endpoint=updateBorrowEndpoint, id=newBorrowId, data=borrowDataUpdate)

    deleteBorrowResponse = make_delete_request(
        url=url, endpoint=deleteBorrowEndpoint, id=newBorrowId)

    responseArr.extend([getAllBorrowsResponse, getBorrowByIdResponse, getBorrowsByUserResponse, getBorrowsByBookResponse, getActiveBorrowsResponse, getActiveUserBorrowsResponse,getOverdueBorrowsResponse, getUserBorrowCountResponse, getBorrowStatsResponse,getLateReturnsResponse, createBorrowResponse, extendBorrowResponse,updateBorrowResponse, deleteBorrowResponse])

    return responseArr

make_all_author_requests()
make_all_book_requests()
make_all_category_requests()
make_all_user_requests()
make_all_borrow_requests()