import React, { useRef, useState } from 'react';
import ReactCrop, {
  type Crop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
  imageUrl: string;
  onCropComplete: (croppedBlob: Blob) => void;
  onCancel: () => void;
}

const MAX_WIDTH = 320;
const MAX_HEIGHT = 320;

const PhotoCropper: React.FC<ImageCropperProps> = ({
  imageUrl,
  onCropComplete,
  onCancel,
}) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  function centerSquareCrop(mediaWidth: number, mediaHeight: number) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;

    e.currentTarget.style.maxWidth = `${MAX_WIDTH}px`;
    e.currentTarget.style.maxHeight = `${MAX_HEIGHT}px`;
    e.currentTarget.style.objectFit = 'contain';

    const initialCrop = centerSquareCrop(width, height);
    setCrop(initialCrop);
    setCompletedCrop(initialCrop);
  }

  const getCroppedImg = async (
    image: HTMLImageElement,
    cropArea: Crop
  ): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const size = Math.min(cropArea.width, cropArea.height);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    await new Promise((resolve) => {
      ctx.drawImage(
        image,
        cropArea.x * scaleX,
        cropArea.y * scaleY,
        size * scaleX,
        size * scaleY,
        0,
        0,
        size,
        size
      );
      resolve(undefined);
    });

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          resolve(blob);
        },
        'image/jpeg',
        1
      );
    });
  };

  const handleCropComplete = async () => {
    if (!completedCrop || !imgRef.current) {
      return;
    }

    try {
      const croppedBlob = await getCroppedImg(imgRef.current, completedCrop);
      onCropComplete(croppedBlob);
    } catch (e) {
      console.error('Error cropping image:', e);
    }
  };

  return (
    <div className="w-fit  max-w-[320px]">
      <ReactCrop
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
        aspect={1}
        circularCrop={false}
      >
        <img
          ref={imgRef}
          src={imageUrl}
          alt="Crop me"
          onLoad={onImageLoad}
          className="max-w-full h-auto"
          style={{
            maxWidth: MAX_WIDTH,
            maxHeight: MAX_HEIGHT,
            objectFit: 'contain',
          }}
        />
      </ReactCrop>
      <div className="mt-4 flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="bg-white border-2 w-[40px] h-[40px] rounded-lg flex justify-center items-center hover:bg-green-100 border-green-800 cursor-pointer"
        >
          <img
            src="https://res.cloudinary.com/dku0lexry/image/upload/v1738501224/personal-website/icons/cross_z1gbtp.png"
            width={22}
            height={22}
            alt="cancel"
          />
        </button>
        <button
          type="button"
          onClick={handleCropComplete}
          className="bg-green-800 border-2 w-[40px] h-[40px] rounded-lg flex justify-center items-center hover:bg-green-900 border-green-800 cursor-pointer"
        >
          <img
            src="https://res.cloudinary.com/dku0lexry/image/upload/v1738501614/personal-website/icons/tool-crop-white_kkwb3f.png"
            width={27}
            height={27}
            alt="crop"
          />
        </button>
      </div>
    </div>
  );
};

export default PhotoCropper;
