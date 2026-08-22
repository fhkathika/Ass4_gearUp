import { Router } from "express";
import auth from "../../middleware/auth";
import { addBooking, getAllBookings, getMyBooking } from "./bookings.controller";

export const bookingRouter=Router()
bookingRouter.post("/",auth("CUSTOMER"),addBooking)
bookingRouter.get("/",auth("ADMIN"),getAllBookings)
bookingRouter.get("/my",auth("CUSTOMER"),getMyBooking)
