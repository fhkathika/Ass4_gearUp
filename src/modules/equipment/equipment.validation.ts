import z from "zod";

export const createEquipmentSchema=z.object({
    name:z.string().min(1,"name is required"),
    brand:z.string().min(1,"brand is required"),
    category:z.string().min(1,"category is required"),
   
    location:z.string().min(1,"location is required"),
     dailyRate:z.number(),
})

export const updateequipmentSchema = createEquipmentSchema.partial().extend({
  isAvailable: z.boolean().optional(),
});

export const equipmentIdParamSchema = z.object({
  id: z.uuid("invalid car id"),
});

export type CreateEquipmentInput = z.infer<typeof createEquipmentSchema>;
export type UpdateEquipmentCarInput = z.infer<typeof updateequipmentSchema>;