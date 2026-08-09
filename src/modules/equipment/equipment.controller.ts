import prisma from "../../lib/prisma";

import type { Request ,Response} from "express";
import { sendResponse } from "../../utils/send-response";
import { catchAsync } from "../../utils/catch-async";
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