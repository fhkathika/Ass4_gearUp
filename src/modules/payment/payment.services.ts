import prisma from "../../lib/prisma"
import { AppError } from "../../utils/app-error"

export const createCheckoutSession=async(customerId:string,bookingId:string)=>{
 const booking=await prisma.booking.findUnique({
    where:{
        id:bookingId
    },
    include:{
        equipment:true,
        payment:true
    }
 })

 if(!booking){
    throw new AppError(404,"Booking not found")
 }
 if(booking.customerId!==customerId){
    throw new AppError(404,"This is not your booking")
 }
 if(booking.status!=="PENDING"){
    throw new AppError(404,`Cant pay for a  ${booking.status}booking`)
 }
 if(booking.payment?.status){
    throw new AppError(404,"Booking is already paid")
 }
}