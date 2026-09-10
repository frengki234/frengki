# Todo List API

API backend untuk aplikasi Todo List, dibangun sebagai boilerplate belajar backend Node.js: struktur folder Controller-Service-Model, middleware, autentikasi JWT, proteksi API Key, validasi input, pagination, automated testing, dan dokumentasi Swagger.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-4DB33D?style=flat&logo=mongodb&logoColor=FFFFFF)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen)

## Daftar Isi

- [Fitur](#fitur)
- [Teknologi yang Dipakai](#teknologi-yang-dipakai)
- [Struktur Project](#struktur-project)
- [Persyaratan](#persyaratan)
- [Instalasi](#instalasi)
- [Environment Variables](#environment-variables)
- [Menjalankan Project](#menjalankan-project)
- [Menjalankan Test](#menjalankan-test)
- [Dokumentasi API](#dokumentasi-api)
- [Referensi Endpoint Singkat](#referensi-endpoint-singkat)
- [Lisensi](#lisensi)

## Fitur

- CRUD Todo dengan struktur Controller-Service-Model
- Autentikasi JWT dan otorisasi berbasis role (RBAC)
- Proteksi endpoint machine-to-machine dengan API Key
- Validasi input di setiap endpoint
- Pagination, filtering, dan sorting pada data list
- Global error handling dengan status code yang konsisten
- Automated test dengan Jest dan Supertest
- Dokumentasi interaktif dengan Swagger UI

## Teknologi yang Dipakai

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB dengan Mongoose
- **Autentikasi:** JSON Web Token (JWT), bcryptjs
- **Validasi:** express-validator
- **Testing:** Jest, Supertest, mongodb-memory-server
- **Dokumentasi:** swagger-jsdoc, swagger-ui-express

## Struktur Project

```text
src/
├── config/ # Koneksi database & konfigurasi Swagger
├── middlewares/ # Logger, auth, error handler, validasi, dll
├── validators/ # Aturan validasi input per resource
├── models/ # Schema Mongoose
├── services/ # Business logic
├── controllers/ # Penghubung HTTP request/response ke service
├── routes/ # Definisi endpoint
├── utils/ # AppError, catchAsync
├── app.js # Konfigurasi Express
└── server.js # Entry point aplikasi
