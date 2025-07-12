import { useForm } from "react-hook-form";
import {
  useUpdateHouseMutation,
  useUploadPhotoMutation,
} from "../../services/houseApi";
import { CreateHouseInput, UpdateHouseInput } from "../../types/house";
import InputField from "../../components/input-field";
import SelectField from "../../components/select-field";
import CheckboxField from "../../components/check-box";
import MultiImageUploader from "../../components/multi-photo-upload";
import TextArea from "../../components/text-area";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../app/loader-slice";
import { facing, furnishCategory, houseType, rooms } from "../../constants/house";
import { yupResolver } from "@hookform/resolvers/yup";
import { createHouseSchema } from "../../validations/house";

// Utility to clean fields not allowed in form submission
const sanitizeHouseData = (data: any) => {
  const { _id, slug, createdAt, updatedAt, __v, ...cleaned } = data;
  return cleaned;
};

type UpdateHouseProps = {
  houseData: UpdateHouseInput ;
  onClose: () => void;
};

const UpdateHouse = forwardRef(({ houseData, onClose }: UpdateHouseProps, ref) => {
 const cleanedDefaultValues = sanitizeHouseData(houseData);
    const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<CreateHouseInput>({
    resolver: yupResolver(createHouseSchema),
    defaultValues: cleanedDefaultValues, 
  });

  useImperativeHandle(ref, () => ({
    resetForm: () => reset(cleanedDefaultValues),
  }));

  const dispatch = useDispatch();
  const [updateHouse, { isLoading }] = useUpdateHouseMutation();
  const [uploadPhoto] = useUploadPhotoMutation();

  const onSubmit = async (data: CreateHouseInput) => {
    try {
      dispatch(showLoader());
      await updateHouse({ id: houseData._id, ...data }).unwrap();
      reset();
      onClose();
    } catch (error) {
      onClose();
    } finally {
      dispatch(hideLoader());
    }
  };

  const watchedFields = watch();
  const watchedImages = watch("images") || [];

  const handleImageCropped = async (blob: Blob) => {
    const formData = new FormData();
    const file = new File([blob], "house-image.jpg", { type: "image/jpeg" });
    formData.append("file", file);
    try {
      dispatch(showLoader());
      const uploadRes = await uploadPhoto(formData).unwrap();
      const imageUrl = uploadRes.data.url;
      setValue("images", [...watchedImages, imageUrl]);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div className="w-full mx-auto p-6 ">
      <h2 className="text-2xl font-bold mb-6">Update House</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Title"
            name="title"
            value={watchedFields.title || ""}
            onChange={(e) => setValue("title", e.target.value)}
            error={errors.title?.message}
          />
          <TextArea
            label="Description"
            name="description"
            rows={4}
            value={watchedFields.description || ""}
            onChange={(e) => setValue("description", e.target.value)}
            error={errors.description?.message}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <InputField
            label="Location"
            name="location"
            value={watchedFields.location || ""}
            onChange={(e) => setValue("location", e.target.value)}
            error={errors.location?.message}
          />
          <InputField
            label="Price"
            name="price"
            type="number"
            value={watchedFields.price || ""}
            onChange={(e) => setValue("price", parseFloat(e.target.value))}
            error={errors.price?.message}
          />
          <SelectField
            label="Property Type"
            name="propertyType"
            value={watchedFields.propertyType || ""}
            onChange={(e) =>
              setValue("propertyType", e.target.value as CreateHouseInput["propertyType"])
            }
            options={houseType}
            error={errors.propertyType?.message}
          />
          <SelectField
            label="Furnishing"
            name="furnishing"
            value={watchedFields.furnishing || ""}
            onChange={(e) =>
              setValue("furnishing", e.target.value as CreateHouseInput["furnishing"])
            }
            options={furnishCategory}
            error={errors.furnishing?.message}
          />
          <SelectField
            label="Bedrooms"
            name="bedrooms"
            value={watchedFields.bedrooms || ""}
            onChange={(e) =>
              setValue("bedrooms", e.target.value as CreateHouseInput["bedrooms"])
            }
            options={rooms}
            error={errors.bedrooms?.message}
          />
          <SelectField
            label="Bathrooms"
            name="bathrooms"
            value={watchedFields.bathrooms || ""}
            onChange={(e) =>
              setValue("bathrooms", e.target.value as CreateHouseInput["bathrooms"])
            }
            options={rooms}
            error={errors.bathrooms?.message}
          />
          <InputField
            label="Built-up Area (sq. ft.)"
            name="builtUpAreaSqFt"
            type="number"
            value={watchedFields.builtUpAreaSqFt || ""}
            onChange={(e) => setValue("builtUpAreaSqFt", parseFloat(e.target.value))}
            error={errors.builtUpAreaSqFt?.message}
          />
          <InputField
            label="Carpet Area (sq. ft.)"
            name="carpetAreaSqFt"
            type="number"
            value={watchedFields.carpetAreaSqFt || ""}
            onChange={(e) => setValue("carpetAreaSqFt", parseFloat(e.target.value))}
            error={errors.carpetAreaSqFt?.message}
          />
          <InputField
            label="Total Floors"
            name="totalFloors"
            type="number"
            value={watchedFields.totalFloors || ""}
            onChange={(e) => setValue("totalFloors", parseInt(e.target.value))}
            error={errors.totalFloors?.message}
          />
          <InputField
            label="Floor Number"
            name="floorNumber"
            type="number"
            value={watchedFields.floorNumber || ""}
            onChange={(e) => setValue("floorNumber", parseInt(e.target.value))}
            error={errors.floorNumber?.message}
          />
          <InputField
            label="Age of Property (years)"
            name="ageOfProperty"
            type="number"
            value={watchedFields.ageOfProperty || ""}
            onChange={(e) => setValue("ageOfProperty", parseInt(e.target.value))}
            error={errors.ageOfProperty?.message}
          />
          <SelectField
            label="Facing"
            name="facing"
            value={watchedFields.facing || ""}
            onChange={(e) => setValue("facing", e.target.value as CreateHouseInput["facing"])}
            options={facing}
            error={errors.facing?.message}
          />
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <CheckboxField
            name="available"
            label="Available"
            checked={watchedFields.available}
            onChange={(e) => setValue("available", e.target.checked)}
            error={errors.available?.message}
          />
          <CheckboxField
            name="bachelorsAllowed"
            label="Bachelors Allowed"
            checked={watchedFields.bachelorsAllowed}
            onChange={(e) => setValue("bachelorsAllowed", e.target.checked)}
            error={errors.bachelorsAllowed?.message}
          />
          <CheckboxField
            name="carParking"
            label="Car Parking"
            checked={watchedFields.carParking}
            onChange={(e) => setValue("carParking", e.target.checked)}
            error={errors.carParking?.message}
          />
        </div>

        {watchedFields.carParking && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <InputField
              label="Car Parking Count"
              name="carParkingCount"
              type="number"
              value={watchedFields.carParkingCount || ""}
              onChange={(e) => setValue("carParkingCount", parseInt(e.target.value))}
              error={errors.carParkingCount?.message}
            />
          </div>
        )}

        <MultiImageUploader
          images={watchedImages}
          onImagesChange={(imgs) => setValue("images", imgs)}
          onImageCropped={handleImageCropped}
        />
        <p className="text-red-600">{errors.images?.message}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <button
            type="submit"
            className="mt-2 w-full uppercase gap-2 bg-black border-2 border-black rounded-lg text-white p-2 text-[16px] md:text-[18px] font-medium hover:bg-white hover:text-black cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update House"}
          </button>
        </div>
      </form>
    </div>
  );
});

export default UpdateHouse;
