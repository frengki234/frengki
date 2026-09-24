const Category = require("../models/category.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// GET ALL CATEGORIES
const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find().sort({ name: 1 });

  res.status(200).json({
    success: true,
    message: "Categories retrieved successfully",
    data: categories,
  });
});

// CREATE CATEGORY
const createCategory = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;

  const existingCategory = await Category.findOne({ name });

  if (existingCategory) {
    return next(new AppError("Category already exists", 409));
  }

  const category = await Category.create({
    name,
    description,
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

// UPDATE CATEGORY
const updateCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const category = await Category.findById(id);

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  if (name && name !== category.name) {
    const existingCategory = await Category.findOne({
      name,
      _id: { $ne: id },
    });

    if (existingCategory) {
      return next(new AppError("Category already exists", 409));
    }
  }

  category.name = name ?? category.name;
  category.description = description ?? category.description;

  await category.save();

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: category,
  });
});

// DELETE CATEGORY
const deleteCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  await Category.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
    data: category,
  });
});

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};