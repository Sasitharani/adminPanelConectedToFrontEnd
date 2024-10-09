let express=require("express");
const { categoryInsert, readParentCategories, categoryView, singleDelete, multiDelete, editRowData, updateCategory } = require("../../controller/admin/categoryContoller");
const { uploads } = require("../../middleware/fileUploadion");
let categoryRoutes=express.Router();



categoryRoutes.post('/insert',uploads('uploads/category').single('categoryImage'),categoryInsert);
categoryRoutes.get('/view', categoryView);
categoryRoutes.delete("/delete/:id",singleDelete)
categoryRoutes.post("/multiDelete/",multiDelete)

categoryRoutes.get("/editrow/:id",editRowData)//view data
categoryRoutes.put("/updaterow/:id",uploads('uploads/category').single('categoryImage'),updateCategory)//update data

module.exports={categoryRoutes}


//http://localhost:8000/admin/category/updaterow/