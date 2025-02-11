import React from 'react'

interface CategoryCardProps {
    name: string;
}

const CategoryCard = ({name} : CategoryCardProps) : React.ReactNode => {
  return (
    <div className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border-2 flex flex-col border-slate-100 p-4 justify-center text-center min-h-32'>
        <h3 className='font-bold text-2xl'>{name}</h3>
    </div>
  )
}

export default CategoryCard