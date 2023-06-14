import slugify from "slugify";
import { Request, Response } from "express";

import CategoryModel from "../models/Category";
import asyncHandler from "../middlewares/asyncHandler";

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await CategoryModel.find({});

  res.status(200).json(categories);
});

// @desc    Get a category by id
// @route   GET /api/v1/categories/:slug
// @access  Public
const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const category = await CategoryModel.findOne({ slug });

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  res.status(200).json(category);
});

// @desc    Create a category
// @route   POST /api/v1/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;

  const category = await CategoryModel.create({
    name,
    slug: slugify(name, { lower: true }),
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    category,
  });
});

// @desc    Update a category
// @route   PUT /api/v1/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedCategory = await CategoryModel.findByIdAndUpdate(
    id,
    {
      name,
      slug: slugify(name, { lower: true }),
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    updatedCategory,
  });
});

// @desc    Delete a category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedCat = await CategoryModel.findOne({ _id: id });

  if (!deletedCat) {
    res.status(404);
    throw new Error("Category not found");
  }

  await deletedCat.deleteOne();
  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});

export {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
