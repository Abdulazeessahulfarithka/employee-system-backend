import express from "express"
import {
    registercontrol,loginController,getAllEmployees
} from "../Controllers/EmployeeController.js"
 import { verifyToken } from "../Middleware/authmiddleware.js"

//routers
const router =express.Router()

//register
router.post("/register",registercontrol)
//login
router.post("/login",loginController)
//getall
router.get("/getallemployee",getAllEmployees)

router.get("/user-auth",verifyToken,(res,req)=>{
    res.status(200).send({ok:true})

})
export default router