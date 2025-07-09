import { FC, ReactNode } from 'react'
import LoaderBox from './components/loader'
import Header from './components/header';
interface layoutProps{
    children : ReactNode;
}
const Layout:FC<layoutProps> = ({children}) => {
    return (
        <div className='px-5 md:px-12 lg:px-16 2xl:px-[96px]'>
      <LoaderBox isFixed />
      <Header/>
      {children}
    </div>
    )
}

export default Layout