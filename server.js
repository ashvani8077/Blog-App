const express=require('express');
const cors=require('cors');
const morgan=require('morgan');
const colors=require('colors');
const dotenv=require('dotenv');
const connectDB = require('./config/db');


//env config
dotenv.config();

//routes
const userRoutes=require('./routes/userRoutes');
const blogRoutes=require('./routes/blogRoutes');

//mongodb connection
connectDB();

//rest object
const app=express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/blog',blogRoutes)

//port
const PORT=process.env.PORT|| 8000;

//listen
app.listen(8000,()=>{
    console.log(`Server is running on port number ${PORT}`.bgCyan.white);
})