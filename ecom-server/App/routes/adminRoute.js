let express=require("express");
const { categoryRoutes } = require("./admin/categoryRoutes");
const { sizeRoutes } = require("./admin/sizeRoutes");
const { colorRoutes } = require("./admin/colorRoutes");
let adminRouteRoutes=express.Router();

adminRouteRoutes.use("/category",categoryRoutes)
adminRouteRoutes.use("/size",sizeRoutes)
adminRouteRoutes.use("/color",colorRoutes)



module.exports={adminRouteRoutes}