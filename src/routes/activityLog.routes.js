const express = require("express");
const router = express.Router();
const activityLogController = require("../controllers/activityLog.controller");
const { protect } = require("../middlewares/auth.middleware");

router.use(protect);

/**
 * @swagger
 * /api/activity-logs:
 *   get:
 *     summary: Mengambil riwayat aktivitas (Activity Log)
 *     tags: [Activity Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Nomor halaman
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Jumlah data per halaman
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *           enum: [CREATE, UPDATE, DELETE]
 *         description: Filter berdasarkan jenis aksi
 *     responses:
 *       200:
 *         description: Berhasil mengambil activity log
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Activity logs retrieved successfully }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id: { type: string, example: 64f1a2b3c4d5e6f7a8b9c0d1 }
 *                       action: { type: string, example: CREATE }
 *                       todo: { type: string, example: 64f1a2b3c4d5e6f7a8b9c0d2 }
 *                       user:
 *                         type: object
 *                         properties:
 *                           _id: { type: string }
 *                           name: { type: string }
 *                           email: { type: string }
 *                       description: { type: string, example: Todo "Belajar Node.js" dibuat }
 *                       created_at: { type: string, format: date-time }
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage: { type: integer, example: 1 }
 *                     totalPages: { type: integer, example: 5 }
 *                     totalItems: { type: integer, example: 42 }
 *                     itemsPerPage: { type: integer, example: 10 }
 *       401:
 *         description: Belum login / token tidak valid
 */
router.get("/", activityLogController.getActivityLogs);

module.exports = router;