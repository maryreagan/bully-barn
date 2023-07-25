require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { dbConnect } = require("./db");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY); // Private key used to interact to the Stripe API


const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "127.0.0.1";

const dogController = require("./controllers/dog-route");
const formController = require("./controllers/form-route");
const authController = require("./controllers/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", authController);
app.use("/dog", dogController);
app.use("/form", formController);

// Create a Checkout Session
// Every time a customer initiates the checkout process
// this endpoint will generate a unique session for the transaction
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { fee } = req.body; // Get the selected fee from the request body
        const feeInCents = fee * 100; // Convert the fee to cents for Stripe

        // Create the checkout session with the selected fee
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Adoption Fee: $${fee.toFixed(2)}`,
                        },
                        unit_amount: feeInCents,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:5173/payment-status?success=true',
            cancel_url: 'http://localhost:5173/payment-status?canceled=true',
        });

        res.json({ url: session.url }); // Return the checkout session URL to the frontend
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(PORT, HOST, () => {
    dbConnect();
    console.log(`[server] listening on ${HOST} ${PORT}`);
});

// comment for develop branch
// comment from Angelina's branch
// comment for amanda branch
