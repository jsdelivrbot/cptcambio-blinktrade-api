<% 
var BlinkTradeWS = require("blinktrade").BlinkTradeWS;
var blinktradeSocket = new BlinkTradeWS({ prod: true });


blinktradeSocket.connect().then(function() {
  return blinktradeSocket.login({ username: "k2LV39NRazAI0ZRblq0JCtjIE4j4rQux0smwzG1BRvY", password: "vpD5zAVRbRXXEpv", brokerId: 4 });
}).then(function(logged) {
  console.log(logged);
//  blinktradeSocket.requestDeposit().then(function(deposit) {
//    console.log(deposit);
//  });
});
 %>