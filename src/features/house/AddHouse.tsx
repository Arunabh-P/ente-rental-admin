import { useForm } from 'react-hook-form';
import { useCreateHouseMutation, useUploadPhotoMutation } from '../../services/houseApi';
import { CreateHouseInput } from '../../types/house';
import InputField from '../../components/input-field';
import SelectField from '../../components/select-field';
import CheckboxField from '../../components/check-box';
import MultiImageUploader from '../../components/multi-photo-upload';
import { useUploadHousePhotoMutation } from '../../services/uploadPhotoApi';
import TextArea from '../../components/text-area';
import { forwardRef, useImperativeHandle } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../app/loader-slice';

type AddHouseProps = {
  onClose: () => void
}
const AddHouse = forwardRef(({ onClose }: AddHouseProps, ref) => {
  const { register, handleSubmit, reset, setValue, getValues,
    watch,
    formState: { errors } } = useForm<CreateHouseInput>({
      defaultValues: {
        images: [],
        bachelorsAllowed:false,
        carParking:false,
        available:true
      },
    });
  useImperativeHandle(ref, () => ({
    resetForm: () => reset(),
  }));
  const dispatch = useDispatch();
  const [createHouse, { isLoading, isSuccess, isError }] = useCreateHouseMutation();
  const [uploadPhoto] = useUploadHousePhotoMutation();
  const onSubmit = async (data: CreateHouseInput) => {
    try {
      dispatch(showLoader());
      await createHouse(data).unwrap();
      reset();
      onClose();
    } catch (error) {
      onClose()
    } finally {
      dispatch(hideLoader());
    }
  };
  const watchedFields = watch();
  const watchedImages = watch('images') || [];
  const handleImageCropped = async (blob: Blob) => {
    const formData = new FormData();
    const file = new File([blob], 'house-image.jpg', { type: 'image/jpeg' });
    formData.append('file', file);
    try {
      dispatch(showLoader());
      const uploadRes = await uploadPhoto(formData).unwrap();
      const imageUrl = uploadRes.data.url;
      setValue('images', [...watchedImages, imageUrl]);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(hideLoader());
    }
  };
  return (
    <div className="w-full mx-auto p-6 ">
      <h2 className="text-2xl font-bold mb-6">Add New House</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className='grid grid-cols-1 md:grid-cols-2  gap-5 '>
          <InputField
            label="Title"
            name="title"
            value={watchedFields.title || ''}
            onChange={e => setValue('title', e.target.value)}
            required
          />
          <TextArea
            label="Description"
            name="description"
            rows={4}
            value={watchedFields.description || ''}
            onChange={e => setValue('description', e.target.value)}
            required
          />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 '>
          <InputField
            label="Location"
            name="location"
            value={watchedFields.location || ''}
            onChange={e => setValue('location', e.target.value)}
            required
          />
          <InputField
            label="Price"
            name="price"
            type="number"
            value={watchedFields.price || ''}
            onChange={e => setValue('price', parseFloat(e.target.value))}
            required
          />
          <SelectField
            label="Property Type"
            name="propertyType"
            value={watchedFields.propertyType || ''}
            onChange={e => setValue('propertyType', e.target.value as CreateHouseInput['propertyType'])}
            options={['1RK', '1BHK', '2BHK', '3BHK', '4BHK', 'Studio'].map(type => ({
              value: type,
              label: type,
            }))}
          />

          <SelectField
            label="Furnishing"
            name="furnishing"
            value={watchedFields.furnishing || ''}
            onChange={e => setValue('furnishing', e.target.value as CreateHouseInput['furnishing'])}
            options={['full', 'semi', 'no'].map(f => ({
              value: f,
              label: f,
            }))}
          />
          <InputField
            label="Bedrooms"
            name="bedrooms"
            type="number"
            value={watchedFields.bedrooms || ''}
            onChange={e => setValue('bedrooms', parseInt(e.target.value))}
            required
          />

          <InputField
            label="Bathrooms"
            name="bathrooms"
            type="number"
            value={watchedFields.bathrooms || ''}
            onChange={e => setValue('bathrooms', parseInt(e.target.value))}
            required
          />
        </div>

        <div className='flex items-center gap-4 flex-wrap'>
          <CheckboxField
            name="available"
            label="Available"
            checked={watchedFields.available}
            onChange={e => setValue('available', e.target.checked)}
          />

          <CheckboxField
            name="bachelorsAllowed"
            label="Bachelors Allowed"
            checked={watchedFields.bachelorsAllowed}
            onChange={e => setValue('bachelorsAllowed', e.target.checked)}
          />

          <CheckboxField
            name="carParking"
            label="Car Parking"
            checked={watchedFields.carParking}
            onChange={e => setValue('carParking', e.target.checked)}
          />
        </div>
        <MultiImageUploader
          images={watchedImages}
          onImagesChange={(imgs) => setValue('images', imgs)}
          onImageCropped={handleImageCropped}
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Add House'}
        </button>
      </form>
    </div>
  );
});

export default AddHouse;
