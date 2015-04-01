'use strict'

var prompt = require('prompt');
var nodemailer = require('nodemailer');

var kindleEmail = 'yiting.star_7@kindle.com';

var properties = [
{
    name: 'email', 
    validator: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    warning: 'Invalid email format!'
},
{
    name: 'password',
    hidden: true
},
{
    name: 'file',
}
]

prompt.start();

prompt.get(properties, function (err, result) {
    if (err) { return onErr(err); }
    console.log('Command-line input received, sending email');
    send(result.email, result.password, result.file);
});

function onErr(err) {
    console.log(err);
    return 1;
}


function send(email, password, file){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
        pass: password 
        }
    });

    var mailOptions = {
        from: email, 
        to: kindleEmail,
        subject: 'kindle book file',
        attachments:[
            {   
                path: file
            }
        ]
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });
}
