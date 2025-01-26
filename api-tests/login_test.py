import requests

base_url = "localhost:8080/api"
endpoint = "/auth/login"

login_data = {
    "username": "b_2002",
    "password": "02040638"
}

try:
    response = requests.post(f"{base_url}{endpoint}", json=login_data)
    response.raise_for_status()
    
    token = response.json().get("token")
    
    if not token:
        raise ValueError("Token not found in response")
    
    headers = {"Authorization":f"Bearer {token}"}
    
    print(token)
    
except requests.exceptions.RequestException as e:
    print(f"Erro na requisição: {e}")
except ValueError as ve:
    print(ve)