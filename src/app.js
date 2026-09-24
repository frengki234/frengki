const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const todoRoutes = require("./routes/todo.routes");
const authRoutes = require("./routes/auth.routes");
const statsRoutes = require("./routes/stats.routes");
const categoryRoutes = require("./routes/category.routes");
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

// URL CDN untuk Aset Swagger (Mencegah Blank Page di Vercel)
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css";

const JS_URL = [
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js",
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js",
];

// Swagger API Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl: CSS_URL,
    customJs: JS_URL,
    // Menambahkan custom Site Title pada tab browser
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

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;