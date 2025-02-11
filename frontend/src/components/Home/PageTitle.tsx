import styles from './/PageTitle.module.css'

interface PageTitleProps
{
    title : string;
    description : string;
    darkTheme: boolean;
}

const PageTitle = ({title, description, darkTheme} : PageTitleProps) : React.ReactNode => {
  const colors = darkTheme
      ? {
        background: 'bg-gradient-to-r from-slate-100 to-slate-200',
        text: 'text-slate-800',
        description: 'text-slate-600',
        class : styles.light
      }
      : {
          background: '',
          text: 'text-gray-100',
          description: 'text-gray-300',
          class : styles.dark
      };

  return (
      <div className={colors.class}>
          <div className='max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center'>
              <h1 className={`text-4xl font-bold mb-4 ${colors.text}`}>{title}</h1>
              <p className={`text-lg ${colors.description}`}>{description}</p>
          </div>
      </div>
  )
}

export default PageTitle