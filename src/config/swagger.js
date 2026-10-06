const swaggerJSDoc = require("swagger-jsdoc");
console.log('frengki');

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Todo List API",
      version: "1.0.0",
      description:
        "Dokumentasi API Todo List — dibangun bertahap dari seri artikel backend Node.js",
    },

    // PERBAIKAN: Urutan dibalik, URL Vercel ditaruh paling atas agar jadi default
   servers: [
      {
        url: "/", // Sangat aman di Vercel, otomatis menyesuaikan domain apa saja (Local maupun Vercel)
        description: "Current Host / Server",
      },
      {
        url: "http://localhost:3000",
        description: "Local development server",
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

  apis: ["./src/routes/*.routes.js", "./src/routes/*.js", "./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;