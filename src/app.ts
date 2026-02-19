import express, { Application } from "express"
import { medicineRouter } from "./modules/medicine/medicine.route";
import { categoryRouter } from "./modules/category/category.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors';
const app:Application = express();

app.use(cors({
  origin:process.env.APP_URL || "http://localhost:5000",
  credentials:true
}))

app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/medicines",medicineRouter)
app.use("/api/categories",categoryRouter)

app.get("/",(req,res)=>{
  res.send("hello world!")
});

export default app;