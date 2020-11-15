
const dbManager = require('../index');
const appDb = dbManager.getConnections()[0];
const Location = require('../model/location')(appDb);




const getAllLocations = () => {
    return Location.find({}).lean()
}



module.exports = {
    getAllLocations,

}