import React from 'react'

interface AuthInputProps {
    text : string;
    value : string;
    onChange : (e : React.ChangeEvent<HTMLInputElement>) => void;
    type? : string
}

const AuthInput : React.FC<AuthInputProps> = ({ text, value, onChange, type } : AuthInputProps) : React.ReactNode => {
  return (
    <div className='flex flex-col self-center'>
        <label className='text-xl mb-2 text-gray-700'>{text}</label>
        <input type={type} placeholder={text} value={value} onChange={onChange} className={`bg-gray-100 text-black text-xl p-4 border-gray-300 border-2 rounded-xl w-96 h-12`}></input>
    </div>
  )
}

export default AuthInput