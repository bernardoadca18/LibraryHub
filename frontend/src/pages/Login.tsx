import React from 'react'
import AuthButton from '../components/Auth/AuthButton.tsx'
import AuthInput from '../components/Auth/AuthInput.tsx'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/AuthService.ts'
import useAuthStore from '../services/AuthStore.ts'

const Login = () => {
  const [username, setUsername] = React.useState('')
	const [password, setPassword] = React.useState('')

  const navigate = useNavigate();

  const handleLogin = async () => {
    try
    {
      const response = await login({
        username,
        password
      });
      useAuthStore.getState().login(response.token);
      useAuthStore.getState().initialize();

      navigate('/', { state: { successMessage: 'Login succesful' } });
    }
    catch (error)
    {
      if (error instanceof Error) {
        alert(error.message);
    } else {
        alert('Erro desconhecido ao fazer login');
    }
    }


  }

  return (
    <>
      <div className='w-full flex flex-col justify-center mt-16 p-8 gap-4 '>
        <h1 className='self-center text-4xl mb-4'>{"Login"}</h1>
        <AuthInput type={"text"} value={username} onChange={(e) => setUsername(e.target.value)} text='Username'></AuthInput>
        <AuthInput type={"password"} text='Password' value={password} onChange={(e) => setPassword(e.target.value)}></AuthInput>
        <AuthButton text='Login' onClick={handleLogin}/>
        <div className='flex self-center'>
          <p className=''>{"Doesn't have an account?"}</p>
          <Link className='ml-1 ' to={"/register"}>Register</Link>
        </div>
      </div>
    </>		
  )
}

export default Login