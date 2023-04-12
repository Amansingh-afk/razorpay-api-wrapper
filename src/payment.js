const Razorpay = require("razorpay");
const { v4: uuidv4 } = require("uuid");

class PaymentService {
  constructor(key_id, key_secret) {
    this.razorpay = new Razorpay({
      key_id,
      key_secret,
    });
  }

  initializePayment(amount, currency, account) {
    const orderOptions = {
      amount: amount * 100, // Razorpay expects the amount in paise
      currency,
      receipt: uuidv4(),
      notes: {
        account,
      },
    };

    return new Promise((resolve, reject) => {
      this.razorpay.orders.create(orderOptions, (error, order) => {
        if (error) {
          reject(error);
        } else {
          resolve(order);
        }
      });
    });
  }

  processPayment(orderId, paymentDetails) {
    return new Promise((resolve, reject) => {
      this.razorpay.payments.create(
        {
          order_id: orderId,
          ...paymentDetails,
        },
        (error, payment) => {
          if (error) {
            reject(error);
          } else {
            resolve(payment);
          }
        }
      );
    });
  }
}

module.exports = PaymentService;
