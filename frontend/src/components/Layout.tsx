import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer.tsx'

const Layout = () : React.ReactNode => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
            <Outlet />
            </main>

            <Footer />
        </div>
    )
}

export default Layout