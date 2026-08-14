import type { Stripe } from "stripe";
import { catchAsync } from "../../utils/catch-async";
import type { Request,Response } from "express";
import { AppError } from "../../utils/app-error";
import { stripe } from "../../lib/stripe";
import config from "../../config";
import z from "zod";
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
const session=event.data.object
// const bookingId=session.metadata
})
const bookingIdShema=z.object({
id:z.uuid()
})
export const checkout=catchAsync(async(req:Request,res:Response)=>{
const {id}=bookingIdShema.parse(req.body)

})




