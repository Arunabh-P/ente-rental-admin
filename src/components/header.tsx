import logo from '../assets/logo/ente-rental.png';

const Header = () => {
  return (
    <div className='bg-white z-50 w-full flex justify-between py-5 shadow-md px-5 md:px-12 lg:px-16 2xl:px-[96px] sticky top-0'>
        <img src={logo} alt="logo" className='w-[160px] md:w-[200px]' />
      </div>
  )
}

export default Header