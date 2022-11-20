const express = require("express");
const app = express();
const cors = require("cors");
const multer = require('multer');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

const stripe = require("stripe")("sk_test_51M5zteHTzGbdWjdPvMC9qGehWV3D4RpHgMMaIoUAnmzYxIcNFkp2X9QNejZz8KSBPXtL7e8fc6wRb1HRU8Kt1LoK00zt85KI3A")

app.get("/create-checkout-session", async (req, res) => {
  
  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: '4242424242424242',
      exp_month: 11,
      exp_year: 2023,
      cvc: '314',
    },
  });

  const product = await stripe.products.create({
    name: req.query.charity,
  });
  // console.log(product);

  const price = await stripe.prices.create({
    currency: 'cad',
    unit_amount: req.query.donationAmount * 100,
    product: product.id,
  });

  // console.log(price)

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [{price: price.id, quantity: 1}],
  });

  console.log(paymentLink);

  res.send(paymentLink);
})

app.listen(3001, () => {
  console.log("server running port 3001");
});
