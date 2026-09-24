const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");
const { protect } = require("../middlewares/auth.middleware");

router.use(protect);

// GET semua kategori
router.get("/", categoryController.getAllCategories);

// POST kategori
router.post("/", categoryController.createCategory);

// PUT kategori
router.put("/:id", categoryController.updateCategory);

// DELETE kategori
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;