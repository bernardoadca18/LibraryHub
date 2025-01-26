import requests

class TestAuth:
    def __init__(self, base_url):
        self.base_url = base_url
        self.token = None

    def authenticate(self):
        login_data = {
            "username": "",
            "password": ""
        }
        
        headers = {"Content-Type": "application/json"}
        
        try:
            response = requests.post(f"{self.base_url}/api/auth/login", json=login_data, headers=headers)
            response.raise_for_status()
            self.token = response.json().get("token")
            return self.token
        except requests.exceptions.RequestException as e:
            print(f"Error during authentication: {e}")
            return None
        
    def get_headers(self):
        if not self.token:
            self.authenticate()
        return {"Authorization": f"Bearer {self.token}"}

myTestAuth = TestAuth("http://localhost:8080")

myToken = myTestAuth.authenticate()

print(myToken)
my_headers = myTestAuth.get_headers()

response = requests.get(url="http://localhost:8080/api/users", headers=my_headers)


print(response.status_code)
print(response.json())