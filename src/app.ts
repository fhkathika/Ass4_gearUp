import express,{ Application, Request, Response } from "express";
import prisma from "./lib/prisma";
import { notFound } from "./middleware/not-found";

const app:Application=express()
app.get("/",async(req:Request,res:Response)=>{
   const equipment=await prisma.equipments.findMany()
   console.log(equipment)
   res.json(equipment)
  
})

app.use(notFound)
export default app;