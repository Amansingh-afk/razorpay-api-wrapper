const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const PaymentGateway = require("./paymentWrapper");

describe("PaymentGateway", () => {
  const key_id = "key_id";
  const key_secret = "key_secret";
  const amount = 100;
  const currency = "INR";
  const account = "test@example.com";
  const orderId = "order_id";
  const paymentDetails = {
    method: "card",
    card: {
      number: "4111111111111111",
      expiry_month: "05",
      expiry_year: "2023",
      cvv: "123",
      name: "Test User",
    },
  };

  let paymentGateway;
  let initializePaymentStub;
  let processPaymentStub;

  beforeEach(() => {
    paymentGateway = new PaymentGateway(key_id, key_secret);
    initializePaymentStub = sinon.stub(paymentGateway.paymentService, "initializePayment").resolves({ id: orderId });
    processPaymentStub = sinon.stub(paymentGateway.paymentService, "processPayment").resolves({ id: "payment_id" });
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("initializePayment", () => {
    it("should call initializePayment with correct parameters", async () => {
      const order = await paymentGateway.initializePayment(amount, currency, account);

      expect(order).to.deep.equal({ id: orderId });
      expect(initializePaymentStub.calledOnceWith(amount, currency, account)).to.be.true;
    });
  });

  describe("processPayment", () => {
    it("should call processPayment with correct parameters", async () => {
      const payment = await paymentGateway.processPayment(orderId, paymentDetails);

      expect(payment).to.deep.equal({ id: "payment_id" });
      expect(processPaymentStub.calledOnceWith(orderId, paymentDetails)).to.be.true;
    });
  });
});
In 