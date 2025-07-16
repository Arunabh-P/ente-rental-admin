import React, { useEffect } from 'react';
import HeightliteCard from '../components/highlite-card';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Login from './login';
import { useGetAuthDetailsQuery } from '../services/authDetailsApi';
import { hideLoader, showLoader } from '../app/loader-slice';

const Dashboard = () => {
    const dispatch = useDispatch();
  const admin = useSelector((state: RootState) => state.auth.admin);
  const { isLoading, isError } = useGetAuthDetailsQuery(undefined, {
    skip: !!admin,
  });
  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoading]);

  if (isLoading) return <div className='h-screen'></div>;
  if (isError || !admin) return <Login />;

  return (
    <div className='min-h-[90vh] w-full mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8'>
      <HeightliteCard text='View all Houses' goTo='/houses' />
    </div>
  );
};

export default Dashboard;
