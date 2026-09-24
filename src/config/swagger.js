const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Todo List API",
      version: "1.0.0",
      description:
        "Dokumentasi API Todo List — dibangun bertahap dari seri artikel backend Node.js",
    },

    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local development server",
      },
      {
        url: "https://todo-api-rach.vercel.app/api",
        description: "Production server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },

        apiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
        },
      },

      schemas: {
        Todo: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665f1c2e8b1e2a1a2c3d4e5f",
            },
            title: {
              type: "string",
              example: "Belajar Swagger",
            },
            description: {
              type: "string",
              example: "Menulis dokumentasi endpoint todo",
            },
            completed: {
              type: "boolean",
              example: false,
            },
            owner: {
              type: "string",
              example: "665f1a2b8b1e2a1a2c3d1111",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        ActivityLog: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665f1c2e8b1e2a1a2c3d9999",
            },
            action: {
              type: "string",
              enum: ["CREATE", "UPDATE", "DELETE"],
              example: "CREATE",
            },
            todo: {
              type: "string",
              example: "665f1c2e8b1e2a1a2c3d4e5f",
            },
            user: {
              type: "string",
              example: "665f1a2b8b1e2a1a2c3d1111",
            },
            description: {
              type: "string",
              example: 'Todo "Belajar Swagger" dibuat',
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },
  },

  // Membaca semua file di folder routes dari root proyek
  apis: ["./src/routes/*.routes.js", "./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;