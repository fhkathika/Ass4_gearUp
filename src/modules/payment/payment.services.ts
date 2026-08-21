import prisma from "../../lib/prisma"
import { stripe } from "../../lib/stripe"
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
 const session=await stripe.checkout.sessions.create({
   mode:"payment",
   metadata:{bookingId:booking.id},
   success_url:"https://ass4-gear-up.vercel.app/payment/success",
 cancel_url:"phttps://ass4-gear-up.vercel.app/ayment/cancel",
 line_items:[{
   quantity:1,
   price_data:{
      currency:"USD",
      unit_amount:Math.round(booking.totalPrice),
      product_data:{
         name:`${booking.equipment.brand}`
      }
   }
 }]

 })

 await prisma.payment.upsert({
   where:{
      bookingId:booking.id,

   },
   create:{
      bookingId:booking.id,
      amount:booking.totalPrice,
      transactionId:session.id
   },
   update:{
      transactionId:session.id,
      status:"PENDING"
   }
 })
 return {checkOutUrl:session.url}
}

export const  completePayment=async(bookingId:string,transectionId:string)=>{
const payment=await prisma.payment.findUnique({where:{bookingId}})
if(!payment || payment.status=="COMPLETED")return
await prisma.$transaction([

   
  prisma.payment.update({
      where:{bookingId},
      data:{status:"COMPLETED",transectionId}
  }),

  prisma.booking.update({
   where:{
         id:bookingId
      },
      data:{
         status:"CONFIRMED"
      }
  })
  
  
])
}