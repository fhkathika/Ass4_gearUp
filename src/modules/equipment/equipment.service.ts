import { Prisma } from "../../../generated/prisma/client";
import prisma from "../../lib/prisma";
import { AppError } from "../../utils/app-error";
import { UserJwtPayload } from "../../utils/jwt";
import { UpdateEquipmentCarInput } from "./equipment.validation";

export async function getEquipmentById(id:string){
    const equipment=await prisma.equipments.findUnique({
        where:{id}
    })
    if(!equipment){
        throw new AppError(404,"Equipment not found")
    } 
    return equipment
}

async function assertCanMutateCar(user: UserJwtPayload, provideId: string) {
  const car = await getEquipmentById(provideId);

  if (user.role !== "ADMIN" && car.providerId !== user.id) {
    throw new AppError(403, "Forbidden - You do not own this car");
  }

  return car;
}

export async function updateEquipment(
  user: UserJwtPayload,
  id: string,
  input: UpdateEquipmentCarInput,
) {
  await assertCanMutateCar(user, id);


  return prisma.equipments.update({ where: { id }, data: input });
}

export async function deleteEquipment(user: UserJwtPayload, id: string) {
  await assertCanMutateCar(user, id);

  return prisma.equipments.delete({ where: { id } });
}