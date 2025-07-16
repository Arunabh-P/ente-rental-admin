import React, { useState } from 'react';
import { useAdminLoginMutation } from '../services/authApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showToast } from '../app/tost-slice';
import bgImg from '../assets/background/bg-one.jpg';
import InputField from '../components/input-field';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminLogin, { isLoading }] = useAdminLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await adminLogin({ email, password }).unwrap();
    dispatch(
      showToast({
        title: 'Login Successful',
        message: `Welcome, ${user.data.name}`,
      })
    );
    navigate('/');
  };

  return (
    <div
      className="h-[90vh] w-full bg-cover sm:bg-contain bg-no-repeat bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-8 py-10 rounded-2xl shadow-2xl
                   bg-white/30 backdrop-blur-sm border border-black text-black
                    m-2"
      >
        <h1 className=" text-center  text-[20px] md:text-[24px] font-bold uppercase ">
          Admin Login
        </h1>
        <div className="grid grid-cols-1 gap-2 mb-5">
          <InputField
           label="Email"
           placeholder='Enter your email'
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='rounded-lg'
          />
           <InputField
           label="Password"
           placeholder='Enter your password'
            name="password"
            type="password"
            value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
           disabled={isLoading || !email || !password}
          className={` ${!email || !password || isLoading ? 'bg-black/35 text-black cursor-not-allowed' : 'cursor-pointer bg-black hover:bg-transparent hover:text-black text-white'} border border-black w-full text-[16px] md:text-[18px] uppercase  transition py-2 rounded-lg font-semibold `}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
