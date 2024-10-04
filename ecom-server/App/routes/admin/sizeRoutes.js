let express=require("express")
const { sizeInsert } = require("../../controller/admin/sizeController");
let sizeRoutes=express.Router();

sizeRoutes.post('/insert',sizeInsert);
module.exports={sizeRoutes}