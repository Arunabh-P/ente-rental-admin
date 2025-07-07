import React from 'react';

interface ImageUploadSectionProps {
  previewUrl: string;
  imageUploadId: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoUpload: React.FC<ImageUploadSectionProps> = ({
  previewUrl,
  imageUploadId,
  handleImageChange,
}) => (
  <div>
    <div className="mt-1 flex items-center justify-start pb-5">
      <div className="relative">
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
          id={imageUploadId}
        />
        <label
          htmlFor={imageUploadId}
          className="cursor-pointer bg-white border border-secondary rounded-md flex items-center justify-center hover:bg-primary-light"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              width={128}
              height={128}
              className="object-cover rounded-md"
            />
          ) : (
            <div className="h-32 w-32 flex items-center justify-center rounded-md">
              <img
                src="https://res.cloudinary.com/dku0lexry/image/upload/v1738396024/personal-website/icons/camera_xfjxt8.png"
                width={25}
                height={25}
                alt="Upload Photo"
              />
            </div>
          )}
        </label>
      </div>
    </div>
  </div>
);

export default PhotoUpload;
