import React from 'react'
import AuthButton from '../components/Auth/AuthButton.tsx'
import AuthInput from '../components/Auth/AuthInput.tsx'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/AuthService.ts'
import useAuthStore from '../services/AuthStore.ts'
import styles from './Register.module.css'

const Register = () => {
	const [name, setName] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [phone, setPhone] = React.useState('')
	const [username, setUsername] = React.useState('')
	const [password, setPassword] = React.useState('')

	const navigate = useNavigate();
	const {darkTheme} = useAuthStore();

	const colors = darkTheme
	? {
	    class: styles.light,
	}
	: {
	    class: styles.dark,
	};


	const handleRegister = async () => {
		try 
		{
			await registerUser(
				{
					name,
					email,
					phone,
					username,
					password,
					role: "USER"
				});
		
				navigate('/login', 
				{
					state: { successMessage: 'Registration successful! Please login.' },
					replace: true 
				});
		}
		catch (error) 
		{
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('Erro desconhecido ao registrar');
            }
        }
	}
	

	return (
    <>
		<div className={`${colors.class} w-full flex flex-col justify-center mt-16 p-8 gap-4`}>
			<h1 className='self-center text-4xl mb-4'>{"Create an account"}</h1>
			<AuthInput darkTheme={darkTheme} text='Name' value={name} onChange={(e) => setName(e.target.value)}></AuthInput>
			<AuthInput darkTheme={darkTheme} text='E-mail' value={email} onChange={(e) => setEmail(e.target.value)}></AuthInput>
			<AuthInput darkTheme={darkTheme} text='Phone number'  value={phone} onChange={(e) => setPhone(e.target.value)}></AuthInput>
			<AuthInput darkTheme={darkTheme} text='Username' value={username} onChange={(e) => setUsername(e.target.value)}></AuthInput>
			<AuthInput darkTheme={darkTheme} text='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></AuthInput>
			<AuthButton text='Register' onClick={handleRegister} darkTheme={darkTheme}/>
			<div className='flex self-center'>
				<p className=''>{"Already have an account?"}</p>
				<Link className='ml-1 ' to={"/login"}>Login</Link>
			</div>
        </div>
    </>			
	)
}

export default Register