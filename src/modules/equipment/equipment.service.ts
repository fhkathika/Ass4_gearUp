import prisma from "../../lib/prisma";
import { AppError } from "../../utils/app-error";

export async function getEquipmentById(id:string){
    const equipment=await prisma.equipments.findUnique({
        where:{id}
    })
    if(!equipment){
        throw new AppError(404,"Equipment not found")
    } 
    return equipment
}