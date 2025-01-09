import express from "express";
import * as dotenv from "dotenv"
import db from "./Config/db.js"
import cors from "cors"
import employeeroute from "./Routes/EmployeeRoute.js"
import taskRoutes from "./Routes/TaskRoute.js"
import timeLogRoutes from "./Routes/TimelogRoute.js"
const allowedOrigins = ['http://localhost:3000', 'https://employee-system-backend-1-pie3.onrender.com'];


dotenv.config()

const app=express()

// port
const PORT= process.env.PORT

//database
db()

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    credentials: true // Allow cookies if needed
  }));
  

// Default route
app.get('/', (req, res) => {
    res.send("HELLO WORLD");
});

//routes
app.use("/api/user",employeeroute)
app.use("/api/tasks", taskRoutes);
app.use("/api/time-logs", timeLogRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});