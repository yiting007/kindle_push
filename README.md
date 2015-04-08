
> Push to Kindle using command line, for personal use


## Install

```sh
$ npm install --save kindle-push
```


## Usage

Configuration file name: .kindle.json
Path: $HOME

Example json file:
```txt
   {
    "serviceType"   : "gmail",  //default
    "serviceEmail"  : "your service email(gmail)",
    "servicePwd"    : "your service email's password",
    "senderEmail"   : "your sender email",
    "receiverEmail" : "your kindle email"
   }
```

First time running you will be asked to set up the config file.

Then run command
```sh
$ kindle_push [file1] [file2] ...
```

## License

MIT © [Yiting Li]()
