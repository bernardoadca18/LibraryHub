import React from 'react'

interface CrudInputProps {
    text : string;
    value : string;
    onChange : (e : React.ChangeEvent<HTMLInputElement>) => void;
    type? : string;
    darkTheme: boolean;
}

const CrudInput : React.FC<CrudInputProps> = ({ text, value, onChange, type, darkTheme } : CrudInputProps) : React.ReactNode => {
  const colors = darkTheme
  ? {//light
      textColor: 'text-black'
  }
  : {//dark
      textColor: 'text-white'
  };
  return (
    <div className='flex flex-col self-center'>
        <label className={`text-xl mb-2 ${colors.textColor}`}>{text}</label>
        <input type={type} placeholder={text} value={value} onChange={onChange} className={`bg-gray-100 text-black text-xl p-4 border-gray-300 border-2 rounded-xl w-96 h-12`}></input>
    </div>
  )
}

export default CrudInput