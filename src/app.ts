import express, { Application } from "express"
import { medicineRouter } from "./modules/medicine/medicine.route";
import { categoryRouter } from "./modules/category/category.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors';
import { userRoute } from "./modules/user/user.route";
import { orderRoute } from "./modules/order/order.route";
import { cartRouter } from "./modules/cart/cart.route";
import { reviewRouter } from "./modules/review/review.route";
import errorHandler from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
const app:Application = express();

app.use(cors({
  origin:process.env.APP_URL || "http://localhost:5000",
  credentials:true
}))

app.use(express.json());
app.use("/api/auth",userRoute)

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/medicines",medicineRouter)
app.use("/api/categories",categoryRouter)
app.use("/api/orders",orderRoute)
app.use("/api/carts",cartRouter)
app.use("/api/reviews",reviewRouter)
app.use(notFound)
app.use(errorHandler)
app.get("/",(req,res)=>{
  res.send("hello world!")
});

export default app;