import { Router } from "express";
import auth from "../../middleware/auth";
import { addEquipment, getEquipment, getEquipments } from "./equipment.controller";
import { addBooking } from "./bookings.controller";

export const bookingRouter=Router()
bookingRouter.post("/",auth("CUSTOMER"),addBooking)
