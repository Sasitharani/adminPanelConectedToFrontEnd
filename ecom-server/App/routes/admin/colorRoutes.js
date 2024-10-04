let express =require("express");
const { colorInsert } = require("../../controller/admin/colorController");
let colorRoutes=express.Router();

colorRoutes.post('/insert',colorInsert);
module.exports={colorRoutes}  