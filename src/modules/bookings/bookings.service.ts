import prisma from "../../lib/prisma"
import { AppError } from "../../utils/app-error"
import { getEquipment } from "../equipment/equipment.controller"
import { getEquipmentById } from "../equipment/equipment.service"
import { createBookingInput } from "./bookings.validation"

export const createBooking=async(customerId:string,input:createBookingInput)=>{
const equipment=await getEquipmentById(input.equipmentId)
if(!equipment.isAvailable){
    throw new AppError(400,"Equipment is not Avaibleable")

}
if (equipment.providerId==customerId){
      throw new AppError(400,"You cant book your own items")

}
const overLapping=await prisma.booking.findFirst({
    where:{
        equipmentsId:equipment.id,
        status:{
            not:"CANCELED"
        },
        startDate:{
            lt:input.startDate
        },
        endDate:{
            lt:input.endDate
        }
    }
})

if(overLapping){
      throw new AppError(400,"Equipment is already booked")

}
return prisma.booking.create({
    data:{
        equipmentsId:equipment.id,
        customerId:customerId,
        startDate:input.startDate,
        endDate:input.endDate,
        totalPrice:Math.ceil((input.endDate.getTime()-input.startDate.getTime())/24*60*60*1000)*equipment.dailyRate


    }
})
}


export async function getCurrentUserBooking(userId: string) {
  return prisma.booking.findMany({
    where: { id: userId },
   include:{
    equipments:true,
    payment:true,
   },
   orderBy:{
    createdAt:"desc"
   },
  });
}

export async function getProviderBookings(providerId: string) {
  return prisma.booking.findMany({
    where: { equipment: { providerId } },
    include: { equipment: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function cancelBooking(bookingId: string, renterId: string) {
}