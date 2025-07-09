import { FC, ReactNode } from 'react'
import LoaderBox from './components/loader'
interface layoutProps{
    children : ReactNode;
}
const Layout:FC<layoutProps> = ({children}) => {
    return (
        <>
      <LoaderBox isFixed />
      {children}
    </>
    )
}

export default Layout