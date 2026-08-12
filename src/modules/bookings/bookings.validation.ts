import z from "zod";

export const createBookingSchema=z.object({
    equipmentId:z.uuid("invalid equipment id"),
startDate:z.coerce.date(),
endDate:z.coerce.date(),
}).refine((input)=>input.endDate> input.startDate,"endDate must be after start date")