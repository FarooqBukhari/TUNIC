import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeBtn = (props) => {
    const {label, price, email, successHandler} = props;
    const publishableKey = "pk_test_51IxaZqAP0DZyU1vXIcas2Vbk1huv6XUJeS83fWuZWW2Bv3nMqncrP0q8HZFUmb5sS1hZq0nD5MTOzOF1jTo6xGS700TxAnHRAL";

    const onToken = token => {
        const body = {
            amount: price,
            token: token
        };
        successHandler(body);
    };
    return (
        <StripeCheckout
            label={label} //Component button text
            ComponentClass="div"
            name="Pay Bill" //Modal Header
            description={`Your total bill is ${price} pkr`}
            panelLabel="Pay"
            amount={price*100}
            currency="PKR"
            email={email}
            locale="en"
            token={onToken}
            stripeKey={publishableKey}
            billingAddress={false}
        />
    );
};

export default StripeBtn;