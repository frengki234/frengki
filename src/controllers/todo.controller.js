const todoService = require("../services/todo.service");
const activityLogService = require("../services/activityLog.service");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Helper function untuk cek kepemilikan/akses
const checkOwnershipOrAdmin = (todo, user) => {
  if (!todo || !todo.created_by) return false;

  const ownerId = todo.created_by._id
    ? todo.created_by._id.toString()
    : todo.created_by.toString();

  return ownerId === user._id.toString() || user.role === "admin";
};

// CREATE TODO
const createTodo = catchAsync(async (req, res, next) => {
  const { title, description, category } = req.body;

  const todo = await todoService.createTodo({
    title,
    description,
    category,
    created_by: req.user._id,
  });

  // Catat aktivitas CREATE
  await activityLogService.createActivityLog({
    action: "CREATE",
    todo: todo._id,
    user: req.user._id,
    description: `Todo "${todo.title}" dibuat`,
  });

  res.status(201).json({
    success: true,
    message: "Todo created successfully",
    data: todo,
  });
});

// GET ALL TODOS
const getAllTodos = catchAsync(async (req, res, next) => {
  const {
    page,
    limit,
    completed,
    search,
    category,
    archived,
    sortBy,
    order,
  } = req.query;

  const queryOptions = {
    page,
    limit,
    completed,
    search,
    category,
    archived,
    sortBy,
    order,
  };

  const result =
    req.user.role === "admin"
      ? await todoService.getAllTodosForAdmin(queryOptions)
      : await todoService.getAllTodos(req.user._id, queryOptions);

  res.status(200).json({
    success: true,
    message: "Todos retrieved successfully",
    data: result.todos,
    pagination: result.pagination,
  });
});

// GET TODO BY ID
const getTodoById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const todo = await todoService.getTodoById(id);

  if (!todo) {
    return next(new AppError("Todo not found", 404));
  }

  if (!checkOwnershipOrAdmin(todo, req.user)) {
    return next(
      new AppError(
        "You do not have permission to access this todo",
        403
      )
    );
  }

  res.status(200).json({
    success: true,
    message: "Todo retrieved successfully",
    data: todo,
  });
});

// UPDATE TODO
const updateTodo = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, completed, category } = req.body;

  const existingTodo = await todoService.getTodoById(id);

  if (!existingTodo) {
    return next(new AppError("Todo not found", 404));
  }

  if (!checkOwnershipOrAdmin(existingTodo, req.user)) {
    return next(
      new AppError(
        "You do not have permission to update this todo",
        403
      )
    );
  }

  const updatedTodo = await todoService.updateTodo(id, {
    title,
    description,
    completed,
    category,
    updated_by: req.user._id,
  });

  await activityLogService.createActivityLog({
    action: "UPDATE",
    todo: updatedTodo._id,
    user: req.user._id,
    description: `Todo "${updatedTodo.title}" diubah`,
  });

  res.status(200).json({
    success: true,
    message: "Todo updated successfully",
    data: updatedTodo,
  });
});

// DELETE TODO
const deleteTodo = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // 1. Cari data todo terlebih dahulu
  const existingTodo = await todoService.getTodoById(id);

  if (!existingTodo) {
    return next(new AppError("Todo not found", 404));
  }

  // 2. Cek otorisasi / izin akses
  if (!checkOwnershipOrAdmin(existingTodo, req.user)) {
    return next(
      new AppError(
        "You do not have permission to delete this todo",
        403
      )
    );
  }

  // 3. Catat log sebelum/saat penghapusan
  await activityLogService.createActivityLog({
    action: "DELETE",
    todo: existingTodo._id,
    user: req.user._id,
    description: `Todo "${existingTodo.title}" dihapus`,
  });

  // 4. Hapus data dari database
  await todoService.deleteTodo(id);

  res.status(200).json({
    success: true,
    message: "Todo deleted successfully",
    data: existingTodo,
  });
});

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};