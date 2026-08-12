import z from "zod";

export const createEquipmentSchema=z.object({
    name:z.string().min(1,"name is required"),
    brand:z.string().min(1,"brand is required"),
    category:z.string().min(1,"category is required"),
   
    location:z.string().min(1,"location is required"),
     dailyRate:z.number(),
})
