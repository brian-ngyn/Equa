const express = require("express");
const app = express();
const cors = require("cors");
const multer = require('multer');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

const stripe = require("stripe")("sk_test_51M5zteHTzGbdWjdPvMC9qGehWV3D4RpHgMMaIoUAnmzYxIcNFkp2X9QNejZz8KSBPXtL7e8fc6wRb1HRU8Kt1LoK00zt85KI3A")

app.get("/create-user", async (req, res) => {
  console.log(req.query);
  
  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: req.query.credit_card_num,
      exp_month: req.query.expiry_date.substring(0, 2),
      exp_year: '20' + req.query.expiry_date.substring(2,4),
      cvc: req.query.cvc,
    },
  });

  const customer = await stripe.customers.create({
    email: req.query.email,
    name: req.query.full_name,
    payment_method: paymentMethod.id,
  });

  res.send({payment: paymentMethod, customer: customer});
});

app.get("/donate", async (req, res) => {
  console.log(req.query);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.query.donationAmount * 100,
    currency: 'cad',
    description: 'Donation to ' + req.query.charity,
    payment_method_types: ['card'],
    confirm: true,
    customer: req.query.docSnap.customer_id,
    payment_method: req.query.docSnap.payment_id,
    receipt_email: req.query.email
  });

  res.send(paymentIntent);
})

app.listen(3001, () => {
  console.log("server running port 3001");
});
