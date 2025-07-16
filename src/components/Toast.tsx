import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../app/tost-slice';
import { MdClose } from 'react-icons/md';
import { RootState } from '../app/store';

const Toast = () => {
  const dispatch = useDispatch();
  const { isVisible, title, message } = useSelector((state: RootState) => state.toast);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  return (
    <div
      className={`fixed bottom-4 left-4 flex items-center gap-2 bg-white border border-gray-200 shadow-lg rounded-lg p-4 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
    >
      <div className="flex-1">
        <p className="font-medium">{title??""}</p>
        <p className="font-normal">{message??""}</p>
      </div>

      <button
        onClick={() => dispatch(hideToast())}
        className="p-1 hover:bg-gray-100 rounded-full"
      >
        <MdClose />
      </button>
    </div>
  );
};

export default Toast;
