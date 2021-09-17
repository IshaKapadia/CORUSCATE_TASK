const { Db } = require('mongodb');
var record= require('../model/recordmodel.js');

//Fetch Data From MongoDb and render them on Showdata.ejs
exports.findAll = (req, res) => {
    record.find()
    .then(allDetails => {
        res.render("showData.ejs", {results: allDetails})
        //console.log(allDetails);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving records."
        });
    });
};







