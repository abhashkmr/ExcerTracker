const express=require('express')
const cors = require('cors')
const mongoose =require('mongoose')
const bodyParser =require('body-parser')
require('dotenv').config()
const exercisesRouter=require('./routes/exercises')
const userRouter=require('./routes/users')

const app=express();
const port=process.env.PORT||5000;

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(cors());
app.use(express.json());


const url=process.env.ATLAS_URI;

mongoose.connect(url,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})
    .then(()=>{
        app.listen(port,()=>{
            console.log("Database connected and Server is running on PORT: "+port);
        })
    })
    .catch((err)=>{
		console.log(err);
		});

    mongoose.set('useFindAndModify',false);

app.use('/exercises',exercisesRouter);
app.use('/users',userRouter);