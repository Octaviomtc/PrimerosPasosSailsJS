# PrimerosPasosSailsJS
### a Sails application

# Config

#### add local.js to config

```
 module.exports = {
  adapters: {
    'default': 'mongo',
    mongo: {
      module: 'sails-mongo',
      host: 'YOUR_HOST',
      user: 'YOUR_MONGO_USER',
      password: 'YOUR_MONGO_PASSWORD',
      database: 'NAME_DATA',
      schema: true
    }
  }
 };

```
# Run

#### bower

`
bower install
`


#### npm install

`npm install`


#### start mongodb
