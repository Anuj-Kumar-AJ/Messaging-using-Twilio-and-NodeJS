const multer = require('multer');
var credential = require('./credential');
express = require('express');
bodyParser = require('body-parser')
path = require('path')


// importing credential module
credential = require('./credential')


const accountSid = credential.TWILIO_ACCOUNT_SID;
const authToken = credential.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
//-------------------------------------------------------------


// creating express instance

app = express()

// using middleware

app.use(bodyParser.json());
app.use(multer().array());
app.use(bodyParser.urlencoded({extended: true}))

// ROUTING -----------------------------------

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "./home.html"))
})

// storing message in variable
var message;
var phoneNumberFrom;
var phoneNumberTo;


// Send user to WebPage
app.post('/message', (req,res,next) => {
  message = req.body.message
  phoneNumberFrom = req.body.PhoneNumber_from
  phoneNumberTo = req.body.PhoneNumber_to
  //--------------------------------------------------


  client.messages
    .create({
      body: message,
      from: '+' + phoneNumberFrom,
      to: '+' + phoneNumberTo,
    }).then(message => console.log(message.sid)).then(res.send("message has been send "));
 
});


app.listen(credential.PORT, () => {
    console.log('listening to port ' + credential.PORT)
})

