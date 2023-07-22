import axios from "axios";

import { CATEGORY_URL } from "../../../constants/constants";
import { ICategoryData } from "../../../interfaces/CategoryInterface";
 
// *************************** Category *************************** //
// get all categories
const getAllCategories = async () => {
  const response = await axios.get(`${CATEGORY_URL}`);
  return response.data;
};

// get category by slug
const getCategoryBySlug = async (slug: string) => {
  const response = await axios.get(`${CATEGORY_URL}/${slug}`);
  return response.data;
};

// create category
const createCategory = async (categoryData: ICategoryData, token: string) => {
  const response = await axios.post(
    `${CATEGORY_URL}`,
    { ...categoryData },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data);

  return response.data;
};

// update category
const updateCategory = async (
  id: string,
  categoryData: ICategoryData,
  token: string
) => {
  const response = await axios.put(
    `${CATEGORY_URL}/${id}`,
    { ...categoryData },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// delete category
const deleteCategory = async (id: string, token: string) => {
  const response = await axios.delete(`${CATEGORY_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const categoryServices = {
  getAllCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryServices;
