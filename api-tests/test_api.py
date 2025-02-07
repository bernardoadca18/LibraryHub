import requests
import os
from requests.exceptions import JSONDecodeError

import requests
#######################################################################################################################################

URL = 'http://127.0.0.1:8080/api'

#######################################################################################################################################
class Auth:
    def __init__(self, base_url, username, password):
        self.base_url = base_url
        self.token = None
        self.username = username
        self.password = password

    def authenticate(self):
        login_data = {
            "username": f"{self.username}",
            "password": f"{self.password}"
        }
        
        headers = {"Content-Type": "application/json"}
        
        try:
            response = requests.post(f"{self.base_url}/auth/login", json=login_data, headers=headers)
            response.raise_for_status()
            self.token = response.json().get("token")
            return self.token
        except requests.exceptions.RequestException as e:
            print(f"Error during authentication: {e}")
            return None
        
    def get_headers(self):
        if not self.token:
            self.authenticate()
        return {"Content-Type": "application/json", "Authorization": f"Bearer {self.token}"}
#######################################################################################################################################
TEST_USERNAME = os.getenv("TEST_USERNAME")
TEST_PASSWORD = os.getenv("TEST_PASSWORD")
testAuth = Auth(base_url=URL, username=TEST_USERNAME, password=TEST_PASSWORD)
headers = testAuth.get_headers()

#######################################################################################################################################

class HttpRequest:
    def __init__(self, base_url, headers):
        self.base_url = base_url
        self.headers = headers

    def make_get_request(self, endpoint, params=None):
        final_url = self.base_url + endpoint

        if params:
            print("Making Request: \nGET ", final_url, "\nParams: ", params, "\n")
        else:
            print("Making Request: \nGET ", final_url, "\n")

        response = requests.get(final_url, timeout=5, params=params, headers=self.headers)

        if response.status_code == 200:
            print("GET Response: ", response.json(), "\nStatus Code: ", response.status_code)
        else:
            print("GET Failed with status code:", response.status_code)
        print("\n\n")
        return response

    def make_post_request(self, endpoint, data=None, params=None):
        final_url = self.base_url + endpoint

        if params:
            print("Making Request: \nPOST ", final_url, '\nParams: ', params, '\nData: ', data, "\n")
            response = requests.post(final_url, params=params, json=data, timeout=5, headers=self.headers)
        else:
            print("Making Request: \nPOST ", final_url, '\nData: ', data, "\n")
            response = requests.post(final_url, json=data, timeout=5, headers=self.headers)

        if response.status_code in [200, 201]:
            try:
                json_data = response.json()
                if (json_data):
                    print("POST Response:", response.json())
                else:
                    print("POST Response: Success")
            except JSONDecodeError:
                print("POST Response: Failed to parse JSON")
        else:
            print("POST Failed with status code:", response.status_code)

        print("\n\n")
        return response

    def make_put_request(self, endpoint, id, data):
        final_url = self.base_url + endpoint + "/" + str(id)

        print("Making Request: \nPUT ", final_url, '\n Data: ', data, "\n")

        response = requests.put(final_url, json=data, timeout=5, headers=self.headers)

        if response.status_code == 200:
            print("PUT Response:", response.json())
        else:
            print("PUT Failed with status code:", response.status_code)

        print("\n\n")
        return response

    def make_delete_request(self, endpoint, id):
        final_url = self.base_url + endpoint + "/" + str(id)

        print("Making Request: \nDELETE ", final_url, "\n")

        response = requests.delete(final_url, timeout=5, headers=self.headers)

        if response.status_code == 204:
            print("DELETE Response: Success")
        else:
            print("DELETE Failed with status code:", response.status_code)
        print("\n\n")
        return response

#######################################################################################################################################
httpRequest = HttpRequest(URL, headers=headers)
#######################################################################################################################################
#   AUTHORS
#######################################################################################################################################

AUTHOR_ENDPOINT = '/authors'


def test_can_call_author_endpoint(httpRequest=httpRequest, ENDPOINT=AUTHOR_ENDPOINT):
    #Test
    response = httpRequest.make_get_request(ENDPOINT)
    assert response.status_code == 200
    pass

def test_can_get_author_by_id_task(httpRequest=httpRequest, ENDPOINT=AUTHOR_ENDPOINT):
    created_ids = []
    
    try:
        # CREATE
        payload = {
        "name": "Sample Author",
        "birthDate": "2000-01-01"
        }

        response_post = httpRequest.make_post_request(ENDPOINT, payload)

        post_data = response_post.json()
        
        created_ids.append(post_data['authorId'])

        # READ
        new_id = post_data['authorId']

        response_get = httpRequest.make_get_request(ENDPOINT + '/id/' + str(new_id))

        data_get = response_get.json()

        assert data_get["name"] == payload["name"]
        assert data_get["birthDate"] == payload["birthDate"]
        assert response_get.status_code == 200
    finally:
        for _id in created_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
    pass


def test_can_create_author_task(httpRequest=httpRequest, ENDPOINT=AUTHOR_ENDPOINT):
    created_ids = []
    
    try:
        #CREATE
        payload = {
        "name": "Sample Author 2",
        "birthDate": "2000-01-02"
        }

        response_post = httpRequest.make_post_request(ENDPOINT, payload)
        post_data = response_post.json()
        new_id = post_data['authorId']
        
        created_ids.append(new_id)

        #READ AND VALIDATE
        response_get = httpRequest.make_get_request(ENDPOINT + '/id/' + str(new_id))
        data_get = response_get.json()

        assert data_get["name"] == payload["name"]
        assert data_get["birthDate"] == payload["birthDate"]
        assert response_get.status_code == 200
    finally:
        for _id in created_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
    pass

def test_can_update_author_task(httpRequest=httpRequest, ENDPOINT=AUTHOR_ENDPOINT):
    created_ids = []
    try:
        #CREATE
        create_payload = {
        "name": "Sample Author 3",
        "birthDate": "2000-01-03"
        }
        create_response = httpRequest.make_post_request(ENDPOINT, create_payload)
        create_data = create_response.json()
        create_id = create_data["authorId"]
        
        created_ids.append(create_id)

        #UPDATE
        update_payload = {
            "name": "Sample Author 3 Updated",
            "birthDate": "2000-02-03"
        }
        update_response= httpRequest.make_put_request(ENDPOINT + '/id', create_id, update_payload)
        update_data = update_response.json()

        #READ AND VALIDATE
        get_response = httpRequest.make_get_request(ENDPOINT + '/id/' + str(create_id))
        get_data = get_response.json()

        assert create_response.status_code == 200 or create_response.status_code == 201
        assert update_response.status_code == 200 or update_response.status_code == 201
        assert get_response.status_code == 200 or get_response.status_code == 201
        assert get_data["name"] == update_payload["name"]
        assert get_data["birthDate"] == update_payload["birthDate"]
    finally:
        for _id in created_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
    pass
    
def test_can_list_authors(httpRequest=httpRequest, ENDPOINT=AUTHOR_ENDPOINT):
    created_ids = []
    try:
        # Create N authors
        n = 4
        max_n = httpRequest.make_get_request(ENDPOINT + '/count').json() + n

        for i in range(n):
            payload = {
                "name": f"Sample List Author {max_n + i}" ,
                "birthDate": "2011-06-01"
            }
            create_response = httpRequest.make_post_request(ENDPOINT, payload)
            create_data = create_response.json()
            created_ids.append(create_data['authorId'])
            assert create_response.status_code == 200 or create_response.status_code == 201

        # List task and make sure the count == n + (number of existing elements)
        list_response = httpRequest.make_get_request(ENDPOINT)
        list_data = list_response.json()
        assert list_response.status_code == 200
        assert len(list_data) == max_n
    finally:
        for _id in created_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
    pass

def test_can_delete_author_task(httpRequest=httpRequest, ENDPOINT=AUTHOR_ENDPOINT):
    #Create author
    payload = {
        "name": "Sample Author 4",
        "birthDate": "2000-02-03"
    }
    create_response = httpRequest.make_post_request(endpoint=ENDPOINT, data=payload)
    create_data = create_response.json()
    create_id = create_data["authorId"]
    
    assert create_response.status_code == 200 or create_response.status_code == 201
    
    #Delete
    delete_response = httpRequest.make_delete_request(endpoint=ENDPOINT+'/id', id=create_id)
    assert delete_response.status_code == 204
    
    #Get
    get_response = httpRequest.make_get_request(endpoint=ENDPOINT+'/id/'+ str(create_id))
    assert get_response.status_code != 200
    
    pass

def test_can_get_author_books(httpRequest=httpRequest, ENDPOINT=AUTHOR_ENDPOINT):
    created_ids = []
    created_category_ids = []
    created_book_ids = []
    try:
        #Create author
        author_payload = {
            "name": "Sample Author 5",
            "birthDate": "2000-02-03"
        }
        create_author_response = httpRequest.make_post_request(ENDPOINT, author_payload)
        create_author_data = create_author_response.json()
        create_author_id = create_author_data["authorId"]
        
        created_ids.append(create_author_id)

        assert create_author_response.status_code == 200 or create_author_response.status_code == 201

        assert create_author_data["name"] == author_payload["name"]
        assert create_author_data["birthDate"] == author_payload["birthDate"]
        
        #Create category
        category_payload = {
            "name": "Sample Category 1"
        }
        create_category_response = httpRequest.make_post_request(endpoint="/categories", data=category_payload)
        create_category_data = create_category_response.json()
        create_category_id = create_category_data["categoryId"]
        
        created_category_ids.append(create_category_id)
        
        assert create_category_response.status_code == 200 or create_category_response.status_code == 201
        
        assert create_category_data["name"] == category_payload["name"]

        #Create books

        n = 15 # number of books from the author

        for i in range(n):
            book_payload = {
                f"title": "The Sample Book " + str(i),
                f"isbn": str(9900000000001 + i),
                "publishYear": 2010+i,
                "availableCopies": 3000 + 2*i,
                "coverUrl": "urlSample",
                "authorId": create_author_id,
                "categoryId": create_category_id,
                "authorName": "",
                "categoryName": ""
            }
            create_book_response = httpRequest.make_post_request(endpoint="/books", data=book_payload)
            create_book_data = create_book_response.json()
            
            created_book_ids.append(create_book_data["bookId"])

            assert create_book_response.status_code == 200 or create_book_response.status_code == 201

            assert create_book_data["title"] == book_payload["title"]
            assert create_book_data["isbn"] == book_payload["isbn"]
            assert create_book_data["publishYear"] == book_payload["publishYear"]
            assert create_book_data["availableCopies"] == book_payload["availableCopies"]
            assert create_book_data["coverUrl"] == book_payload["coverUrl"]
            assert create_book_data["authorId"] == book_payload["authorId"]
            assert create_book_data["categoryId"] == book_payload["categoryId"]

            assert create_author_data["authorId"] == create_book_data["authorId"]

        #Get Author Books
        get_author_books_response = httpRequest.make_get_request(endpoint=ENDPOINT+"/id/"+str(create_author_id)+"/books")
        get_author_books_data = get_author_books_response.json()
        assert get_author_books_response.status_code == 200
        assert len(get_author_books_data) == n
    finally:
        for _id in created_book_ids:
            response = httpRequest.make_delete_request('/books/id', _id)
            assert response.status_code == 204
        for _id in created_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
        for _id in created_category_ids:
            response = httpRequest.make_delete_request("/categories" + '/id', _id)
            assert response.status_code == 204
    pass
#######################################################################################################################################
#   BOOKS
#######################################################################################################################################

BOOK_ENDPOINT = '/books'

def test_can_call_book_endpoint(httpRequest=httpRequest, ENDPOINT=BOOK_ENDPOINT):
    #Test
    print("TEST: CAN CALL ENDPOINT\n")
    response = httpRequest.make_get_request(ENDPOINT)
    assert response.status_code == 200
    pass

def test_can_get_book_by_id_task(httpRequest=httpRequest, ENDPOINT=BOOK_ENDPOINT):
    created_ids = []
    created_author_ids = []
    created_category_ids = []
    try:
        #Create author
        author_payload = {
            "name": "Sample Author 5",
            "birthDate": "2000-02-03"
        }
        create_author_response = httpRequest.make_post_request("/authors", author_payload)
        create_author_data = create_author_response.json()
        create_author_id = create_author_data["authorId"]
        
        created_author_ids.append(create_author_id)

        assert create_author_response.status_code == 200 or create_author_response.status_code == 201

        assert create_author_data["name"] == author_payload["name"]
        assert create_author_data["birthDate"] == author_payload["birthDate"]
        
        #Create category
        category_payload = {
            "name": "Sample Category 1"
        }
        create_category_response = httpRequest.make_post_request(endpoint="/categories", data=category_payload)
        create_category_data = create_category_response.json()
        create_category_id = create_category_data["categoryId"]
        
        created_category_ids.append(create_category_id)
        
        assert create_category_response.status_code == 200 or create_category_response.status_code == 201
        
        assert create_category_data["name"] == category_payload["name"]
        
        # CREATE BOOK
        payload = {
            "title": "Sample Book",
            "isbn": "9910000000001",
            "publishYear": 2014,
            "availableCopies": 4522,
            "coverUrl": "urlSample",
            "authorId": create_author_id,
            "categoryId": create_category_id,
            "authorName": "",
            "categoryName": ""
        }

        response_post = httpRequest.make_post_request(ENDPOINT, payload)
        post_data = response_post.json()

        # READ
        new_id = post_data['bookId']
        created_ids.append(new_id)

        response_get = httpRequest.make_get_request(ENDPOINT + '/id/' + str(new_id))

        data_get = response_get.json()

        assert data_get["title"] == payload["title"]
        assert data_get["isbn"] == payload["isbn"]
        assert data_get["publishYear"] == payload["publishYear"]
        assert data_get["availableCopies"] == payload["availableCopies"]
        assert data_get["coverUrl"] == payload["coverUrl"]
        assert data_get["authorId"] == payload["authorId"]
        assert data_get["categoryId"] == payload["categoryId"]

        assert response_get.status_code == 200
    finally:
        for _id in created_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
        for _id in created_author_ids:
            response = httpRequest.make_delete_request("/authors" + '/id', _id)
            assert response.status_code == 204
        for _id in created_category_ids:
            response = httpRequest.make_delete_request("/categories" + '/id', _id)
            assert response.status_code == 204
    pass

def test_can_create_book_task(httpRequest=httpRequest, ENDPOINT=BOOK_ENDPOINT):
    created_ids = []
    created_author_ids = []
    created_category_ids = []
    
    try:
        #Create author
        author_payload = {
            "name": "Sample Author 5",
            "birthDate": "2000-02-03"
        }
        create_author_response = httpRequest.make_post_request("/authors", author_payload)
        create_author_data = create_author_response.json()
        create_author_id = create_author_data["authorId"]
        
        created_author_ids.append(create_author_id)

        assert create_author_response.status_code == 200 or create_author_response.status_code == 201

        assert create_author_data["name"] == author_payload["name"]
        assert create_author_data["birthDate"] == author_payload["birthDate"]
        
        #Create category
        category_payload = {
            "name": "Sample Category 1"
        }
        create_category_response = httpRequest.make_post_request(endpoint="/categories", data=category_payload)
        create_category_data = create_category_response.json()
        create_category_id = create_category_data["categoryId"]
        
        created_category_ids.append(create_category_id)
        
        assert create_category_response.status_code == 200 or create_category_response.status_code == 201
        
        assert create_category_data["name"] == category_payload["name"]
        
        #CREATE
        payload = {
            "title": "A Sample Book",
            "isbn": "9920000000001",
            "publishYear": 2015,
            "availableCopies": 5522,
            "coverUrl": "urlSample",
            "authorId": create_author_id,
            "categoryId": create_category_id,
            "authorName": "",
            "categoryName": ""
        }

        response_post = httpRequest.make_post_request(ENDPOINT, payload)
        post_data = response_post.json()
        new_id = post_data['bookId']
        
        created_ids.append(new_id)

        #READ AND VALIDATE
        response_get = httpRequest.make_get_request(ENDPOINT + '/id/' + str(new_id))
        data_get = response_get.json()

        assert data_get["title"] == payload["title"]
        assert data_get["isbn"] == payload["isbn"]
        assert data_get["publishYear"] == payload["publishYear"]
        assert data_get["availableCopies"] == payload["availableCopies"]
        assert data_get["coverUrl"] == payload["coverUrl"]
        assert data_get["authorId"] == payload["authorId"]
        assert data_get["categoryId"] == payload["categoryId"]

        assert response_get.status_code == 200
    finally:
        for _id in created_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204 
        for _id in created_author_ids:
            response = httpRequest.make_delete_request("/authors" + '/id', _id)
            assert response.status_code == 204
        for _id in created_category_ids:
            response = httpRequest.make_delete_request("/categories" + '/id', _id)
            assert response.status_code == 204

    pass

def test_can_update_book_task(httpRequest=httpRequest, ENDPOINT=BOOK_ENDPOINT):
    created_ids = []
    created_author_ids = []
    created_category_ids = []
    
    try:
        #Create author
        author_payload = {
            "name": "Sample Author 5",
            "birthDate": "2000-02-03"
        }
        create_author_response = httpRequest.make_post_request("/authors", author_payload)
        create_author_data = create_author_response.json()
        create_author_id = create_author_data["authorId"]
        
        created_author_ids.append(create_author_id)

        assert create_author_response.status_code == 200 or create_author_response.status_code == 201

        assert create_author_data["name"] == author_payload["name"]
        assert create_author_data["birthDate"] == author_payload["birthDate"]
        
        #Create category
        category_payload = {
            "name": "Sample Category 1"
        }
        create_category_response = httpRequest.make_post_request(endpoint="/categories", data=category_payload)
        create_category_data = create_category_response.json()
        create_category_id = create_category_data["categoryId"]
        
        created_category_ids.append(create_category_id)
        
        assert create_category_response.status_code == 200 or create_category_response.status_code == 201
        
        assert create_category_data["name"] == category_payload["name"]
        #CREATE
        create_payload = {
            "title": "Other Sample Book",
            "isbn": "9930000000001",
            "publishYear": 2016,
            "availableCopies": 5675,
            "coverUrl": "urlSample",
            "authorId": create_author_id,
            "categoryId": create_category_id,
            "authorName": "",
            "categoryName": ""
        }
        create_response = httpRequest.make_post_request(ENDPOINT, create_payload)
        create_data = create_response.json()
        create_id = create_data["bookId"]
        
        created_ids.append(create_id)

        #UPDATE
        update_payload = {
            "title": "Another Sample Book",
            "isbn": "9940000000001",
            "publishYear": 2017,
            "availableCopies": 7679,
            "coverUrl": "urlSample",
            "authorId": create_author_id,
            "categoryId": create_category_id,
            "authorName": "",
            "categoryName": ""
        }
        update_response= httpRequest.make_put_request(ENDPOINT + '/id', create_id, update_payload)
        update_data = update_response.json()

        #READ AND VALIDATE
        get_response = httpRequest.make_get_request(ENDPOINT + '/id/' + str(create_id))
        get_data = get_response.json()

        assert create_response.status_code == 200 or create_response.status_code == 201
        assert update_response.status_code == 200 or update_response.status_code == 201
        assert get_response.status_code == 200 or get_response.status_code == 201
        assert get_data["title"] == update_payload["title"]
        assert get_data["isbn"] == update_payload["isbn"]
        assert get_data["publishYear"] == update_payload["publishYear"]
        assert get_data["availableCopies"] == update_payload["availableCopies"]
        assert get_data["coverUrl"] == update_payload["coverUrl"]
        assert get_data["authorId"] == update_payload["authorId"]
        assert get_data["categoryId"] == update_payload["categoryId"]
    finally:
        for _id in created_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
        for _id in created_author_ids:
            response = httpRequest.make_delete_request("/authors" + '/id', _id)
            assert response.status_code == 204
        for _id in created_category_ids:
            response = httpRequest.make_delete_request("/categories" + '/id', _id)
            assert response.status_code == 204

def test_can_list_books(httpRequest=httpRequest, ENDPOINT=BOOK_ENDPOINT):
    created_ids = []
    created_author_ids = []
    created_category_ids = []
    
    try:
        #Create author
        author_payload = {
            "name": "Sample Author 5",
            "birthDate": "2000-02-03"
        }
        create_author_response = httpRequest.make_post_request("/authors", author_payload)
        create_author_data = create_author_response.json()
        create_author_id = create_author_data["authorId"]
        
        created_author_ids.append(create_author_id)

        assert create_author_response.status_code == 200 or create_author_response.status_code == 201

        assert create_author_data["name"] == author_payload["name"]
        assert create_author_data["birthDate"] == author_payload["birthDate"]
        
        #Create category
        category_payload = {
            "name": "Sample Category 1"
        }
        create_category_response = httpRequest.make_post_request(endpoint="/categories", data=category_payload)
        create_category_data = create_category_response.json()
        create_category_id = create_category_data["categoryId"]
        
        created_category_ids.append(create_category_id)
        
        assert create_category_response.status_code == 200 or create_category_response.status_code == 201
        
        assert create_category_data["name"] == category_payload["name"]
        
        # Create N books
        n = 17
        max_n = httpRequest.make_get_request(ENDPOINT + '/count').json() + n

        for i in range(n):
            payload = {
                f"title": "Sampled Book " + str(i),
                f"isbn": str(9950000000001 + i),
                "publishYear": 2000+i,
                "availableCopies": 1000 + 2*i,
                "coverUrl": "urlSample",
                "authorId": create_author_id,
                "categoryId": create_category_id,
                "authorName": "",
                "categoryName": ""
            }
            create_response = httpRequest.make_post_request(ENDPOINT, payload)
            create_book_data = create_response.json()
            created_ids.append(create_book_data["bookId"])

            assert create_book_data["title"] == payload["title"]
            assert create_book_data["isbn"] == payload["isbn"]
            assert create_book_data["publishYear"] == payload["publishYear"]
            assert create_book_data["availableCopies"] == payload["availableCopies"]
            assert create_book_data["coverUrl"] == payload["coverUrl"]
            assert create_book_data["authorId"] == payload["authorId"]
            assert create_book_data["categoryId"] == payload["categoryId"]

            assert create_response.status_code == 200 or create_response.status_code == 201

        # List task and make sure the count == n + (number of existing elements)
        list_response = httpRequest.make_get_request(ENDPOINT)
        list_data = list_response.json()
        assert list_response.status_code == 200
        assert len(list_data) == max_n
    finally:
        for _id in created_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
        for _id in created_author_ids:
            response = httpRequest.make_delete_request("/authors" + '/id', _id)
            assert response.status_code == 204
        for _id in created_category_ids:
            response = httpRequest.make_delete_request("/categories" + '/id', _id)
            assert response.status_code == 204

def test_can_delete_book_task(httpRequest=httpRequest, ENDPOINT=BOOK_ENDPOINT):
    #Create author
    author_payload = {
        "name": "Sample Author 5",
        "birthDate": "2000-02-03"
    }
    create_author_response = httpRequest.make_post_request("/authors", author_payload)
    create_author_data = create_author_response.json()
    create_author_id = create_author_data["authorId"]
    

    assert create_author_response.status_code == 200 or create_author_response.status_code == 201

    assert create_author_data["name"] == author_payload["name"]
    assert create_author_data["birthDate"] == author_payload["birthDate"]
    
    #Create category
    category_payload = {
        "name": "Sample Category 1"
    }
    create_category_response = httpRequest.make_post_request(endpoint="/categories", data=category_payload)
    create_category_data = create_category_response.json()
    create_category_id = create_category_data["categoryId"]
    
    
    assert create_category_response.status_code == 200 or create_category_response.status_code == 201
    
    assert create_category_data["name"] == category_payload["name"]
    
    #Create book
    payload = {
        "title": "Another Sample Book",
        "isbn": "9960000000001",
        "publishYear": 2004,
        "availableCopies": 14522,
        "coverUrl": "urlSample",
        "authorId": create_author_id,
        "categoryId": create_category_id,
        "authorName": "",
        "categoryName": ""
    }
    create_response = httpRequest.make_post_request(endpoint=ENDPOINT, data=payload)
    create_data = create_response.json()
    create_id = create_data["bookId"]
    
    assert create_response.status_code == 200 or create_response.status_code == 201
    
    #Delete
    delete_response = httpRequest.make_delete_request(endpoint=ENDPOINT+'/id', id=create_id)
    assert delete_response.status_code == 204
    
    #Delete author
    delete_author_response = httpRequest.make_delete_request("/authors/id", create_author_id)
    assert delete_author_response.status_code == 204
    
    #Delete category
    delete_category_response = httpRequest.make_delete_request("/categories/id", create_category_id)
    assert delete_category_response.status_code == 204
    
    #Get
    get_response = httpRequest.make_get_request(endpoint=ENDPOINT+'/id/'+ str(create_id))
    assert get_response.status_code != 200
    
    #Get author
    get_author_response = httpRequest.make_get_request("/author/id" + str(create_author_id))
    assert get_author_response.status_code!= 200
    
    #Get category
    get_category_response = httpRequest.make_get_request("/categories/id" + str(create_category_id))
    assert get_category_response.status_code!= 200
    
def test_can_search_book_task(httpRequest=httpRequest, ENDPOINT=BOOK_ENDPOINT):
    created_ids = []
    created_author_ids = []
    created_category_ids = []
    
    try:
        #Create author
        author_payload = {
            "name": "Sample Author 5",
            "birthDate": "2000-02-03"
        }
        create_author_response = httpRequest.make_post_request("/authors", author_payload)
        create_author_data = create_author_response.json()
        create_author_id = create_author_data["authorId"]
        
        created_author_ids.append(create_author_id)

        assert create_author_response.status_code == 200 or create_author_response.status_code == 201

        assert create_author_data["name"] == author_payload["name"]
        assert create_author_data["birthDate"] == author_payload["birthDate"]
        
        #Create category
        category_payload = {
            "name": "Sample Category 1"
        }
        create_category_response = httpRequest.make_post_request(endpoint="/categories", data=category_payload)
        create_category_data = create_category_response.json()
        create_category_id = create_category_data["categoryId"]
        
        created_category_ids.append(create_category_id)
        
        assert create_category_response.status_code == 200 or create_category_response.status_code == 201
        
        assert create_category_data["name"] == category_payload["name"]
        
        #Create Books
        SEARCH_ENDPOINT = BOOK_ENDPOINT + "/search"
        books_to_create = [
            "The Shadow of the Moon",
            "The Sun Rises",
            "Shadows in the Sun",
            "Beneath the Crimson Sky",
            "Sky of Shadows",
            "Crimson Moonlight",
        ]

        search_queries = [
            {"query": "Shadow", "expected_count": 3},  # Matches: Shadow of the Moon, Shadows in the Sun, Sky of Shadows
            {"query": "Sun", "expected_count": 2},     # Matches: The Sun Rises, Shadows in the Sun
            {"query": "Crimson", "expected_count": 2}, # Matches: Beneath the Crimson Sky, Crimson Moonlight
            {"query": "Moon", "expected_count": 2},    # Matches: The Shadow of the Moon, Crimson Moonlight
            {"query": "Sky", "expected_count": 2},     # Matches: Beneath the Crimson Sky, Sky of Shadows
            {"query": "Nonexistent", "expected_count": 0},  # No matches
        ]

        for title in books_to_create:
            payload = {
                "title": title,
                "isbn": f"978-{len(title)}-{len(title) + 1000}", 
                "publishYear": 2023,
                "availableCopies": 10,
                "coverUrl": "urlExample",
                "authorId": create_author_id,
                "categoryId": create_category_id,
            }
            create_response = httpRequest.make_post_request(BOOK_ENDPOINT, payload)
            created_ids.append(create_response.json()["bookId"])
            assert create_response.status_code == 200 or create_response.status_code == 201

        for search in search_queries:
            query = search["query"]
            expected_count = search["expected_count"]

            search_response = httpRequest.make_get_request(SEARCH_ENDPOINT, params={"title": query})
            assert search_response.status_code == 200

            search_results = search_response.json()
            assert len(search_results) == expected_count, f"Query '{query}' returned {len(search_results)} results, expected {expected_count}."
    finally:
        for _id in created_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
        for _id in created_author_ids:
            response = httpRequest.make_delete_request("/authors" + '/id', _id)
            assert response.status_code == 204
        for _id in created_category_ids:
            response = httpRequest.make_delete_request("/categories" + '/id', _id)
            assert response.status_code == 204

def test_can_get_books_by_category_task(httpRequest=httpRequest, ENDPOINT=BOOK_ENDPOINT):
    created_ids = []
    created_category_ids = []
    created_author_ids = []
    try:
        #Create author
        author_payload = {
            "name": "Sample Author 5",
            "birthDate": "2000-02-03"
        }
        create_author_response = httpRequest.make_post_request("/authors", author_payload)
        create_author_data = create_author_response.json()
        create_author_id = create_author_data["authorId"]
        
        created_author_ids.append(create_author_id)

        assert create_author_response.status_code == 200 or create_author_response.status_code == 201

        assert create_author_data["name"] == author_payload["name"]
        assert create_author_data["birthDate"] == author_payload["birthDate"]
        
        # Create category
        category_payload = {
            "name": "newCategory"
        }
        
        create_category_response = httpRequest.make_post_request("/categories", category_payload)
        create_category_data = create_category_response.json()
        create_category_id = create_category_data["categoryId"]
        
        created_category_ids.append(create_category_id)
        
        assert create_category_response.status_code == 200 or create_category_response.status_code == 201
        assert create_category_data["name"] == category_payload["name"]
        
        # Create books
        n = 15 # number of books from category
        for i in range(n):
            book_payload = {
                f"title": "The Sample Book " + str(i),
                f"isbn": str(9999000000001 + i),
                "publishYear": 2010+i,
                "availableCopies": 7000 + 2*i,
                "coverUrl": "urlSample",
                "authorId": create_author_id,
                "categoryId": create_category_id,
                "authorName": "",
                "categoryName": ""
            }
            
            create_book_response = httpRequest.make_post_request(endpoint=ENDPOINT, data=book_payload)
            create_book_data = create_book_response.json()
            
            created_ids.append(create_book_data["bookId"])
            
            assert create_book_data["title"] == book_payload["title"]
            assert create_book_data["isbn"] == book_payload["isbn"]
            assert create_book_data["publishYear"] == book_payload["publishYear"]
            assert create_book_data["availableCopies"] == book_payload["availableCopies"]
            assert create_book_data["coverUrl"] == book_payload["coverUrl"]
            assert create_book_data["authorId"] == book_payload["authorId"]
            assert create_book_data["categoryId"] == book_payload["categoryId"]

            assert create_category_data["categoryId"] == create_book_data["categoryId"]
            
        # Get books by category
        get_by_category_response = httpRequest.make_get_request(ENDPOINT + '/category/' + str(create_category_id))
        get_by_category_data = get_by_category_response.json()
        
        assert get_by_category_response.status_code == 200
        assert len(get_by_category_data) == n
        for book in get_by_category_data:
            assert book["categoryId"] == create_category_id
    
    finally:
        for _id in created_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
        for _id in created_category_ids:
            response = httpRequest.make_delete_request('/categories/id', _id)
            assert response.status_code == 204
        for _id in created_author_ids:
            response = httpRequest.make_delete_request("/authors" + '/id', _id)
            assert response.status_code == 204
    pass

def test_can_get_books_by_author_task(httpRequest=httpRequest, ENDPOINT=BOOK_ENDPOINT):
    created_ids = []
    created_author_ids = []
    created_category_ids = []
    try:
        # Create category
        category_payload = {
            "name": "newCategory"
        }
        
        create_category_response = httpRequest.make_post_request("/categories", category_payload)
        create_category_data = create_category_response.json()
        create_category_id = create_category_data["categoryId"]
        
        created_category_ids.append(create_category_id)
        
        assert create_category_response.status_code == 200 or create_category_response.status_code == 201
        assert create_category_data["name"] == category_payload["name"]
        
        # Create author
        author_payload = {
            "name": "New Author",
            "birthDate": "2015-01-01"
        }
        
        create_author_response = httpRequest.make_post_request("/authors", author_payload)
        create_author_data = create_author_response.json()
        create_author_id = create_author_data["authorId"]
        
        created_author_ids.append(create_author_id)
        
        assert create_author_response.status_code == 200 or create_author_response.status_code == 201
        assert create_author_data["name"] == author_payload["name"]
        
        # Create books
        n = 15 # number of books from author
        for i in range(n):
            book_payload = {
                f"title": "The Sample Book " + str(i),
                f"isbn": str(9999000000001 + i),
                "publishYear": 2010+i,
                "availableCopies": 7000 + 2*i,
                "coverUrl": "urlSample",
                "authorId": create_author_id,
                "categoryId": create_category_id,
                "authorName": "",
                "categoryName": ""
            }
            
            create_book_response = httpRequest.make_post_request(endpoint=ENDPOINT, data=book_payload)
            create_book_data = create_book_response.json()
            
            created_ids.append(create_book_data["bookId"])
            
            assert create_book_data["title"] == book_payload["title"]
            assert create_book_data["isbn"] == book_payload["isbn"]
            assert create_book_data["publishYear"] == book_payload["publishYear"]
            assert create_book_data["availableCopies"] == book_payload["availableCopies"]
            assert create_book_data["coverUrl"] == book_payload["coverUrl"]
            assert create_book_data["authorId"] == book_payload["authorId"]
            assert create_book_data["categoryId"] == book_payload["categoryId"]

            assert create_author_data["authorId"] == create_book_data["authorId"]
            
        # Get books by author
        get_by_author_response = httpRequest.make_get_request(ENDPOINT + '/author/' + str(create_author_id))
        get_by_author_data = get_by_author_response.json()
        
        assert get_by_author_response.status_code == 200
        assert len(get_by_author_data) == n
        for book in get_by_author_data:
            assert book["authorId"] == create_author_id
    
    finally:
        for _id in created_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
        for _id in created_author_ids:
            response = httpRequest.make_delete_request('/authors/id', _id)
            assert response.status_code == 204
        for _id in created_category_ids:
            response = httpRequest.make_delete_request("/categories/id", _id)
            assert response.status_code == 204
    pass

def test_can_get_book_borrows_task(httpRequest=httpRequest, ENDPOINT=BOOK_ENDPOINT):
    created_book_ids = []
    created_user_ids = []
    created_borrow_ids = []
    created_author_ids = []
    created_category_ids = []
    USER_ENDPOINT = "/auth/register"
    BORROW_ENDPOINT = "/borrows"

    try:
        # Create category
        category_payload = {
            "name": "newCategory"
        }
        
        create_category_response = httpRequest.make_post_request("/categories", category_payload)
        create_category_data = create_category_response.json()
        create_category_id = create_category_data["categoryId"]
        
        created_category_ids.append(create_category_id)
        
        assert create_category_response.status_code == 200 or create_category_response.status_code == 201
        assert create_category_data["name"] == category_payload["name"]
        
        # Create author
        author_payload = {
            "name": "New Author",
            "birthDate": "2015-01-01"
        }
        
        create_author_response = httpRequest.make_post_request("/authors", author_payload)
        create_author_data = create_author_response.json()
        create_author_id = create_author_data["authorId"]
        
        created_author_ids.append(create_author_id)
        
        assert create_author_response.status_code == 200 or create_author_response.status_code == 201
        assert create_author_data["name"] == author_payload["name"]
        
        # Create Users
        num_users = 5
        for i in range(num_users):
            user_payload = {
                "name": f"User {i + 1}",
                "email": f"user{i + 1}@example.com",
                "phone": "123-456-789",
                "username": f"user{i + 1}",
                "password": f"samplePassword{i}",
                "role": "USER"
            }
            user_response = httpRequest.make_post_request(USER_ENDPOINT, user_payload)
            assert user_response.status_code == 200 or user_response.status_code == 201
            
            user_list_response = httpRequest.make_get_request("/users")
            
            user_list_data = user_list_response.json()
            
            user_data = {}
            
            for user in user_list_data:
                if user["username"] == user_payload["username"]:
                    user_data = user
                    break
            
            created_user_id = user_data["userId"]
            
            created_user_ids.append(created_user_id)

        # Create Books
        num_books = 5
        for i in range(num_books):
            book_payload = {
                "title": f"Book {i + 1}",
                "isbn": str(9900000000000 + i),
                "publishYear": 2020 + i,
                "availableCopies": 10 + i,
                "coverUrl": "http://example.com/cover.png",
                "authorId": create_author_id,
                "categoryId": create_category_id,
                "authorName": "",
                "categoryName": ""
            }
            book_response = httpRequest.make_post_request(ENDPOINT, book_payload)
            assert book_response.status_code == 200 or book_response.status_code == 201
            book_data = book_response.json()
            created_book_ids.append(book_data["bookId"])

        # Create Borrows
        for i in range(len(created_book_ids)):
            borrow_payload = {
                "userId": created_user_ids[i % num_users],
                "bookId": created_book_ids[i],
                "borrowDate": "2025-01-01",
                "returnDate": None
            }
            borrow_response = httpRequest.make_post_request(BORROW_ENDPOINT, borrow_payload)
            assert borrow_response.status_code == 200 or borrow_response.status_code == 201
            borrow_data = borrow_response.json()
            created_borrow_ids.append(borrow_data["borrowId"])

    finally:
        # Cleanup Borrows
        for borrow_id in created_borrow_ids:
            borrow_delete_response = httpRequest.make_delete_request(BORROW_ENDPOINT + "/id", borrow_id)
            assert borrow_delete_response.status_code == 204

        # Cleanup Books
        for book_id in created_book_ids:
            book_delete_response = httpRequest.make_delete_request(ENDPOINT + "/id", book_id)
            assert book_delete_response.status_code == 204

        # Cleanup Users
        for user_id in created_user_ids:
            user_delete_response = httpRequest.make_delete_request("/users" + "/id", user_id)
            assert user_delete_response.status_code == 204
            
        # Cleanup Authors
        for _id in created_author_ids:
            response = httpRequest.make_delete_request('/authors/id', _id)
            assert response.status_code == 204
        
        # Cleanup categories
        for _id in created_category_ids:
            response = httpRequest.make_delete_request("/categories/id", _id)
            assert response.status_code == 204
#######################################################################################################################################
#   CATEGORIES
#######################################################################################################################################

CATEGORY_ENDPOINT = '/categories'

def test_can_call_category_endpoint(httpRequest=httpRequest, ENDPOINT=CATEGORY_ENDPOINT):
    response = httpRequest.make_get_request(ENDPOINT)
    assert response.status_code == 200
    pass

def test_can_get_category_by_id_task(httpRequest=httpRequest, ENDPOINT=CATEGORY_ENDPOINT):
    created_ids = []
    try:
        # CREATE
        payload = {
            "name": "Sample Category"
        }

        response_post = httpRequest.make_post_request(ENDPOINT, payload)
        post_data = response_post.json()
        created_ids.append(post_data['categoryId'])

        # READ
        new_id = post_data['categoryId']
        response_get = httpRequest.make_get_request(ENDPOINT + '/id/' + str(new_id))
        data_get = response_get.json()

        assert data_get["name"] == payload["name"]
        assert response_get.status_code == 200
    finally:
        for _id in created_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
    pass

def test_can_create_category_task(httpRequest=httpRequest, ENDPOINT=CATEGORY_ENDPOINT):
    created_ids = []
    try:
        payload = {
            "name": "New Test Category"
        }

        response_post = httpRequest.make_post_request(ENDPOINT, payload)
        post_data = response_post.json()
        new_id = post_data['categoryId']
        created_ids.append(new_id)

        response_get = httpRequest.make_get_request(ENDPOINT + '/id/' + str(new_id))
        data_get = response_get.json()

        assert data_get["name"] == payload["name"]
        assert response_get.status_code == 200
    finally:
        for _id in created_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
    pass

def test_can_update_category_task(httpRequest=httpRequest, ENDPOINT=CATEGORY_ENDPOINT):
    created_ids = []
    try:
        # Create
        create_payload = {
            "name": "Category to Update"
        }
        create_response = httpRequest.make_post_request(ENDPOINT, create_payload)
        create_data = create_response.json()
        create_id = create_data["categoryId"]
        created_ids.append(create_id)

        # Update
        update_payload = {
            "name": "Updated Category Name"
        }
        update_response = httpRequest.make_put_request(ENDPOINT + '/id', create_id, update_payload)
        update_data = update_response.json()

        # Validate
        get_response = httpRequest.make_get_request(ENDPOINT + '/id/' + str(create_id))
        get_data = get_response.json()

        assert get_data["name"] == update_payload["name"]
        assert get_response.status_code == 200
    finally:
        for _id in created_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
    pass

def test_can_delete_category_task(httpRequest=httpRequest, ENDPOINT=CATEGORY_ENDPOINT):
    # Create
    payload = {
        "name": "Category to Delete"
    }
    create_response = httpRequest.make_post_request(ENDPOINT, payload)
    create_data = create_response.json()
    create_id = create_data["categoryId"]
    
    assert create_response.status_code == 200 or create_response.status_code == 201
    
    # Delete
    delete_response = httpRequest.make_delete_request(ENDPOINT + '/id', create_id)
    assert delete_response.status_code == 204
    
    # Verify deletion
    get_response = httpRequest.make_get_request(ENDPOINT + '/id/' + str(create_id))
    assert get_response.status_code != 200
    pass

#######################################################################################################################################
#   USERS
#######################################################################################################################################

USER_ENDPOINT = '/users'    
REGISTER_USER_ENDPOINT = '/auth/register'

def test_can_call_user_endpoint(httpRequest=httpRequest, ENDPOINT=USER_ENDPOINT):
    response = httpRequest.make_get_request(ENDPOINT)
    assert response.status_code == 200
    pass

def test_can_get_user_by_id_task(httpRequest=httpRequest, ENDPOINT=USER_ENDPOINT):
    created_ids = []
    try:
        payload = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "123-456-7890",
            "username": "test",
            "password": "testPassword",
            "role": "USER"
        }

        response_post = httpRequest.make_post_request(REGISTER_USER_ENDPOINT, payload)
        assert response_post.status_code == 200 or response_post.status_code == 201
        ####
        post_data = {}
        
        users_list_response_get = httpRequest.make_get_request(USER_ENDPOINT)
        
        assert users_list_response_get.status_code == 200
        
        for user in users_list_response_get.json():
            if user["email"] == payload["email"]:
                post_data = user
                break
        
        new_id = post_data['userId']
        created_ids.append(new_id)

        ###
        response_get = httpRequest.make_get_request(ENDPOINT + '/id/' + str(new_id))
        data_get = response_get.json()

        assert data_get["name"] == payload["name"]
        assert data_get["email"] == payload["email"]
        assert data_get["phone"] == payload["phone"]
        assert response_get.status_code == 200
    finally:
        for _id in created_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
    pass

def test_can_get_user_by_email_task(httpRequest=httpRequest, ENDPOINT=USER_ENDPOINT):
    created_ids = []
    try:
        payload = {
            "name": "Email Test User",
            "email": "emailtest@example.com",
            "phone": "123-456-7890",
            "username": "emailtest",
            "password": "emailTestPassword",
            "role": "USER"
        }

        response_post = httpRequest.make_post_request(REGISTER_USER_ENDPOINT, payload)
        assert response_post.status_code == 200 or response_post.status_code == 201
        ####
        post_data = {}
        
        users_list_response_get = httpRequest.make_get_request(USER_ENDPOINT)
        
        assert users_list_response_get.status_code == 200
        
        for user in users_list_response_get.json():
            if user["email"] == payload["email"]:
                post_data = user
                break
        
        new_id = post_data['userId']
        created_ids.append(new_id)

        ###

        response_get = httpRequest.make_get_request(ENDPOINT + '/email/' + payload["email"])
        data_get = response_get.json()

        assert data_get["name"] == payload["name"]
        assert data_get["email"] == payload["email"]
        assert data_get["phone"] == payload["phone"]
        assert response_get.status_code == 200
    finally:
        for _id in created_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
    pass

def test_can_create_user_task(httpRequest=httpRequest, ENDPOINT=USER_ENDPOINT):
    created_ids = []
    try:
        # Create user
        payload = {
            "name": "Test Create User",
            "email": "createtest@example.com",
            "phone": "123-456-7890",
            "username": "createtest",
            "password": "createTestPassword",
            "role": "USER"
        }

        response_post = httpRequest.make_post_request(REGISTER_USER_ENDPOINT, payload)
        assert response_post.status_code == 200 or response_post.status_code == 201
        ####
        post_data = {}
        
        users_list_response_get = httpRequest.make_get_request(USER_ENDPOINT)
        
        assert users_list_response_get.status_code == 200
        
        for user in users_list_response_get.json():
            if user["email"] == payload["email"]:
                post_data = user
                break
        
        new_id = post_data['userId']
        created_ids.append(new_id)

        ###

        # Verify creation
        response_get = httpRequest.make_get_request(ENDPOINT + '/id/' + str(new_id))
        get_data = response_get.json()

        # Assert all fields match
        assert get_data["name"] == payload["name"]
        assert get_data["email"] == payload["email"]
        assert get_data["phone"] == payload["phone"]
        assert get_data["username"] == payload["username"]
        assert get_data["role"] == payload["role"]
        assert response_get.status_code == 200

        # Verify we can also find by email
        response_email = httpRequest.make_get_request(ENDPOINT + '/email/' + payload["email"])
        email_data = response_email.json()
        assert email_data["userId"] == post_data['userId']
        assert email_data["name"] == payload["name"]
        assert email_data["email"] == payload["email"]
        assert email_data["phone"] == payload["phone"]
        assert email_data["username"] == payload["username"]
        assert email_data["role"] == payload["role"]
        
    finally:
        # Cleanup
        for _id in created_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
    pass

def test_can_update_user_task(httpRequest=httpRequest, ENDPOINT=USER_ENDPOINT):
    created_ids = []
    try:
        # Create
        create_payload = {
            "name": "Update Test User",
            "email": "update@example.com",
            "phone": "123-456-7890",
            "username": "updatetest",
            "password": "updateTestPassword",
            "role": "USER"
        }
        create_response = httpRequest.make_post_request(REGISTER_USER_ENDPOINT, create_payload)
        assert create_response.status_code == 200 or create_response.status_code == 201
        ####
        post_data = {}
        
        users_list_response_get = httpRequest.make_get_request(USER_ENDPOINT)
        
        assert users_list_response_get.status_code == 200
        
        for user in users_list_response_get.json():
            if user["email"] == create_payload["email"]:
                post_data = user
                break
        
        new_id = post_data['userId']
        created_ids.append(new_id)

        ###

        # Update
        update_payload = {
            "name": "Updated User",
            "email": "updated@example.com",
            "phone": "987-654-3210",
            "username": "updatetest2",
            "password": "updateTestPassword123",
            "role": "USER"
        }
        update_response = httpRequest.make_put_request(ENDPOINT + '/id', new_id, update_payload)
        #update_data = update_response.json()

        # Validate
        get_response = httpRequest.make_get_request(ENDPOINT + '/id/' + str(new_id))
        get_data = get_response.json()

        assert get_response.status_code == 200
    finally:
        for _id in created_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
    pass

#######################################################################################################################################
#   BORROWS
#######################################################################################################################################

BORROW_ENDPOINT = '/borrows'

def test_can_call_borrow_endpoint(httpRequest=httpRequest, ENDPOINT=BORROW_ENDPOINT):
    response = httpRequest.make_get_request(ENDPOINT)
    assert response.status_code == 200
    pass

def test_can_create_and_get_borrow_task(httpRequest=httpRequest, ENDPOINT=BORROW_ENDPOINT):
    created_borrow_ids = []
    created_user_ids = []
    created_book_ids = []
    
    created_author_ids = []
    created_category_ids = []
    
    try:
        #Create author
        author_payload = {
            "name": "Sample Author 5",
            "birthDate": "2000-02-03"
        }
        create_author_response = httpRequest.make_post_request("/authors", author_payload)
        create_author_data = create_author_response.json()
        create_author_id = create_author_data["authorId"]
        
        created_author_ids.append(create_author_id)

        assert create_author_response.status_code == 200 or create_author_response.status_code == 201

        assert create_author_data["name"] == author_payload["name"]
        assert create_author_data["birthDate"] == author_payload["birthDate"]
        
        #Create category
        category_payload = {
            "name": "Sample Category 1"
        }
        create_category_response = httpRequest.make_post_request(endpoint="/categories", data=category_payload)
        create_category_data = create_category_response.json()
        create_category_id = create_category_data["categoryId"]
        
        created_category_ids.append(create_category_id)
        
        assert create_category_response.status_code == 200 or create_category_response.status_code == 201
        
        assert create_category_data["name"] == category_payload["name"]
        
        # Create test user
        user_payload = {
            "name": "Borrow Test User",
            "email": "borrowtest@example.com",
            "phone": "123-456-7890",
            "username": "borrowtest",
            "password": "borrowTestPassword",
            "role": "USER"
        }
        user_response = httpRequest.make_post_request('/auth/register', user_payload)
        assert user_response.status_code == 200 or user_response.status_code == 201
        ####
        post_data = {}
        
        users_list_response_get = httpRequest.make_get_request(USER_ENDPOINT)
        
        assert users_list_response_get.status_code == 200
        
        for user in users_list_response_get.json():
            if user["email"] == user_payload["email"]:
                post_data = user
                break
        
        new_id = post_data['userId']
        created_user_ids.append(new_id)

        ###

        # Create test book
        book_payload = {
            "title": "Borrow Test Book",
            "isbn": "9999999999999",
            "publishYear": 2023,
            "availableCopies": 5,
            "coverUrl": "test-url",
            "authorId": create_author_id,
            "categoryId": create_category_id
        }
        book_response = httpRequest.make_post_request('/books', book_payload)
        book_data = book_response.json()
        created_book_ids.append(book_data['bookId'])

        # Create borrow
        borrow_payload = {
            "userId": new_id,
            "bookId": book_data['bookId'],
            "borrowDate": "2023-01-01",
            "returnDate": None
        }
        borrow_response = httpRequest.make_post_request(ENDPOINT, borrow_payload)
        borrow_data = borrow_response.json()
        created_borrow_ids.append(borrow_data['borrowId'])

        # Verify borrow
        get_response = httpRequest.make_get_request(ENDPOINT + '/id/' + str(borrow_data['borrowId']))
        get_data = get_response.json()

        assert get_data["userId"] == borrow_payload["userId"]
        assert get_data["bookId"] == borrow_payload["bookId"]
        assert get_response.status_code == 200
    finally:
        # Cleanup
        for _id in created_borrow_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
        for _id in created_book_ids:
            response = httpRequest.make_delete_request('/books/id', _id)
            assert response.status_code == 204
        for _id in created_user_ids:
            response = httpRequest.make_delete_request('/users/id', _id)
            assert response.status_code == 204
        for _id in created_author_ids:
            response = httpRequest.make_delete_request("/authors" + '/id', _id)
            assert response.status_code == 204
        for _id in created_category_ids:
            response = httpRequest.make_delete_request("/categories" + '/id', _id)
            assert response.status_code == 204
    pass

def test_can_get_active_loans_task(httpRequest=httpRequest, ENDPOINT=BORROW_ENDPOINT):
    created_borrow_ids = []
    created_user_ids = []
    created_book_ids = []
        
    created_author_ids = []
    created_category_ids = []
    
    try:
        #Create author
        author_payload = {
            "name": "Sample Author 5",
            "birthDate": "2000-02-03"
        }
        create_author_response = httpRequest.make_post_request("/authors", author_payload)
        create_author_data = create_author_response.json()
        create_author_id = create_author_data["authorId"]
        
        created_author_ids.append(create_author_id)

        assert create_author_response.status_code == 200 or create_author_response.status_code == 201

        assert create_author_data["name"] == author_payload["name"]
        assert create_author_data["birthDate"] == author_payload["birthDate"]
        
        #Create category
        category_payload = {
            "name": "Sample Category 1"
        }
        create_category_response = httpRequest.make_post_request(endpoint="/categories", data=category_payload)
        create_category_data = create_category_response.json()
        create_category_id = create_category_data["categoryId"]
        
        created_category_ids.append(create_category_id)
        
        assert create_category_response.status_code == 200 or create_category_response.status_code == 201
        
        assert create_category_data["name"] == category_payload["name"]
        
        # Create test user and book
        user_payload = {
            "name": "Active Loans Test User",
            "email": "activeloans@example.com",
            "phone": "123-456-7890",
            "username": "activeloans",
            "password": "activeLoansPassword",
            "role": "USER"
        }
        user_response = httpRequest.make_post_request('/auth/register', user_payload)
        assert user_response.status_code == 200 or user_response.status_code == 201
        ####
        post_data = {}
        
        users_list_response_get = httpRequest.make_get_request(USER_ENDPOINT)
        
        assert users_list_response_get.status_code == 200
        
        for user in users_list_response_get.json():
            if user["email"] == user_payload["email"]:
                post_data = user
                break
        
        new_id = post_data['userId']
        created_user_ids.append(new_id)

        ###

        # Create multiple books and borrows
        n = 3  # number of active loans to create
        for i in range(n):
            book_payload = {
                "title": f"Active Loan Book {i}",
                "isbn": f"999999999{i}999",
                "publishYear": 2023,
                "availableCopies": 5,
                "coverUrl": "test-url",
                "authorId": create_author_id,
                "categoryId": create_category_id
            }
            book_response = httpRequest.make_post_request('/books', book_payload)
            book_data = book_response.json()
            created_book_ids.append(book_data['bookId'])

            borrow_payload = {
                "userId": new_id,
                "bookId": book_data['bookId'],
                "borrowDate": "2023-01-01",
                "returnDate": None
            }
            borrow_response = httpRequest.make_post_request(ENDPOINT, borrow_payload)
            borrow_data = borrow_response.json()
            created_borrow_ids.append(borrow_data['borrowId'])

        # Get active loans
        active_loans_response = httpRequest.make_get_request(ENDPOINT + '/active')
        active_loans_data = active_loans_response.json()

        assert active_loans_response.status_code == 200
        assert len(active_loans_data) >= n  # There might be other active loans in the system
    finally:
        # Cleanup
        for _id in created_borrow_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
        for _id in created_book_ids:
            response = httpRequest.make_delete_request('/books/id', _id)
            assert response.status_code == 204
        for _id in created_user_ids:
            response = httpRequest.make_delete_request('/users/id', _id)
            assert response.status_code == 204
        for _id in created_author_ids:
            response = httpRequest.make_delete_request("/authors" + '/id', _id)
            assert response.status_code == 204
        for _id in created_category_ids:
            response = httpRequest.make_delete_request("/categories" + '/id', _id)
            assert response.status_code == 204
    pass

def test_can_update_borrow_task(httpRequest=httpRequest, ENDPOINT=BORROW_ENDPOINT):
    created_borrow_ids = []
    created_user_ids = []
    created_book_ids = []
    
    created_author_ids = []
    created_category_ids = []
    
    try:
        #Create author
        author_payload = {
            "name": "Sample Author 5",
            "birthDate": "2000-02-03"
        }
        create_author_response = httpRequest.make_post_request("/authors", author_payload)
        create_author_data = create_author_response.json()
        create_author_id = create_author_data["authorId"]
        
        created_author_ids.append(create_author_id)

        assert create_author_response.status_code == 200 or create_author_response.status_code == 201

        assert create_author_data["name"] == author_payload["name"]
        assert create_author_data["birthDate"] == author_payload["birthDate"]
        
        #Create category
        category_payload = {
            "name": "Sample Category 1"
        }
        create_category_response = httpRequest.make_post_request(endpoint="/categories", data=category_payload)
        create_category_data = create_category_response.json()
        create_category_id = create_category_data["categoryId"]
        
        created_category_ids.append(create_category_id)
        
        assert create_category_response.status_code == 200 or create_category_response.status_code == 201
        
        assert create_category_data["name"] == category_payload["name"]
        
        # Create test user
        user_payload = {
            "name": "Borrow Test User",
            "email": "borrowtest@example.com",
            "phone": "123-456-7890",
            "username": "borrowtest",
            "password": "borrowTestPassword",
            "role": "USER"
        }
        user_response = httpRequest.make_post_request('/auth/register', user_payload)
        assert user_response.status_code == 200 or user_response.status_code == 201
        ####
        post_data = {}
        
        users_list_response_get = httpRequest.make_get_request(USER_ENDPOINT)
        
        assert users_list_response_get.status_code == 200
        
        for user in users_list_response_get.json():
            if user["email"] == user_payload["email"]:
                post_data = user
                break
        
        new_id = post_data['userId']
        created_user_ids.append(new_id)

        ###

        # Create test book
        book_payload = {
            "title": "Borrow Test Book",
            "isbn": "9999999999999",
            "publishYear": 2023,
            "availableCopies": 5,
            "coverUrl": "test-url",
            "authorId": create_author_id,
            "categoryId": create_category_id
        }
        book_response = httpRequest.make_post_request('/books', book_payload)
        book_data = book_response.json()
        created_book_ids.append(book_data['bookId'])

        # Create borrow
        borrow_payload = {
            "userId": new_id,
            "bookId": book_data['bookId'],
            "borrowDate": "2023-01-01",
            "returnDate": None
        }
        borrow_response = httpRequest.make_post_request(ENDPOINT, borrow_payload)
        borrow_data = borrow_response.json()
        created_borrow_ids.append(borrow_data['borrowId'])

        # Verify borrow
        get_response = httpRequest.make_get_request(ENDPOINT + '/id/' + str(borrow_data['borrowId']))
        get_data = get_response.json()

        assert get_data["userId"] == borrow_payload["userId"]
        assert get_data["bookId"] == borrow_payload["bookId"]
        assert get_response.status_code == 200
        
        #Update borrow
        update_borrow_payload = {
            "userId": new_id,
            "bookId": book_data['bookId'],
            "borrowDate": "2023-01-01",
            "returnDate": "2023-04-22"
        }
        
        update_borrow_response = httpRequest.make_put_request(endpoint="/borrows/id", id=get_data["borrowId"], data=update_borrow_payload)
        get_borrow_response = httpRequest.make_get_request(endpoint="/borrows/id/" + str(get_data["borrowId"]))
        get_borrow_data = get_borrow_response.json()
        assert get_borrow_data["userId"] == update_borrow_payload["userId"]
        assert get_borrow_data["bookId"] == update_borrow_payload["bookId"]
        assert get_borrow_data["borrowDate"] == update_borrow_payload["borrowDate"]
        assert get_borrow_data["returnDate"] == update_borrow_payload["returnDate"]
    finally:
        # Cleanup
        for _id in created_borrow_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
        for _id in created_book_ids:
            response = httpRequest.make_delete_request('/books/id', _id)
            assert response.status_code == 204
        for _id in created_user_ids:
            response = httpRequest.make_delete_request('/users/id', _id)
            assert response.status_code == 204
        for _id in created_author_ids:
            response = httpRequest.make_delete_request("/authors" + '/id', _id)
            assert response.status_code == 204
        for _id in created_category_ids:
            response = httpRequest.make_delete_request("/categories" + '/id', _id)
            assert response.status_code == 204
    pass




def test_can_update_borrow_task(httpRequest=httpRequest, ENDPOINT=BORROW_ENDPOINT):
    created_borrow_ids = []
    created_user_ids = []
    created_book_ids = []
    
    created_author_ids = []
    created_category_ids = []
    
    try:
        #Create author
        author_payload = {
            "name": "Sample Author 5",
            "birthDate": "2000-02-03"
        }
        create_author_response = httpRequest.make_post_request("/authors", author_payload)
        create_author_data = create_author_response.json()
        create_author_id = create_author_data["authorId"]
        
        created_author_ids.append(create_author_id)

        assert create_author_response.status_code == 200 or create_author_response.status_code == 201

        assert create_author_data["name"] == author_payload["name"]
        assert create_author_data["birthDate"] == author_payload["birthDate"]
        
        #Create category
        category_payload = {
            "name": "Sample Category 1"
        }
        create_category_response = httpRequest.make_post_request(endpoint="/categories", data=category_payload)
        create_category_data = create_category_response.json()
        create_category_id = create_category_data["categoryId"]
        
        created_category_ids.append(create_category_id)
        
        assert create_category_response.status_code == 200 or create_category_response.status_code == 201
        
        assert create_category_data["name"] == category_payload["name"]
        
        # Create test user
        user_payload = {
            "name": "Borrow Test User",
            "email": "borrowtest@example.com",
            "phone": "123-456-7890",
            "username": "borrowtest",
            "password": "borrowTestPassword",
            "role": "USER"
        }
        user_response = httpRequest.make_post_request('/auth/register', user_payload)
        assert user_response.status_code == 200 or user_response.status_code == 201
        ####
        post_data = {}
        
        users_list_response_get = httpRequest.make_get_request(USER_ENDPOINT)
        
        assert users_list_response_get.status_code == 200
        
        for user in users_list_response_get.json():
            if user["email"] == user_payload["email"]:
                post_data = user
                break
        
        new_id = post_data['userId']
        created_user_ids.append(new_id)

        ###

        # Create test book
        book_payload = {
            "title": "Borrow Test Book",
            "isbn": "9999999999999",
            "publishYear": 2023,
            "availableCopies": 5,
            "coverUrl": "test-url",
            "authorId": create_author_id,
            "categoryId": create_category_id
        }
        book_response = httpRequest.make_post_request('/books', book_payload)
        book_data = book_response.json()
        created_book_ids.append(book_data['bookId'])

        # Create borrow
        borrow_payload = {
            "userId": new_id,
            "bookId": book_data['bookId'],
            "borrowDate": "2023-01-01",
            "returnDate": None
        }
        borrow_response = httpRequest.make_post_request(ENDPOINT, borrow_payload)
        borrow_data = borrow_response.json()
        created_borrow_ids.append(borrow_data['borrowId'])

        # Verify borrow
        get_response = httpRequest.make_get_request(ENDPOINT + '/id/' + str(borrow_data['borrowId']))
        get_data = get_response.json()

        assert get_data["userId"] == borrow_payload["userId"]
        assert get_data["bookId"] == borrow_payload["bookId"]
        assert get_response.status_code == 200
        
    finally:
        # Delete
        for _id in created_borrow_ids:
            response = httpRequest.make_delete_request(ENDPOINT + '/id', _id)
            assert response.status_code == 204
        for _id in created_book_ids:
            response = httpRequest.make_delete_request('/books/id', _id)
            assert response.status_code == 204
        for _id in created_user_ids:
            response = httpRequest.make_delete_request('/users/id', _id)
            assert response.status_code == 204
        for _id in created_author_ids:
            response = httpRequest.make_delete_request("/authors" + '/id', _id)
            assert response.status_code == 204
        for _id in created_category_ids:
            response = httpRequest.make_delete_request("/categories" + '/id', _id)
            assert response.status_code == 204
    pass

##

def test_can_get_book_statistics(httpRequest=httpRequest, ENDPOINT="/books"):
    response = httpRequest.make_get_request(f"{ENDPOINT}/stats")
    data = response.json()
    
    assert response.status_code == 200
    assert isinstance(data, dict)
    assert "totalBooks" in data
    assert "availableBooks" in data

def test_can_get_overdue_loans(httpRequest=httpRequest, ENDPOINT="/borrows"):
    response = httpRequest.make_get_request(f"{ENDPOINT}/overdue")
    
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_can_get_books_by_category(httpRequest=httpRequest, ENDPOINT="/categories"):
    created_category_ids = []
    try:
        # Criar categoria
        category_payload = {
            "name": "Test Category"
        }
        category_response = httpRequest.make_post_request(ENDPOINT, category_payload)
        created_category_ids.append(category_response.json()["categoryId"])

        # Buscar livros por categoria
        response = httpRequest.make_get_request(f"{ENDPOINT}/id/{category_response.json()['categoryId']}/books")
        
        assert response.status_code == 200
        assert isinstance(response.json(), list)
    finally:
        for category_id in created_category_ids:
            httpRequest.make_delete_request(f"{ENDPOINT}/id", category_id)


def test_can_get_books_by_author(httpRequest=httpRequest, ENDPOINT="/authors"):
    created_author_ids = []
    try:
        # Criar autor
        author_payload = {
            "name": "Test Author",
            "birthDate": "2000-01-01"
        }
        author_response = httpRequest.make_post_request(ENDPOINT, author_payload)
        created_author_ids.append(author_response.json()["authorId"])

        # Buscar livros por autor
        response = httpRequest.make_get_request(f"{ENDPOINT}/id/{author_response.json()['authorId']}/books")
        
        assert response.status_code == 200
        assert isinstance(response.json(), list)
    finally:
        for author_id in created_author_ids:
            httpRequest.make_delete_request(f"{ENDPOINT}/id", author_id)