module.exports = (app) => {
    var record = require('../controller/recordcontroller.js');

    // Retrieve all Records
    app.get('/getdetails', record.findAll);

    
}
