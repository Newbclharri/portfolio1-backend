////////////////////
// DEPENDENCIES
///////////////////
require("dotenv").config();

const express = require('express'); //server framework
const cors = require('cors'); //cross origin resource sharing to access data from foreign origins

/////////////////////
// JSON FILES
////////////////////
const projects = require("./projects.json");
const about = require("./about.json");
const tutorials = require("./tutorials.json");

// Create application object
const app = express();
const PORT = process.env.PORT || 4000;

//////////////
// MIDDLEWARE
//////////////
app.use(cors());

//////////////
// ROUTES
//////////////

//home route for api testing
app.get("/", (req, res) =>{
    res.send("Hello World")
});

//route for retrieving projectws
app.get("/projects", (req, res)=>{
    //send projects via JSON
    res.json(projects);
});

//route for retrieving about info
app.get("/about", (req, res) =>{
    //send about via JSON
    res.json(about);
});

//route for retrieving tutorial info
app.get("/tutorials", (req, res)=>{
    //send about via JSON
    res.json(tutorials);
});

/////////////
// PORT LISTENER
////////////
app.listen(PORT, () => console.log("They're listening on port", PORT));