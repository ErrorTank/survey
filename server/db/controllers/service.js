
const dbManager = require('../index');
const appDb = dbManager.getConnections()[0];
const Service = require('../model/service')(appDb);




const getAllServices = () => {
    return Service.find({}).lean()
}



module.exports = {
    getAllServices,

}