const express= require('express')
const bodyParser= require('body-parser')
const request = require('request')
const https = require('https')

const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html')
})

app.post('/', (req, res) => {
    
   const firstName = req.body.fName;
   const lastName = req.body.lName;
   const email = req.body.email;
 
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields : {
                    FNAME: firstName ,
                    LNAME: lastName 
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/4bc0346102";

    const options = {
        method : "POST",
        auth: "albion1:f4581a75f542d58a088ac0b6ee0a3f82-us8"
    }

   const request = https.request(url , options , function (response) {
    
    if(response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
    } else {
        res.sendFile(__dirname + "/failure.html")
    }
    
    response.on("data", function (data) {
        console.log(JSON.parse(data));
      })


    })
  //  request.write(jsonData);
    request.end();
})

app.post('/failure', function (req, res) {
    res.redirect('/');
})

app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port 3000')
})



// key
// f4581a75f542d58a088ac0b6ee0a3f82-us8

// list id 
// 4bc0346102