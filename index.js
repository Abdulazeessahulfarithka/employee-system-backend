import express from "express";
import * as dotenv from "dotenv"
import db from "./Config/db.js"
import employeeroute from "./Routes/EmployeeRoute.js"
import taskRoutes from "./Routes/TaskRoute.js"
import timeLogRoutes from "./Routes/TimelogRoute.js"

dotenv.config()

const app=express()

// port
const PORT= process.env.PORT

//database
db()

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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