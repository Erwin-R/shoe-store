const StripeController = require('../controllers/stripe.controller');
require('dotenv').config();
const stripe = require("stripe")(process.env.SECRET_KEY);
const { Shoe } = require('../models/shoe.model');

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};



module.exports.createPaymentIntent = async (req, res) => {
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });
    console.log(paymentIntent);
    console.log("hello spaceman!")
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
}


/********************CRUD FOR PRODUCTS**********************************/ 
module.exports.createStripeProduct = async (req, res) => {
    const {name, description, images} = req.body;
    const product = await stripe.products.create({
        name, description, images
    });
    console.log("space man")
    console.log(product)
    res.send(product);
}

module.exports.listAllProducts = async (req, res) => {
    const product = await stripe.products.list({
        limit: 20
    })

    res.send(product);
}


module.exports.getOneProduct = async (req, res) => {
    console.log(req.params.id)
    const stripeId = req.params.id
    console.log(typeof(stripeId))
    const product = await stripe.products.retrieve(
        stripeId
    );
    res.send(product);
}

module.exports.updateStripeProduct = async (req, res) => {
    const stripeProductId = req.params.id
    const stripePriceId = req.body
    console.log("hello from strip controller")
    console.log(stripePriceId)
    const product = await stripe.products.update(
        stripeProductId,
        stripePriceId
        );
    
    res.send(product)
}


module.exports.deleteOneProduct = async (req, res) => {
    const deletedProduct = await stripe.product.del(
        "prod_NF9rjNXe1gimA6"
    );
    res.send(deletedProduct);
}


/**************************CRUD FOR PRICES*********************************/ 
module.exports.createPriceObject = async (req, res) => {
    const {stripePrice, stripeProductId} = req.body
    const price = await stripe.prices.create({
        unit_amount: stripePrice,
        currency: "usd",
        product: stripeProductId
    })
    
    res.send(price);
}

module.exports.getAllPrices = async (req, res) => {
    const price = await stripe.prices.create({
        limit: 20,
    })
    
    res.send(price);
}

module.exports.getOnePrice = async (req, res) => {
    const priceId = req.params.id
    const price = await stripe.prices.retrieve(
        priceId
    );
    
    res.send(price);
}