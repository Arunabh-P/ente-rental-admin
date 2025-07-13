import React, { FC } from "react";
interface DescisionProp {
  title?: string;
  description: string;
  okAction: () => void | Promise<void>;
  loading: boolean;
  cancelAction: () => void;
  okBtnText: string;
  cancelBtnText: string;
}
const DecisionAlert: FC<DescisionProp> = ({
  title,
  description,
  okAction,
  loading,
  cancelAction,
  okBtnText,
  cancelBtnText,
}) => {
  return (
    <div className="text-center max-w-[380px]">
      {title && (
        <h2 className="font-medium text-[16px] md:text-[18px] lg:text-[18px]">
          {title}
        </h2>
      )}
      <p className="mb-4 text-gray-700 text-[14px] md:text-[16px]">
        {description}
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={okAction}
          disabled={loading}
          className="cursor-pointer py-1 px-2 text-[14px] md:text-[16px] font-medium bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
        >
          {okBtnText}
        </button>
        <button
          onClick={cancelAction}
          className="bg-white border-2 border-black rounded-md text-black py-1 px-2 text-[14px] md:text-[16px] font-medium hover:bg-black hover:text-white cursor-pointer"
        >
          {cancelBtnText}
        </button>
      </div>
    </div>
  );
};

export default DecisionAlert;
