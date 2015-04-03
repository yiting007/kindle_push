
> Push to Kindle using command line, for personal use


## Install

```sh
$ npm install --save kindle-push
```


## Usage

First set up the configuration file name .kindle.json under $HOME
Example json file:
```txt
   {
    "serviceType"   : "gmail",
    "serviceEmail"  : "sEmail",
    "servicePwd"    : "sPwd",
    "senderEmail"   : "xxx@gmail.com",
    "receiverEmail" : "xxx@kindle.com"
   }
```
Then run command
```sh
$ kindle_push [file1] [file2] ...
```




## License

MIT © [Yiting Li]()
