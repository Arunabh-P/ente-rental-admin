import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface Props {
    isFixed?: boolean;
    background?: string;
}

const LoaderBox: React.FC<Props> = ({ isFixed = false, background }) => {
    const isLoading = useSelector((state: RootState) => state.loader.isLoading);
    if (!isLoading) return null;
    return (

        <div
            className={`${isFixed ? 'fixed' : 'absolute'
                }  top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-70 z-50`}
            style={{ zIndex: 900, background: background || 'rgba(255, 255, 255, 0.7)' }}
        >
            <img src="../assets/logo/house-loading.gif" alt="" className='w-[90px]' />
        </div>
    )
};

export default LoaderBox;
