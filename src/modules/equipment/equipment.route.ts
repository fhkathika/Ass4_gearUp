import { Router } from "express";
import auth from "../../middleware/auth";
import { addEquipment, editEquipment, getEquipment, getEquipments, removeEquipment } from "./equipment.controller";
import { updateEquipment } from "./equipment.service";

export const equipmentsRouter=Router()
equipmentsRouter.get("/",getEquipments)
equipmentsRouter.get("/:id",getEquipment)
equipmentsRouter.post("/",auth("PROVIDER"),addEquipment)
equipmentsRouter.patch("/:id",auth("PROVIDER","ADMIN"),editEquipment)
equipmentsRouter.patch("/:id",auth("PROVIDER","ADMIN"),removeEquipment)

