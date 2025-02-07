
interface PageTitleProps
{
    title : string;
    description : string;
}

const PageTitle = ({title, description} : PageTitleProps) : React.ReactNode => {
  return (
    <div className='bg-gradient-to-r from-slate-100 to-slate-200 mt-16'>
        <div className='max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center'>
            <h1 className='text-4xl font-bold text-slate-800 mb-4'>{title}</h1>
            <p className="text-slate-600 text-lg">{description}</p>
        </div>
    </div>
  )
}

export default PageTitle