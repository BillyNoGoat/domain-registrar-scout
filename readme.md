#### A simple node module which scrapes viewdns.info/reversewhois for registrant domain info

### Install

`git clone https://github.com/BillyNoGoat/domain-registrar-scout`
`npm i`

# API Usage

## getDomainsByRegistrar()

Take a registrant and return all domains under
this registrant. Example output:

```
{
    "domain": "chaminadeuniversity-email.com",
    "creation": "2014-08-18",
    "registrar": "TUCOWS DOMAINS INC."
}
```

This function will call the below functions

## getHTML()

Take a registrant and return the HTML page for that registrant
from viewdns.info.

## scrapeHTML()

Takes the HTML and scrapes it for registrant info and parses it
into JSON for output.

**NOTE: Due to the limitation of viewdns, a maximum of 500 domains will be returned for any given registrant.**
