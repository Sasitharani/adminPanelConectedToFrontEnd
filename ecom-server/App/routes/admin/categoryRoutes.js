let express=require("express");
const { categoryInsert, readParentCategories, categoryView, singleDelete, multiDelete } = require("../../controller/admin/categoryContoller");
const { uploads } = require("../../middleware/fileUploadion");
let categoryRoutes=express.Router();



categoryRoutes.post('/insert',uploads('uploads/category').single('categoryImage'),categoryInsert);
categoryRoutes.get('/view', categoryView);
categoryRoutes.delete("/delete/:id",singleDelete)
categoryRoutes.post("/multiDelete/",multiDelete)


module.exports={categoryRoutes}