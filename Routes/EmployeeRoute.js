import express from "express"
import {
    registercontrol,LoginControll,getAllEmployees
} from "../Controllers/EmployeeController.js"

//routers
const router =express.Router()

//register
router.post("/register",registercontrol)
//login
router.post("/login",LoginControll)

export default router