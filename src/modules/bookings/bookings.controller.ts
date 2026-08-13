import { catchAsync } from "../../utils/catch-async";
import type { Request,Response } from "express";
import { createBookingSchema } from "./bookings.validation";
import { createBooking } from "./bookings.service";
import { sendResponse } from "../../utils/send-response";
export const addBooking=catchAsync(async(req:Request,res:Response)=>{
const input=createBookingSchema.parse(req.body)
const booking=await createBooking(req.user!.id,input)

sendResponse(res,{message:"Booking Successfully",data:{booking}},201)

})