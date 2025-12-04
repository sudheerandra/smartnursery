import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import buyerRoutes from "./routes/buyerRoute.js";
import plantRoutes from "./routes/plantRoutes.js";
import workerRoutes from "./routes/workerRoutes.js";
import adminRoute from "./routes/adminRoute.js"
import nurseryRoutes from "./routes/nurseries.js";


dotenv.config();


// app config
const app = express();
const port = process.env.PORT || 5000
connectDB();

// middlewares
app.use(express.json());
app.use(cors())
app.use(cookieParser());



// api endpoints
app.use("/api/user", adminRoute);
app.use("/api/plants", plantRoutes);
app.use("/api/buyers", buyerRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/nurseries", nurseryRoutes);

app.get('/',(req,res)=>{
    res.send("API WORKING")
});

app.listen(port, ()=>console.log("Server started on PORT:"+ port));