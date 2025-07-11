import React, { FC, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

type ImageSliderProps = {
    images: string[]
}

const ImageSlider: FC<ImageSliderProps> = ({ images }) => {
    const [imageData, setImageData] = useState<{ index: number; url: string }>({
        index: 0, url: images[0]
    });
    const { index } = imageData;
    const handleNextImage = () => {
        if (index < images.length - 1) {
            setImageData({
                index: index + 1,
                url: images[index + 1],
            });
        }
    };

    const handlePreviousImage = () => {
        if (index > 0) {
            setImageData({
                index: index - 1,
                url: images[index - 1],
            });
        }
    };
    return (
        <div
            style={{
                backgroundImage: `url(${imageData.url})`,
            }}
            className="bg-cover relative  bg-center h-[330px] w-[330px] sm:w-[400px] sm:h-[400px] lg:h-[500px] lg:w-[500px] xl:h-[550px] xl:w-[550px]  flex justify-between items-end px-4 py-2 gap-2 rounded-xl shadow-md"
        >
            <button
                onClick={handlePreviousImage}
                disabled={index <= 0}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <MdKeyboardArrowLeft size={30} />
            </button>
            <button
                onClick={handleNextImage}
                disabled={index >= images.length - 1}
                className="absolute right-2 top-1/2 -translate-y-1/2  text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <MdKeyboardArrowRight
                    size={30} />
            </button>
            <span className="text-white text-[16px] p-4 font-medium">
                {index + 1} / {images.length}
            </span>
        </div>
    )
}

export default ImageSlider