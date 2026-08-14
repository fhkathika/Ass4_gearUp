import { Router } from "express";
import auth from "../../middleware/auth";

const paymentRouter=Router()

// paymentRouter.post("/checkout/:bookingId",auth("CUSTOMER"),checkout)

export default paymentRouter