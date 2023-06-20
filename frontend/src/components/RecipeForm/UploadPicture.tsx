import React from "react";

type UploadPictureProps = {
  uploading: boolean;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const UploadPicture = ({ uploading, handleUpload }: UploadPictureProps) => {
  return (
    <div className='mt-1'>
      <label className='text-lg leading-6 font-medium text-gray-900'>
        Picture
      </label>
      <p className='mt-1 text-sm text-gray-500'>
        Picture of the food after it's complete.
      </p>
      <div className='mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
        <div className='space-y-1 text-center'>
          <svg
            className='mx-auto h-12 w-12 text-gray-400'
            stroke='currentColor'
            fill='none'
            viewBox='0 0 48 48'
            aria-hidden='true'
          >
            <path
              d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <div className='flex text-sm text-gray-600'>
            <label
              htmlFor='image'
              className='relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500'
            >
              <input
                id='image'
                type='file'
                name='image'
                onChange={handleUpload}
                className='  outline-none'
              />
            </label>
          </div>
          {uploading && <p>Uploading image...</p>}
        </div>
      </div>
    </div>
  );
};

export default UploadPicture;
