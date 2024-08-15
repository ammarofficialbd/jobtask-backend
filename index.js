import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './src/db/dbConfig';
dotenv.config();

const app = express()
const corsOptions= {
    origin: 'http://localhost:3000',
    credential : true,
}
app.use(cors(corsOptions))

app.use(express.json())
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`)
})