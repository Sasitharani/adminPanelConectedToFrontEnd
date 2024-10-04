const mongoose = require('mongoose')

let sizeSchema=new mongoose.Schema({
    sizeName:{
        type:String,
        unique:[true,"Size exists"]
    },
    sizeStatus:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
}
)

let sizeModel=mongoose.model("size",sizeSchema)
module.exports={sizeModel}