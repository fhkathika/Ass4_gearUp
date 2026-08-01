import express,{ Application, Request, Response } from "express";
import prisma from "./lib/prisma";

const app:Application=express()
app.get("/",async(req:Request,res:Response)=>{
   const equipment=await prisma.equipments.findMany()
   console.log(equipment)
   res.json(equipment)
  
})
export default app;