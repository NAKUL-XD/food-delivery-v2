import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
connectDB();
const port = process.env.PORT || 3000;

// ✅ Fix CORS
app.use(cors({
  origin: [
    "http://localhost:5173", // local admin dev port
    "http://localhost:5174", // local frontend if needed
    "https://https://foodfrontend1.netlify.app", // deployed user site
    "https://https://adminpanellz.netlify.app     // ✅ deployed admin site!
  ],
  credentials: true
}));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Correct API Endpoints — NO full URLs!
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/payment', paymentRoute);
app.use('/api/order', orderRoutes);
app.use('/images', express.static('uploads'));

app.get('/', (req, res) => {
  res.send("API is running");
});

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
