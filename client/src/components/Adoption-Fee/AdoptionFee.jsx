import React, { useState, useEffect } from 'react';
import "./Adoption-Fee.css"

const ProductDisplay = () => (
    <div className='container'>
        <h1>Adoption Fee</h1>
        <h4>Please use this link to pay your adoption fee.</h4>
        <h4>If you cannot make an adoption but still would like to help, make a donation and become one of our sponsors!</h4>
        <div className="product">
            <img
                src="https://sugarplumnannies.com/wp-content/uploads/2015/11/dog-placeholder.jpg"
                alt="dog placeholder image"
                className='donation-image'
            />
            <div className="description">
                <h3>Dog Adoption donation</h3>
                <p>Payment Amount: $40.00</p>
            </div>
        </div>
        <form action="http://localhost:4000/create-checkout-session" method="POST">
            <button type="submit">
                DONATE
            </button>
        </form>
    </div>
);

const Message = ({ message }) => (
    <section>
        <p>{message}</p>
    </section>
);

function AdoptionFeePage() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    return message ? (
        <Message message={message} />
    ) : (
        <ProductDisplay />
    );
}

export default AdoptionFeePage;
