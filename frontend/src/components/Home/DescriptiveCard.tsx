import React from 'react'

interface DescriptiveCardProps {
    title: string;
    description: string;
}

const DescriptiveCard = ({title, description} : DescriptiveCardProps) : React.ReactNode => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
        <p className="text-slate-600">{description}</p>
    </div>
  )
}

export default DescriptiveCard