import React, { FC, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";

interface NotFoundProps {
  text: string;
  statusCode: number;
  backTo?: string;
}
const NotFound: FC<NotFoundProps> = ({ text, statusCode, backTo }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (backTo) {
      const timer = setTimeout(() => {
        navigate(backTo);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [backTo]);
  return (
    <div className="w-full h-[95vh] md:h-[450px] lg:h-[500px] flex flex-col justify-center items-center">
      <DotLottieReact
        src="https://lottie.host/9df49540-7b2f-4778-9cea-fced5c2e886d/JvZxohhxDy.lottie"
        loop
        autoplay
        className="w-[300px] lg:w-[350px]"
      />
      <h3 className="font-semibold text-[22px] md:text-[26px]">{statusCode}</h3>
      <p className="font-normal text-[18px] md:text-[20px] mt-2">{text}</p>
    </div>
  );
};

export default NotFound;
