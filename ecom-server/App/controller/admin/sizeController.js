const { sizeModel } = require("../../models/modelSize");

let sizeInsert = async (req, res) => {
    let obj = {
        sizeName: req.body.sizeName,
        sizeStatus: req.body.sizeStatus === "active" // Convert to boolean
    };

    let resultObj;
    try {
        let SizeTable = new sizeModel(obj);
        let sizeResult = await SizeTable.save();

        resultObj = {
            status: 1,
            msg: "Size Saved",
            sizeResult
        };
        res.send(resultObj);
    } catch (error) {
        
        let errorMessage = "Error saving size";
        if (error.code === 11000) { // Duplicate key error code
            errorMessage = "Size exists";
        } else if (error.errors && error.errors.sizeName && error.errors.sizeName.message) {
            errorMessage = error.errors.sizeName.message;
        }

        resultObj = {
            status: 0,
            msg: errorMessage,
            error: error.message
        };
        res.send(resultObj);
    }
};

module.exports = { sizeInsert };
