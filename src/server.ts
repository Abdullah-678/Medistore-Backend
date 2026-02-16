import app from "./app";
import { prisma } from "./lib/prisma";
const PORT=process.env.PORT ;
async function main() {
  try{
    await prisma.$connect();
    console.log("connected to the database successfully");
    app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
  }catch(error){
    console.log("An error occurred:",error)
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();