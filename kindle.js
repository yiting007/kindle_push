'use strict'

var prompt = require('prompt');
var nodemailer = require('nodemailer');

var email = '';
var password = '';

var properties = [
{
    name: 'email', 
        validator: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        warning: 'Invalid email format!'
},
{
    name: 'password',
    hidden: true
}
];

prompt.start();

prompt.get(properties, function (err, result) {
    if (err) { return onErr(err); }
    console.log('Command-line input received, sending email');
    email = result.email;
    password = result.password;
    send();
});

function onErr(err) {
    console.log(err);
    return 1;
}


function send(){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
        pass: password 
        }
    });

    var mailOptions = {
        from: 'yiting kindle ✔ <yiting.star@gmail.com>', // sender address
        to: 'yiting.star@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ✔', // plaintext body
        html: '<b>Hello world ✔</b>' // html body
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
