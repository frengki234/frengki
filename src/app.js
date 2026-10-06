const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const todoRoutes = require("./routes/todo.routes");
const authRoutes = require("./routes/auth.routes");
const statsRoutes = require("./routes/stats.routes");
const categoryRoutes = require("./routes/category.routes");
const activityLogRoutes = require("./routes/activityLog.routes");
const logger = require("./middlewares/logger.middleware");
const notFound = require("./middlewares/notFound.middleware");
const errorHandler = require("./middlewares/errorHandler.middleware");

const app = express();

// Middleware
app.use(logger);
app.use(cors());
app.use(express.json());

// Root endpoints
app.get("/", (req, res) => {
  res.json({ message: "Todo API is running" });
});

// Menangani GET /api dan GET /api/ agar tidak melempar error 404
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Todo API Service" });
});

// URL CDN untuk Aset Swagger yang Stabil di Vercel (Menggunakan unpkg v5.0.0)
const CSS_URL =
  "https://unpkg.com/swagger-ui-dist@5.0.0/swagger-ui.css";

const JS_URL = [
  "https://unpkg.com/swagger-ui-dist@5.0.0/swagger-ui-bundle.js",
  "https://unpkg.com/swagger-ui-dist@5.0.0/swagger-ui-standalone-preset.js",
];

// Swagger API Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl: CSS_URL,
    customJs: JS_URL,
    customSiteTitle: "Todo API Documentation",
    swaggerOptions: {
      persistAuthorization: true, // Menyimpan token JWT saat halaman di-refresh
    },
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/activity-logs", activityLogRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;