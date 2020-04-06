// API Initialization...
var express = require("express");
var express = express();

// Port Initialization...
var port = process.env.PORT || 3000;

// Request Body Parser Initialization...
var bodyParser = require('body-parser');
express.use(bodyParser.json());
express.use(bodyParser.urlencoded({ extended: true }));

// Model Imports...
var Error = require("./models/error.model");

// Server Startup...
express.listen(port, () => {
    console.log("Server running on port " + port);
});

// Dummy Data...
var ngoList = require("./mock-data/ngo-list.json");
var lawyersList = require("./mock-data/lawyers-list.json");
var usersList = require("./mock-data/users-list.json");
var bookingsList = require("./mock-data/bookings-list.json");

var processRequest = require("./business-logic/request-processor");

// Connection Test...
var p = new processRequest();
express.get("/", (req, res, next) => {
    p.registerLawyer({
        "id" : "L21AP",
        "name" : "Suraj Gupta",
        "startYearOfPractice" : "22/10/2011",
        "location" : "Kolkata",
        "emailId" : "suraj.gupta@gmail.com",
        "contact" : "(+91) 9885812375",
        "areaOfSpecialization" : "Criminology",
        "almaMater" : "Delhi Law College",
        "password" : "abcd1234",
        "userId" : "sg123",
        "appointmentFees" : "1000",
        "totalExperience": "8 years"
    }).then(response => {
        res.json(response);
    });
})

// Get NGO List...
express.get("/GetNgoList", (req, res, next) => {
    res.json(ngoList);
});

// Get Lawyers List...
express.get("/GetLawyersList", (req, res, next) => {
    res.json(lawyersList);
});

// Get Users List...
express.get("/GetUsersList", (req, res, next) => {
    res.json(usersList);
});

// Get Bookings List...
express.get("/GetBookingsList", (req, res, next) => {
    res.json(bookingsList);
});

// Get Lawyer Details...
express.post("/GetLawyerDetails", (req, res) => {
    if (req != null && req.body != null) {
        let lawyer = lawyersList.filter(x => x.id == req.body.id);
        if (lawyer != null && lawyer.length > 0) {
            res.json(lawyer[0]);
        }
        else {
            let error = new Error();
            error = {
                errorType: "Invalid Request",
                errorMessage: "Lawyer ID does not exist"
            };
            res.json(error);
        }
    }
    else {
        let error = new Error();
        error = {
            errorType: "Invalid Request",
            errorMessage: "Lawyer ID is either of invalid format or Request structure is invalid"
        };
        res.json(error);
    }
});

