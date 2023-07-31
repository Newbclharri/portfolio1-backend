////////////////////
// DEPENDENCIES
///////////////////
require("dotenv").config();

const express = require('express'); //server framework
const cors = require('cors'); //cross origin resource sharing to access data from foreign origins
const nodemailer = require("nodemailer");
const EMAIL = process.env.EMAIL;

const aws = require("@aws-sdk/client-ses");
const defaultProvider = require("@aws-sdk/credential-provider-node");
const ses = new aws.SES({
    apiVersion: "2010-12-01",
    region: "us-east-1",
    defaultProvider
});

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
app.use(express.json()); //receive json

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

app.post("/contact", (req, res)=>{
    const contents = req.body;
    console.log(contents)
    console.log(contents.message)
    sendEmail(contents)
        .then(()=>{res.send("success")})
        .catch(err => res.send(err.message));
    if(!contents){
        return res.status(400).send({status: "failed"});
    } 
});

//////////////////
// Nodemailer fxns
//////////////////
function sendEmail(obj){
    console.log(typeof(obj))
    return new Promise((resolve, reject)=>{
        const transporter = nodemailer.createTransport({
            SES: {ses,aws},
        });
        const mailConfigs = {
            from: EMAIL, // sender address
            to: EMAIL, // list of receivers
            subject: obj.subject,
            text: obj.message

        };
        transporter.sendMail(mailConfigs,(err, info)=>{
            if(err){
                console.log("Error: ", err);
                reject({message: "An error occurred"});
            }else{
                console.log('Email sent ' + info.response);
                resolve({message: "email sent successfuly"});
            }
            
        });  
        
    });
        
}

/////////////
// PORT LISTENER
////////////
app.listen(PORT, () => console.log("They're listening on port", PORT));
