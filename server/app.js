import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "express";
import { registerRoutes } from "./routes.js";

// Convert ESM import to __dirname equivalent
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create Express application
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(path.join(__dirname, "../dist/public")));

// Register API routes
const server = await registerRoutes(app);

// // Catch-all route to serve the frontend
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../dist/public/index.html"));
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

export default app;
