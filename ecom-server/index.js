let express=require("express")
let app=express();
let cors=require("cors");
require("dotenv").config()
const mongoose = require('mongoose');
const { mainRoute } = require("./App/mainRoute");
const path = require('path');

app.use(cors())
app.use(express.json())
app.use('/frank-and-files/admin', express.static(path.join(__dirname,'uploads','category')));
app.use(mainRoute)



mongoose.connect(`mongodb+srv://sasitharan:sasi@learn.vfrd0.mongodb.net/${process.env.DBNAME}`)
.then((res)=>{
    app.listen(process.env.SERVERPORT)
    console.log(process.env.SERVERPORT,process.env.DBNAME)
})

