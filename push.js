#!/usr/bin/env node
'use strict'

/*
   {
    "serviceType"   : "gmail",
    "serviceEmail"  : "sEmail",
    "servicePwd"    : "sPwd",
    "senderEmail"   : "xxx@gmail.com",
    "receiverEmail" : "xxx@kindle.com"
   }

*/

var fs = require('fs');
var nodemailer = require('nodemailer');

var pushService = {
  transporter: {},
  options: {},
  attachmentFiles: [],

  configJson: {
    serviceType: '',
    serviceEmail: '',
    servicePwd: '',
    senderEmail: '',
    receiverEmail: ''
  },

  load: function() {
    var data = fs.readFileSync('.kindle.json', 'utf8');
    this.configJson = JSON.parse(data);

    var files = process.argv.slice(2);
    files.forEach(function(f) {
      this.book(f);
    }, this);
    if (!this.validation()) {
      console.log('Error pushing to kindle, exist');
      return;
    }
    this.mailConfig();
    this.send();
  },

  book: function(file) {
    console.log('Adding book ' + file + '...');
    this.attachmentFiles.push(file);
  },

  mailConfig: function() {
    this.transporter = nodemailer.createTransport({
      service: this.configJson.serviceType,
      auth: {
        user: this.configJson.serviceEmail,
        pass: this.configJson.servicePwd
      }
    });

    this.options = {
      from: this.configJson.senderEmail,
      to: this.configJson.receiverEmail,
      subject: 'kindle book file',
      attachments: this.attachmentFiles
    };
  },

  send: function() {
    console.log('Pushing to kindle...');
    this.transporter.sendMail(this.options, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Done: ' + info.response);
      }
    });
  },

  validation: function() {
    var emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    var valid = emailPattern.test(this.configJson.serviceEmail);
    if (!valid) {
      console.log('[Wrong format] please check your service email: ' + this.configJson.serviceEmail);
      return false;
    }
    valid = emailPattern.test(this.configJson.senderEmail);
    if (!valid) {
      console.log('[Wrong format] please check your sender email: ' + this.configJson.senderEmail);
      return false;
    }
    valid = emailPattern.test(this.configJson.receiverEmail);
    if (!valid) {
      console.log('[Wrong format]: please check your receiver email: ' + this.configJson.receiverEmail);
      return false;
    }
    if (!this.attachmentFiles.length) {
      console.log('[No attachment found]:');
      return false;
    }
    for (var i = 0, len = this.attachmentFiles.length; i < len; i++) {
      try{
          fs.statSync(this.attachmentFiles[i]);
      }catch(err){
          console.log('[File not found]: ' + this.attachmentFiles[i]);
          if(err.code == 'ENOENT') return false;
      }
    }
    return valid;
  }
};

pushService.load();
