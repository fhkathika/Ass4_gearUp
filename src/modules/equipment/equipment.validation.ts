import z from "zod";

export const createEquipmentSchema=z.object({
    brand:z.string().min(1,"brand is required"),
    category:z.string().min(1,"category is required"),
   
    location:z.string().min(1,"location is required"),
     dailyRate:z.number(),
})
