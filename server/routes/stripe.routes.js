const StripeController = require('../controllers/stripe.controller');


module.exports = function(app){
    app.post('/create-payment-intent', StripeController.createPaymentIntent);
}