import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import db from "./Config/db.js";
import bodyParser from "body-parser";
import employeeroute from "./Routes/EmployeeRoute.js";
import taskRoutes from "./Routes/TaskRoute.js";
import timeLogRoutes from "./Routes/TimelogRoute.js";

dotenv.config();

// Initialize Express
const app = express();

// Port from environment variables or fallback to 5000
const PORT = process.env.PORT || 5000;

// Database connection
db();
// Use express.json() for parsing JSON request bodies
app.use(express.json());

// Use body-parser only for URL-encoded forms
app.use(bodyParser.urlencoded({ extended: false }));


// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://employee-system-backend-1-pie3.onrender.com",
];

// Middleware setup
app.use(express.json()); // Parse JSON payloads
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these HTTP methods
    credentials: true, // Allow cookies if needed
  })
);

// Default route
app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

// API routes
app.use("/api/user", employeeroute);
app.use("/api/tasks", taskRoutes);
app.use("/api/time-logs", timeLogRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
