const ActivityLog = require("../models/activityLog.model");

async function createActivityLog(data) {
  return await ActivityLog.create({
    action: data.action,
    todo: data.todo,
    user: data.user,
    description: data.description || "",
  });
}

async function getActivityLogs(queryOptions = {}) {
  const { page = 1, limit = 10, user, action } = queryOptions;

  const filter = {};
  if (user) filter.user = user;
  if (action) filter.action = action;

  const skip = (Number(page) - 1) * Number(limit);

  const [logs, totalItems] = await Promise.all([
    ActivityLog.find(filter)
      .populate("todo")
      .populate("user", "name email")
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(Number(limit)),

    ActivityLog.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalItems / Number(limit));

  return {
    data: logs,
    pagination: {
      currentPage: Number(page),
      totalPages,
      totalItems,
      itemsPerPage: Number(limit),
    },
  };
}

module.exports = {
  createActivityLog,
  getActivityLogs,
};