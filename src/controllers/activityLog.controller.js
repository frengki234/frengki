const activityLogService = require("../services/activityLog.service");
const catchAsync = require("../utils/catchAsync");

// GET ALL ACTIVITY LOGS (wajib login / admin)
const getActivityLogs = catchAsync(async (req, res, next) => {
  const { page, limit, user, action } = req.query;

  // Jika bukan admin, kunci filter hanya untuk user yang sedang login
  const userIdFilter = req.user.role === "admin" ? user : req.user._id;

  const logs = await activityLogService.getActivityLogs({
    page: page ? parseInt(page, 10) : 1,
    limit: limit ? parseInt(limit, 10) : 10,
    user: userIdFilter,
    action,
  });

  res.status(200).json({
    success: true,
    message: "Activity logs retrieved successfully",
    data: logs.data,
    pagination: logs.pagination,
  });
});

module.exports = {
  getActivityLogs,
};