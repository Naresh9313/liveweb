// import express from 'express';
// import dotenv from 'dotenv';
// import colors from 'colors';
// import connectDB from './database/db.js';
// import cors from 'cors';
// import userRoutes from './modules/api/auth/routes/authRoutes.js';
// import eventRoutes from './modules/api/Event/routes/eventRoutes.js';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import bookingRoutes from './modules/api/Booking/routes/bookingRoutes.js';

// dotenv.config();

// const app = express();
// app.use(express.json());

// // app.use(
// //   cors({
// //     origin: 'http://localhost:3000',
// //     https://paper-3-naresh-prajapati.vercel.app/'
// //     credentials: true,
// //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //   }),
// // );
// app.use(
//   cors({
//     origin: ['http://localhost:3000'],
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   }),
// );

// app.use('/auth', userRoutes);
// app.use('/event', eventRoutes);
// app.use('/booking', bookingRoutes);

// app.get('/', (req, res) => {
//   res.send('Vercel Backend Working!');
// });

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.listen(process.env.PORT, () => {
//   console.log(`Server Is Running On ${process.env.PORT}`.bgCyan.white);
// });

// connectDB;
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './database/db.js';
import cors from 'cors';
import userRoutes from './modules/api/auth/routes/authRoutes.js';
import eventRoutes from './modules/api/Event/routes/eventRoutes.js';
import bookingRoutes from './modules/api/Booking/routes/bookingRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(express.json());

// CORS FIX for Vercel Frontend + Localhost
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://liveweb-six.vercel.app"   // 🔥 your frontend on Vercel
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// API Routes
app.use("/auth", userRoutes);
app.use("/event", eventRoutes);
app.use("/booking", bookingRoutes);

// Default route (to test on Vercel)
app.get("/", (req, res) => {
  res.send("Vercel Backend Working!");
});

// Static file handling (uploads)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// LOCAL SERVER ONLY: Vercel ignores listen()
if (process.env.VERCEL !== "1") {
  app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT || 3001}`.bgCyan.white);
  });
}

// Connect DB
connectDB();
export default app; // 🔥 Required for Vercel
