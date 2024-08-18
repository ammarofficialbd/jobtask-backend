import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import connectDB from './src/db/dbConfig.js';
import router from './src/routes/productRoutes.js';
dotenv.config();

const app = express();

// Security middleware
app.use(helmet());

// Configure CORS
const corsOptions = {
    origin: ['http://localhost:5173', 'https://products-bd.netlify.app/'], // Allow only the frontend origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions)); 

app.use(express.json());
connectDB();

app.use('/api/v1/', router);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
