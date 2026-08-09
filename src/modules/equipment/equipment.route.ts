import { Router } from "express";
import auth from "../../middleware/auth";
import { getEquipments } from "./equipment.controller";

export const equipmentsRouter=Router()
equipmentsRouter.get("/equipment",getEquipments)
// equipmentsRouter.get("/:id",getEquipment)
// equipmentsRouter.post("/",auth("PROVIDER"),addEquipment)
// equipmentsRouter.patch("/",auth("PROVIDER"),addEquipment)
// equipmentsRouter.patch("/:id",auth("PROVIDER"),addEquipment)