import bcrypt from "bcryptjs"
import prisma from "../src/lib/prisma"
import { PaymentStatus, Role } from "./generated/prisma/enums"

async function main(){
    console.log("running")
    const password=await bcrypt.hash("password123",10)
  const [provider1,provider2,customer1,customer2,admin]=await Promise.all([
      prisma.user.create({
        data:{
           name:"spiderman",
           email:"spider.man@gmail.com",
           password,
           role: Role.PROVIDER
        },
        
    }),
      prisma.user.create({
        data:{
           name:"Super Man",
           email:"super.man@gmail.com",
           password,
           role: Role.PROVIDER
        },
        
    }),
      prisma.user.create({
        data:{
           name:"Bat Man",
           email:"bat.man@gmail.com",
           password,
           role: Role.CUSTOMER
        },
        
    }),
      prisma.user.create({
        data:{
           name:"Iron Man",
           email:"Iron.man@gmail.com",
           password,
           role: Role.CUSTOMER
        },
        
    }),
      prisma.user.create({
        data:{
           name:"Admin User",
           email:"Admin.user@gmail.com",
           password,
           role: Role.ADMIN
        },
        
    }),

  ])

const equipmentCreate = [
  {
    name: "Mountain Bike X1",
    brand: "Trek",
    category: "Bicycle",
    dailyRate: 1200,
    location: "Gulshan, Dhaka",
    providerId: provider1.id,
  },
  {
    name: "Road Bike Pro",
    brand: "Giant",
    category: "Bicycle",
    dailyRate: 1500,
    location: "Banani, Dhaka",
    providerId: provider1.id,
  },
  {
    name: "Camping Tent 4P",
    brand: "Coleman",
    category: "Camping",
    dailyRate: 800,
    location: "Dhanmondi, Dhaka",
    providerId: provider2.id,
  },
  {
    name: "Hiking Backpack 60L",
    brand: "Deuter",
    category: "Camping",
    dailyRate: 500,
    location: "Uttara, Dhaka",
    providerId: provider1.id,
  },
  {
    name: "Professional Cricket Kit",
    brand: "SG",
    category: "Cricket",
    dailyRate: 1000,
    location: "Mirpur, Dhaka",
    providerId: provider2.id,
  },
  {
    name: "Football Training Set",
    brand: "Adidas",
    category: "Football",
    dailyRate: 700,
    location: "Mohammadpur, Dhaka",
    providerId: provider2.id,
  },
  {
    name: "Badminton Racket Pair",
    brand: "Yonex",
    category: "Badminton",
    dailyRate: 600,
    location: "Bashundhara, Dhaka",
    providerId: provider2.id,
  },
  {
    name: "Kayak Explorer",
    brand: "Intex",
    category: "Water Sports",
    dailyRate: 2500,
    location: "Purbachal, Dhaka",
    providerId: provider2.id,
  },
  {
    name: "Tennis Starter Kit",
    brand: "Wilson",
    category: "Tennis",
    dailyRate: 900,
    location: "Gulshan, Dhaka",
    providerId: provider1.id,
  },
  {
    name: "Portable BBQ Grill",
    brand: "Weber",
    category: "Outdoor",
    dailyRate: 650,
    location: "Banani, Dhaka",
    providerId: provider2.id,
  },
];
const equipments=[]
for(const equipmentData of equipmentCreate)
{
  const equipment=await prisma.equipments.create({
    data:equipmentData
  })  
  equipments.push(equipment)
}
console.log(`Created ${equipments.length} equipments`)

const bookingsToCreate=[{
    equipment:equipments[0],
    customer:customer1.id,
    startDate:new Date("2026-08-11"),
    endDate:new Date("2026-08-11"),
    paymentStatus:PaymentStatus.COMPLETED
}]

}
main().then(process.exit(0))