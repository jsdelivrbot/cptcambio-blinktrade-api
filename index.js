const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var BlinkTradeRest = require("blinktrade").BlinkTradeRest;
var blinktrade = new BlinkTradeRest({ currency: "BRL", brokerId: 11 });


var BlinkTradeWS = require("blinktrade").BlinkTradeWS;
var blinktradeSocket = new BlinkTradeWS({ prod: true, brokerId: 11 });

blinktrade.orderbook().then(function(orderbook) {
  console.log(orderbook);
});


function login(name,passwd,broker,res){
  blinktradeSocket.connect().then(function() {
    return blinktradeSocket.login({ username: name, password: passwd, brokerId: broker }).catch(e => {
        res.json({'error': 'wrong password', 'exception': e})
      });
    }).then(function(logged) {
      res.json(logged);
    }).catch(e => {
      res.json({'error': 'wrong key', 'exception': e})
    })
  }


function getDepositAddress(name,passwd,broker,res) {
    blinktradeSocket.connect().then(function() {
      return blinktradeSocket.login({ username: name, password: passwd, brokerId: broker }).catch(e => {
        res.json({'error': 'wrong password', 'exception': e});
      });
    }).then(function(logged) {
      blinktradeSocket.requestDeposit().then(function(deposit) {
        res.json(deposit);
      }).catch(e => {
        res.json({'error': 'generate deposit error', 'exception': e});
      });
    }).catch(e => {
      res.json({'error': 'wrong key', 'exception': e});
    });
  }


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/:method/:userKey/:passwd/:broker', function (req, res) {
    if (req.params.method == "login"){
      login(req.params.userKey,req.params.passwd,req.params.broker,res)
    } else if ('new_deposit'){
      getDepositAddress(req.params.userKey,req.params.passwd,req.params.broker,res)  
    }
        
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
