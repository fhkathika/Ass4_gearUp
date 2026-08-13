import express,{ Application, Request, Response } from "express";
import prisma from "./lib/prisma";
import { notFound } from "./middleware/not-found";
import { globalErrorHandle } from "./middleware/global-error";

import { equipmentsRouter } from "./modules/equipment/equipment.route";
import authRouter from "./modules/auth/auth.route";
import userRouter from "./modules/users/user.route";
import { bookingRouter } from "./modules/bookings/bookings.route";
import paymentRouter from "./modules/payment/payment.route";

const app:Application=express()
app.use(express.json())
app.get("/",async(req:Request,res:Response)=>{
    res.send("Server is running");
   // const equipment=await prisma.equipments.findMany()
   // console.log(equipment)
   // res.json(equipment)
  
})

app.use("/auth",authRouter)
app.use("/users",userRouter)
app.use("/equipments",equipmentsRouter)
app.use("/booking",bookingRouter)
app.use("/payments",paymentRouter)
app.use(globalErrorHandle)
app.use(notFound)
export default app;