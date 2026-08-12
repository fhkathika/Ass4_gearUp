import { Router } from "express";
import auth from "../../middleware/auth";
import { addEquipment, getEquipment, getEquipments } from "./equipment.controller";

export const bookingRouter=Router()
bookingRouter.post("/",addBooking)
