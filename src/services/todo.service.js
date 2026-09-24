const Todo = require("../models/todo.model");

// CREATE TODO
async function createTodo(data) {
  const todo = new Todo({
    title: data.title,
    description: data.description,
    completed: data.completed ?? false,
    category: data.category || null,
    created_by: data.created_by,
    updated_by: data.created_by, // Saat pertama dibuat, updated_by diisi ID pembuat
    archived: false,
  });

  const savedTodo = await todo.save();
  
  // Populate data user & kategori sebelum dikembalikan
  return await Todo.findById(savedTodo._id)
    .populate("category")
    .populate("created_by", "name email")
    .populate("updated_by", "name email");
}

// GET ALL TODOS (Untuk User Biasa)
async function getAllTodos(ownerId, queryOptions) {
  const {
    page = 1,
    limit = 10,
    completed,
    search,
    category,
    archived,
    sortBy = "created_at",
    order = "desc",
  } = queryOptions;

  const filter = {
    created_by: ownerId,
  };

  if (completed !== undefined) {
    filter.completed = completed === "true";
  }

  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (category) {
    filter.category = category;
  }

  if (archived !== undefined) {
    filter.archived = archived === "true";
  }

  const sortDirection = order === "asc" ? 1 : -1;
  const skip = (Number(page) - 1) * Number(limit);

  const [todos, totalItems] = await Promise.all([
    Todo.find(filter)
      .populate("category")
      .populate("created_by", "name email")
      .populate("updated_by", "name email")
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(Number(limit)),

    Todo.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalItems / Number(limit));

  return {
    todos,
    pagination: {
      currentPage: Number(page),
      totalPages,
      totalItems,
      itemsPerPage: Number(limit),
    },
  };
}

// GET ALL TODOS FOR ADMIN
async function getAllTodosForAdmin(queryOptions) {
  const {
    page = 1,
    limit = 10,
    completed,
    search,
    category,
    archived,
    sortBy = "created_at",
    order = "desc",
  } = queryOptions;

  const filter = {};

  if (completed !== undefined) {
    filter.completed = completed === "true";
  }

  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (category) {
    filter.category = category;
  }

  if (archived !== undefined) {
    filter.archived = archived === "true";
  }

  const sortDirection = order === "asc" ? 1 : -1;
  const skip = (Number(page) - 1) * Number(limit);

  const [todos, totalItems] = await Promise.all([
    Todo.find(filter)
      .populate("category")
      .populate("created_by", "name email")
      .populate("updated_by", "name email")
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(Number(limit)),

    Todo.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalItems / Number(limit));

  return {
    todos,
    pagination: {
      currentPage: Number(page),
      totalPages,
      totalItems,
      itemsPerPage: Number(limit),
    },
  };
}

// GET TODO BY ID
async function getTodoById(id) {
  return await Todo.findById(id)
    .populate("category")
    .populate("created_by", "name email")
    .populate("updated_by", "name email");
}

// UPDATE TODO
async function updateTodo(id, data) {
  const updateData = {
    updated_by: data.updated_by, // Memperbarui ID pengubah
  };

  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.completed !== undefined) updateData.completed = data.completed;
  if (data.category !== undefined) updateData.category = data.category || null;

  return await Todo.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("category")
    .populate("created_by", "name email")
    .populate("updated_by", "name email");
}

// DELETE TODO
async function deleteTodo(id) {
  return await Todo.findByIdAndDelete(id);
}

// SUMMARY STATS
async function getSummaryStats() {
  const totalTodos = await Todo.countDocuments({
    archived: false,
  });

  const completedTodos = await Todo.countDocuments({
    completed: true,
    archived: false,
  });

  const pendingTodos = totalTodos - completedTodos;

  return {
    totalTodos,
    completedTodos,
    pendingTodos,
  };
}

module.exports = {
  createTodo,
  getAllTodos,
  getAllTodosForAdmin,
  getTodoById,
  updateTodo,
  deleteTodo,
  getSummaryStats,
};