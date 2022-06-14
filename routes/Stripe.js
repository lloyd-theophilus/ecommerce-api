const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/payment", async (req, res) => { 
    stripe.charges.create({
      source: req.body.token.id,
      amount: req.body.amount,
      currency: "usd",
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeRes });
        }
    }
    );  // Create a charge: this will charge the user's card
});

module.exports = router;