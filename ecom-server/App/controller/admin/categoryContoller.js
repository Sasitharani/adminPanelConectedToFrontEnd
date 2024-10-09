const { categoryModel } = require("../../models/Category")
let fs=require("fs")
let categoryInsert=async(req,res)=>{
    console.log("INSERT LOOP IN CATEGORY CONTROLLER")
    let obj={
        categoryName:req.body.categoryName,
        categoryDescription:req.body.categoryDescription,
        categoryStatus:req.body.categoryStatus
    }


    if(req.file){
        if(req.file.filename){
            obj['categoryImage']=req.file.filename
        }
    }
    let resobj
    try{
        let categoryTable=new categoryModel(obj)

        let cateRes=await categoryTable.save();

        resobj={
            status:1,
            msg:"Data Save",
            cateRes
        }
        res.send(resobj)
    }

    catch(error){
        resobj={
            status:0,
            msg:"Error",
            error
        }
        res.send(resobj)
    }

}

const categoryView = async(req, res)=>{
let categoryData=await categoryModel.find()
let obj={
    status:1,
    path:process.env.CATEGORYSTATICPATH,
    data:categoryData
}
res.status(200).json(obj)
};
let singleDelete =async (req,res)=>{
    let id=req.params.id;
   
    let data=await categoryModel.findOne({_id:id})
    console.log(data)

    if(data){
        let imageName=data.categoryImage;
        let path ="uploads/category"+imageName
        //fs.unlinkSync(path)

        let deleteRes=await categoryModel.deleteOne({_id:id})
        let obj={
            status:1,
            msg:"Delete data",
            deleteRes
        }
        
    }
   
    res.send(id)
}
let multiDelete =async(req,res)=>{
    let {ids}=req.body;//now ids will be array
    for(let id of ids){
        let data=await categoryModel.findOne({_id:id})
        console.log(data)
    
        if(data){
            let imageName=data.categoryImage;
            let path ="uploads/category"+imageName
            //fs.unlinkSync(path)
    
            let deleteRes=await categoryModel.deleteOne({_id:id})
            let obj={
                status:1,
                msg:"Delete data",
                deleteRes
            }
            
        }
       
    }
    let obj={
        status:1,
        msg:"Delete data",
    }
res.send(obj)
}
let editRowData=async(req,res)=>{
    let id=req.params.id;
    let data=await categoryModel.findOne({_id:id})
    let obj={
        status:1,
        path:process.env.CATEGORYSTATICPATH,
        data
    }
    res.send(obj)

}
let updateCategory=async(req,res)=>{
    let id=req.params.id;
    
    console.log("Name   "+req.body.categoryName)
   console.log("Id  "+id)
    let obj={
        categoryName:req.body.categoryName,
        categoryDescription:req.body.categoryDescription, 
        categoryStatus:req.body.categoryStatus
    }

    if(req.file){
        if(req.file.filename){
            obj['categoryImage']=req.file.filename
        }
    }
        let updateData=await categoryModel.updateOne({_id:id},{$set:obj})
        let resObj={
            status:1,
            msg:"updated",
            updateData
            
        }
        console.log("Msg  "+resObj.msg)
    res.send(resObj)


}
module.exports={categoryInsert,categoryView,singleDelete,multiDelete,editRowData,updateCategory}