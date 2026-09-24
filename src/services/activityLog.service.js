const ActivityLog = require("../models/activityLog.model");

async function createActivityLog(data) {
  return await ActivityLog.create({
    action: data.action,
    todo: data.todo,
    user: data.user,
    description: data.description || "",
  });
}

async function getActivityLogs() {
  return await ActivityLog.find()
    .populate("todo")
    .populate("user", "name email")
    .sort({ created_at: -1 });
}

module.exports = {
  createActivityLog,
  getActivityLogs,
};