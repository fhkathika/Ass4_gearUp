import { catchAsync } from "../../utils/catch-async";
import type { Request,Response } from "express";
import { createBookingSchema } from "./bookings.validation";
import { createBooking } from "./bookings.service";
import { sendResponse } from "../../utils/send-response";
import z from "zod";
import prisma from "../../lib/prisma";
export const addBooking=catchAsync(async(req:Request,res:Response)=>{
const input=createBookingSchema.parse(req.body)
const booking=await createBooking(req.user!.id,input)

sendResponse(res,{message:"Booking Successfully",data:{booking}},201)

})


export const getAllBookings=catchAsync(async(req:Request,res:Response)=>{
const equipment=await prisma.booking.findMany({
    where:{
        status:"CONFIRMED"
    },
    orderBy:{
        createdAt:"desc"
    }
})
sendResponse(res,{message:"Equipments retrived successfully",data:{equipment}})

})

const bookingIdSchema=z.object({
    id:z.uuid()

})
// export const getMyBooking=catchAsync(async(req:Request,res:Response)=>{
//    const {id}=bookingIdSchema.parse(req.params);

//    console.log(id)
//    const equipment= await getEquipmentById(id)
//    sendResponse(res,{message:"Car retrived Successfully",data:{equipment}})
//    return{} 
// })