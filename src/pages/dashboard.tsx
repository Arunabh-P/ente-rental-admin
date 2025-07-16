import React from 'react';
import HeightliteCard from '../components/highlite-card';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Login from './login';
import { useGetAuthDetailsQuery } from '../services/authDetailsApi';

const Dashboard = () => {
  const admin = useSelector((state: RootState) => state.auth.admin);
  const { isLoading, isError } = useGetAuthDetailsQuery(undefined, {
    skip: !!admin,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !admin) return <Login />;

  return (
    <div className='min-h-[90vh] w-full mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8'>
      <HeightliteCard text='View all Houses' goTo='/houses' />
    </div>
  );
};

export default Dashboard;
