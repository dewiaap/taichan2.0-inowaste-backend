const model = require('../models/level.model');
const {success, error} = require('../constants/result');

const level = {
    getAllLevel: async (req, res) => {
        model.getAllLevel()
        .then(result => {
            if(result.status == "ok") {
                success(res, result.data)
            }
            else{
                error(res, result.msg)
            }
        })
        .catch(err=>{
            error(res, err)
        })
    }
}

module.exports = level