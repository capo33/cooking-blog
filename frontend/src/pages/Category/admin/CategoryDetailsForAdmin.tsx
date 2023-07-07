import React from 'react'
import { useParams } from 'react-router-dom'

const CategoryDetailsForAdmin = () => {
  const { slug } = useParams<{ slug: string }>()
  return (
    <div className='p-5 mt-10 max-w-md'>
    <div className='p-8 rounded border border-gray-200'>
      <h1 className='font-medium text-3xl'>Update Category</h1>
      <form>
        <div className='mt-8 grid gap-4'>
          <div>
            <label
              htmlFor='name'
              className='text-sm text-gray-700 block mb-1 font-medium'
            >
              Name
            </label>
            <input
              type='text'
              name='name'
              // value={name}
              // id='name'
              // onChange={(e) => setName(e.target.value)}
              className='bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
              placeholder='e.g. Sports'
            />
          </div>
        </div>

        <div className='space-x-4 mt-8'>
          <button
            type='submit'
            // onClick={handleUpdateCategory}
            className='py-2 px-4 bg-green-800 text-white rounded hover:bg-green-700 active:bg-green-700 disabled:opacity-50'
          >
            Update
          </button>
          <button
            type='submit'
            // onClick={handleDeleteCategory}
            className='py-2 px-4 bg-red-800 text-white rounded hover:bg-red-700 active:bg-red-700 disabled:opacity-50'
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default CategoryDetailsForAdmin