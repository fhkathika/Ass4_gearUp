import { Router } from "express";
import auth from "../../middleware/auth";
import { addBooking, cancelBookingById, getAllBookings, getMyBooking } from "./bookings.controller";
import { getProviderBookings } from "./bookings.service";

export const bookingRouter=Router()
bookingRouter.post("/",auth("CUSTOMER"),addBooking)
bookingRouter.get("/",auth("ADMIN"),getAllBookings)
bookingRouter.get("/provider",auth("PROVIDER"),getProviderBookings)
bookingRouter.get("/",auth("ADMIN"),getAllBookings)
bookingRouter.get("/my",auth("CUSTOMER"),getMyBooking)
bookingRouter.get("/:id/cancel",auth("CUSTOMER"),cancelBookingById)
