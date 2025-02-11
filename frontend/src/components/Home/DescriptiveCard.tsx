import React from 'react'
import styles from './DescriptiveCard.module.css'

interface DescriptiveCardProps {
  title: string;
  description: string;
  darkTheme: boolean;
}

const DescriptiveCard = ({title, description, darkTheme} : DescriptiveCardProps) : React.ReactNode => {
  const colors = darkTheme
      ? {
          background: 'bg-white',
          border: 'border-slate-100',
          text: 'text-slate-800',
          description: 'text-slate-600',
          class: styles.light
          
      }
      : {
          background: 'bg-gray-800',
          border: '',
          text: 'text-gray-100',
          description: 'text-gray-300',
          class: styles.dark
      };

  return (
      <div className={`p-6 rounded-lg shadow-sm border ${colors.class} ${colors.border}`}>
          <h3 className={`text-2xl font-bold ${colors.text}`}>{title}</h3>
          <p className={colors.description}>{description}</p>
      </div>
  )
}

export default DescriptiveCard