import prisma from "../../lib/prisma";

import type { Request ,Response} from "express";
import { sendResponse } from "../../utils/send-response";
import { catchAsync } from "../../utils/catch-async";
import z from "zod";
import { deleteEquipment, getEquipmentById, updateEquipment } from "./equipment.service";
import { createEquipmentSchema, updateequipmentSchema } from "./equipment.validation";
export const getEquipments=catchAsync(async(req:Request,res:Response)=>{
const equipment=await prisma.equipments.findMany({
    where:{
        isAvailable:true
    },
    orderBy:{
        createdAt:"desc"
    }
})
sendResponse(res,{message:"Equipments retrived successfully",data:{equipment}})

})

const equipmentIdSchema=z.object({
    id:z.uuid()

})
export const getEquipment=catchAsync(async(req:Request,res:Response)=>{
   const {id}=equipmentIdSchema.parse(req.params);

   console.log(id)
   const equipment= await getEquipmentById(id)
   sendResponse(res,{message:"Car retrived Successfully",data:{equipment}})
   return{} 
})

export const addEquipment=catchAsync(async(req:Request,res:Response)=>{
    const input=createEquipmentSchema.parse(req.body)

    const equipment=await prisma.equipments.create({
       data: {
        ...input,
        providerId:req.user!.id
       } 
    })
    sendResponse(res,{message:"Car Created Successfully",data:{equipment}})
})

export const editEquipment = catchAsync(async (req: Request, res: Response) => {
  const { id } = equipmentIdSchema.parse(req.params);
  const input = updateequipmentSchema.parse(req.body);

  const car = await updateEquipment(req.user!, id, input);

  sendResponse(res, { message: "Car updated successfully", data: { car } });
});

export const removeEquipment = catchAsync(async (req: Request, res: Response) => {
  const { id } = equipmentIdSchema.parse(req.params);

  await deleteEquipment(req.user!, id);

  sendResponse(res, { message: "Car deleted successfully" });
});