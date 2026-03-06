import { Medicines, OrderStatus } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createMedicine=async (data:Omit<Medicines,'id' | 'created_at' | 'updated_at' | 'seller_id' >,userId :string )=>{
  // console.log(data)
  const result=await prisma.medicines.create({
   data:{
    ...data,
    seller_id:userId
   }
  })
  return result;
}

const getAllMedicine=async({
  search,
  page,
  limit,
  skip
}
  :{search?:string |undefined,
    page:number,
    limit:number,
    skip:number
  })=>{
const numericSearch = Number(search);
  const result=await prisma.medicines.findMany({
    take:limit,
    skip,
  where:{
   OR:[
    { 
      medicine_name:{
      contains:search as string,
      mode:"insensitive"
    }
  },
   {
    categories:{
    category_name:{
      contains:search as string,
      mode:"insensitive"
    }
   }
  },
 ...(!isNaN(numericSearch)
        ? [
            {
              price: {
                equals: numericSearch
              }
            }
          ]
        : [])
   ]

   
  }
  });
  return result;
}

const getStats=async()=>{
return await prisma.$transaction(async(tx)=>{

  const [totalMedicines,totalOrders,totalReviews,totalStock,totalUser,deliveredOrder]= 
  await Promise.all([
    await tx.medicines.count(),
    await tx.orders.count(),
    await tx.reviews.count(),
    await tx.medicines.aggregate({
      _sum:{
        stock:true
      }
    }),
    await tx.user.count(),
    await tx.orders.count({
      where:{
        order_status:OrderStatus.DELIVERED
      }
    })
  ])

 

  return {
    totalMedicines,
    totalOrders,
    totalReviews,
    totalStock:totalStock._sum.stock,
    totalUser,
    deliveredOrder
  }
})


}

const getMedicineById=async(medicineid:string)=>{
const result=await prisma.medicines.findUnique({
  where:{
    id:medicineid
  }
});
return result;
}

const deleteMedicine=async(medicineid :string,userId:string)=>{
const medicineData=await prisma.medicines.findFirst({
  where:{
    id:medicineid,
    seller_id:userId
  },
  select:{
    id:true
  }
})
if(!medicineData){
  throw new Error("your provided input is invalid")
}

const result=await prisma.medicines.delete({
  where:{
    id:medicineData.id
  }
})
return result;

}

const updateMedicine=async(medicineid:string,data:{price4:number,stock?:number},userId:string)=>{
const medicineData=await prisma.medicines.findFirst({
  where:{
    id:medicineid,
    seller_id:userId
  },
  select:{
    id:true
  }
})
if(!medicineData){
  throw new Error("your provided input is invalid")
}
const result=await prisma.medicines.update({
  where:{
    id:medicineid,
    seller_id:userId
  },
  data
})
return result;
}

export const medicineService={
  createMedicine,
  getAllMedicine,
  getMedicineById,
  deleteMedicine,
  updateMedicine,
  getStats
}