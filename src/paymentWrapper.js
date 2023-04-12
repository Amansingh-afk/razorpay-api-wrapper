const PaymentService = require("./payment");

class PaymentGateway {
  constructor(key_id, key_secret) {
    this.paymentService = new PaymentService(key_id, key_secret);
  }

  async initializePayment(amount, currency, account) {
    const order = await this.paymentService.initializePayment(amount, currency, account);
    return order;
  }

  async processPayment(orderId, paymentDetails) {
    const payment = await this.paymentService.processPayment(orderId, paymentDetails);
    return payment;
  }
}

module.exports = PaymentWrapper;