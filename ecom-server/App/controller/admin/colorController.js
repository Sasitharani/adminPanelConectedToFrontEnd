const { ColorModel } = require("../../models/AddColor")

let colorInsert=async (req,res)=>{
    let obj={
        colorName:req.body.colorName,
        colorPicker:req.body.colorPicker,
        colorStatus:req.body.colorStatus
    }

    try{
        let colorTable=new ColorModel(obj)
        let colorResult=await colorTable.save();

        resultObj={
            status:1,
            msg:"Color Saved"
        }
        res.send(resultObj)
    }
    catch(error){
        resultObj={
            status:0,
            msg:"Error",
            Error
        }
        res.send(resultObj)
    }

}
module.exports={colorInsert}