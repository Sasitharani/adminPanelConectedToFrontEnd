const mongoose = require('mongoose')

let colorScheme=new mongoose.Schema({
    colorName:{
        type:String,
        unique:[true,"Color already added"]
    },
    colorPicker:{
        type:String,
    },
    colorStatus:{
        type:Boolean,
        default:true
    },
},{
    timestamps:true
}

)

let ColorModel =mongoose.model("color",colorScheme)
module.exports={ColorModel}