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
   
    let searchObj={

    }
// ----------------------------------------------------------------------Now Working____________________________________________________
let limit=2;
    let {catName,catDesc,pageNo}=req.query;
    

    if(catName!==''){
        searchObj['categoryName']=new RegExp(catName,'i')
        //Working---------------
        console.log('categoryName:  '+searchObj.categoryName)
    }
    if(catDesc!==''){
        searchObj['categoryDescription']=new RegExp(catDesc,'i')
        console.log('categoryDesc:  '+searchObj.categoryDesc)
    }

let categoryData=await categoryModel.find(searchObj).skip((pageNo-1)*limit).limit(2)
let totalPages=await categoryModel.find(searchObj);//getting all values from database
let allPage=Math.ceil(totalPages.length/limit);//Total no of pages


let obj={
    status:1,
    path:process.env.CATEGORYSTATICPATH,
    data:categoryData,
    allPage,
    limit
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