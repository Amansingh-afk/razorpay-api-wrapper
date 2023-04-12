# Razorpay Payment Gateway
This project provides a simple implementation of a payment gateway using Razorpay.

### Installation
To use this payment gateway implementation, you'll need to install the following dependencies:

***Node.js*** (v12 or higher) <br>
***npm*** (v6 or higher) <br>
To install the dependencies, run the following command in your terminal:

`npm install`
### Configuration
Before you can use the payment gateway, you'll need to configure your Razorpay API key and secret. To do this, create a new **`.env`** file in the root directory of your project and add the following lines:

```
RAZORPAY_KEY_ID=<your_key_id>
RAZORPAY_KEY_SECRET=<your_key_secret>
```
Replace `<your_key_id>` and `<your_key_secret>` with your own API key and secret, which you can obtain from the Razorpay Dashboard.

### Usage
This payment gateway implementation provides two methods:

***`initializePayment(amount, currency, account`***): Initializes a new payment and returns an order object with a unique ID that can be used to process the payment.<br>
***`processPayment(orderId, paymentDetails)`***: Processes a payment for the specified order ID with the given payment details (e.g. card number, CVV, etc.) and returns a payment object with the status of the payment.<br>
To use these methods in your application, import the PaymentGateway class from the paymentWrapper module and create a new instance with your Razorpay API key and secret:

``` const PaymentGateway = require("./paymentWrapper");

const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

const paymentGateway = new PaymentGateway(razorpayKeyId, razorpayKeySecret); 
```
You can then use the initializePayment and processPayment methods to handle payment transactions in your application.
```
const amount = 1000; // INR 10
const currency = "INR";
const account = "User123";

// Initialize a new payment and get the order ID
const order = await paymentGateway.initializePayment(amount, currency, account);
const orderId = order.id;

// Process the payment for the order ID with payment details
const paymentDetails = {
  card_number: "4111111111111111",
  card_expiry_month: "12",
  card_expiry_year: "22",
  card_cvv: "123",
  name: "John Doe",
};
const payment = await paymentGateway.processPayment(orderId, paymentDetails);

console.log(payment.status); // Prints 'captured' if payment was successful
```
### Testing
To run the tests for this payment gateway implementation, run the following command in your terminal:

`npm test`
This will run the test.js file using Mocha and Chai, which include a series of tests to validate the payment gateway implementation.

### License
This project is licensed under the MIT License - see the LICENSE file for details.




