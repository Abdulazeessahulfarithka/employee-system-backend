import express from "express"
import {
    registercontrol,loginController,getAllEmployees
} from "../Controllers/EmployeeController.js"

//routers
const router =express.Router()

//register
router.post("/register",registercontrol)
//login
router.post("/login",loginController)
//getall
router.get("/getallemployee",getAllEmployees)

export default router