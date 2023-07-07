import slugify from "slugify";
import { Request, Response } from "express";

import CategoryModel from "../models/Category";
import RecipeModel from "../models/Recipe";

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find({}).populate("recipes");

    res.status(200).json(categories);
  } catch (error: unknown | any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a category by slug
// @route   GET /api/v1/categories/:slug
// @access  Public
const getCategory = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    // populate recipes with owner name and image
    const category = await CategoryModel.findOne({ slug }).populate({
      path: "recipes",
      populate: {
        path: "owner",
        select: "name image",
      },
    })

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error: unknown | any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a category
// @route   POST /api/v1/categories
// @access  Private/Admin
const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, image } = req.body;
    const category = await CategoryModel.create({
      name,
      slug: slugify(name),
      image,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error: unknown | any) {
    res.status(500).json({ message: error });
  }
};

// @desc    Update a category
// @route   PUT /api/v1/categories/:id
// @access  Private/Admin
const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      updatedCategory,
    });
  } catch (error: unknown | any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
// @access  Private/Admin
const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error: unknown | any) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
