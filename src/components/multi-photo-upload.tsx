import React, { useRef, useState } from 'react';
import PhotoUpload from './photo-upload';
import PhotoCropper from './image-croper';

interface MultiImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  onImageCropped: (blob: Blob) => void;
}

const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({
  images,
  onImagesChange,
  onImageCropped,
}) => {
  const inputId = useRef(`multi-upload-${Date.now()}`);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const [imageToCrop, setImageToCrop] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageToCrop(file);
    setTempImageUrl(URL.createObjectURL(file));
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    onImageCropped(croppedBlob); 
    setTempImageUrl(null);
    setImageToCrop(null);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onImagesChange(newImages);
  };

  return (
    <div >
      <p className="font-medium">Upload House Images</p>
      <div className="flex gap-3 flex-wrap mb-3">
        {images.map((img, i) => (
          <div key={i} className="relative group w-24 h-24 ">
            <img src={img} alt={`Image ${i}`} className="rounded-md object-cover w-full h-full" />
            <button
              type="button"
              className="absolute top-1 right-1 text-white bg-black bg-opacity-60 rounded-full px-1 hover:bg-opacity-80"
              onClick={() => handleRemoveImage(i)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {!tempImageUrl && (
        <PhotoUpload
          previewUrl=""
          imageUploadId={inputId.current}
          handleImageChange={handleImageChange}
        />
      )}

      {tempImageUrl && (
        <PhotoCropper
          imageUrl={tempImageUrl}
          onCropComplete={handleCropComplete}
          onCancel={() => {
            setTempImageUrl(null);
            setImageToCrop(null);
          }}
        />
      )}
    </div>
  );
};

export default MultiImageUploader;
