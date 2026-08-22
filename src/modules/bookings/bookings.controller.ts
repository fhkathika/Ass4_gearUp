import { catchAsync } from "../../utils/catch-async";
import type { Request,Response } from "express";
import { createBookingSchema } from "./bookings.validation";
import { cancelBooking, createBooking, getCurrentUserBooking } from "./bookings.service";
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
sendResponse(res,{message:"Bookings retrived successfully",data:{equipment}})

})

const bookingIdSchema=z.object({
    id:z.uuid()

})
export const getMyBooking = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, { message: "User not authenticated" }, 401);
  }

  const bookings = await getCurrentUserBooking(req.user.id);

//   if (!user) {
//     return sendResponse(res, { message: "User not found" }, 404);
//   }

  return sendResponse(res, {
    data: { bookings },
    message: "User bookings retrieved successfully",
  });
});

export const getProviderBookings = catchAsync(
  async (req: Request, res: Response) => {
    const bookings = await prisma.booking.findMany({
      where: { equipment: { providerId: req.user!.id } },
      include: { equipment: true },
      orderBy: { createdAt: "desc" },
    });

    sendResponse(res, {
      message: "Bookings retrieved successfully",
      data: { bookings },
    });
  },
);

export const cancelBookingById = catchAsync(
  async (req: Request, res: Response) => {
    const booking = await cancelBooking(
      req.params.id as string,
      req.user!.id,
    );

    sendResponse(res, {
      message: "Booking cancelled successfully",
      data: { booking },
    });
  },
);