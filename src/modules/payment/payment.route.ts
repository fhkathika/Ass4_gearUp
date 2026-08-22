import { Router } from "express";
import auth from "../../middleware/auth";
import { checkout } from "./payment.controller";

const paymentRouter=Router()

paymentRouter.post("/checkout/:bookingId",auth("CUSTOMER"),checkout)

export default paymentRouter