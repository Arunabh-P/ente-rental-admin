import { FC, ReactNode } from 'react'
import LoaderBox from './components/loader'
import Header from './components/header';
import Footer from './components/footer';
import Toast from './components/Toast';
interface layoutProps {
    children: ReactNode;
}
const Layout: FC<layoutProps> = ({ children }) => {
    return (
        <>
            <LoaderBox isFixed />
            <Toast/>
            <Header />
            <div className='px-5 md:px-12 lg:px-16 2xl:px-[96px] '>
                {children}
                <Footer />
            </div>
        </>
    )
}

export default Layout