import type { Stripe } from "stripe";
import { catchAsync } from "../../utils/catch-async";
import type { Request,Response } from "express";
import { AppError } from "../../utils/app-error";
import { stripe } from "../../lib/stripe";
import config from "../../config";
import z from "zod";
import { completePayment, createCheckoutSession } from "./payment.services";
import { sendResponse } from "../../utils/send-response";
import prisma from "../../lib/prisma";
export const webhook=catchAsync(async(req:Request,res:Response)=>{
const signature=req.header("stripe-signature")
if(!signature){
    throw new AppError(404,"Missing stripe-signature Header")  
}
let event: Stripe.Event
try
{
 event=stripe.webhooks.constructEvent(
    req.body,
    signature,
    config.sripe_webhook_secret
)
}
catch(err){
throw new AppError(400,"Invalid webhook signature")

}
const session=event.data.object as {id:string,metadata?:{bookingId:string}}
const bookingId=session.metadata?.bookingId

if(bookingId){
    if(event.type=="checkout.session.completed"){
await completePayment(bookingId,session.id)
    }
    else if(event.type=="checkout.session.expired" || event.type=="checkout.session.async_payment_failed" ){
await prisma.payment.updateMany({
    where:{bookingId,status:"PENDING"},
data:{status:"FAILED"}
})
    }
    res.json({received:true})

}
})
const bookingIdShema=z.object({
bookingId:z.uuid("invalid booking id")
})
export const checkout=catchAsync(async(req:Request,res:Response)=>{
const {bookingId}=bookingIdShema.parse(req.params)
const result=await createCheckoutSession(req.user!.id,bookingId)


sendResponse(res,{message:"Checkout session created",data:result})

})




