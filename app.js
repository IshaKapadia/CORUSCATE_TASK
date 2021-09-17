// Import required module csvtojson and mongodb packages
const csvtojson = require('csvtojson');
const mongodb = require('mongodb');
var url = "mongodb://localhost:27017/TestDb";
var express = require('express');
var bodyParser = require('body-parser');

// create express app
var app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
   

// parse application/json
app.use(bodyParser.json()) 


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


assert = require('assert');
var path=require("path");
var ejs=require("ejs");
const { db } = require('./model/recordmodel.js');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

var dbConn;
mongodb.MongoClient.connect(url, {
    useUnifiedTopology: true,
}).then((client) => {
    console.log('DB Connected!');
    dbConn = client.db();
}).catch(err => {
    console.log("DB Connection Error: ${err.message}");
});

// CSV file name
const fileName = "Task 1.csv";
var arrayToInsert = [];
csvtojson().fromFile(fileName).then(source => {
    // Fetching the all data from each row of the CSV File
    for (var i = 0; i < source.length; i++) {
         var oneRow = {
            id: source[i]['id'],
            firstname:source[i]['firstname'],
            lastname: source[i]['lastname'],
            email:source[i]['email'],
            date: source[i]['date'],
            Amount: source[i]['Amount']
         };
         arrayToInsert.push(oneRow);
     }
     //inserting into the table
     var collectionName = 'tblWork';
     var collection = dbConn.collection(collectionName);
     collection.insertMany(arrayToInsert, (err, result) => {
         if (err) console.log(err);
         if(result){
             console.log("Import CSV into database successfully.");
         }
     });
});

//Fetching Records from Table
mongodb.MongoClient.connect(url, function(error, databases){  
    if(error){  
        throw error;  
  
    }  
     
    var nodtst = databases.db("TestDb");  
    nodtst.collection("tblWork").find({}).toArray(function(err, totalpract) {  
        if (err) throw err;  
          
        for(i = 0; i < totalpract.length; i++) {  
             let pract = totalpract[i];
           console.log(pract.id + ", " + pract.firstname + ", " + pract.lastname+", "+pract.email+", "+pract.date+", "+pract.Amount);  
         }  
        //console.log(result);  
        databases.close();  
    });    
});
app.get("/", function (req, res) {
    res.render("showData",{ details: null })
    })

require('./routes/record.route.js')(app);


//Group record by year field

mongodb.MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    simpleDistinct(db, function() {
      db.close();
    });
  });
  
  var simpleDistinct = function(db, callback) {
      var collection = dbConn.collection( 'tblWork' );
      collection.distinct( 'date', 
        
        function(err, result) {
          assert.equal(err, null);
          console.log(result)
          callback(result);
        }
    );
  }

//Port 3000
app.listen(3000, "localhost", function () {
     console.log("server has started");
 })