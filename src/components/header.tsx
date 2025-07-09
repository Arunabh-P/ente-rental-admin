import logo from '../assets/logo/ente-rental.png';

const Header = () => {
  return (
    <div className='w-full flex justify-between py-5'>
        <img src={logo} alt="logo" className='w-[200px]' />
      </div>
  )
}

export default Header