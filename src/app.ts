import express, { Application } from "express"
import { medicineRouter } from "./modules/medicine/medicine.route";
import { categoryRouter } from "./modules/category/category.route";
const app:Application = express();

app.use(express.json());
app.use("/api/medicines",medicineRouter)
app.use("/api/categories",categoryRouter)

app.get("/",(req,res)=>{
  res.send("hello world!")
});

export default app;