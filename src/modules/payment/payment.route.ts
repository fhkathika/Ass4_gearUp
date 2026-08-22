import { Router } from "express";
import auth from "../../middleware/auth";
import { checkout, getMyPayments } from "./payment.controller";

const paymentRouter=Router()

paymentRouter.post("/checkout/:bookingId",auth("CUSTOMER"),checkout)
paymentRouter.get("/my", auth("CUSTOMER"), getMyPayments);
export default paymentRouter