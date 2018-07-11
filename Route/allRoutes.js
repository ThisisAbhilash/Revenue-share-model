module.exports =  (app) => {

    const DataController = require('../Controller/DataController');
    const BlockController = require('../Controller/BlockController');

    app.get('/getRevenueByName/:retailer_name', DataController.getRevenueByName);
    app.post('/saveRevenueModel', DataController.saveRevenueModel);
    app.post('/addParameter', DataController.addParameter);
}