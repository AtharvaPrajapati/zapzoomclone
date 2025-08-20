import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: 'rzp_test_R7H4c0ZpjgDeo0', // updated to match frontend
  key_secret: 'oVeQp5yJdPn1USEFfbt4QSlM',
});

// Verify payment signature
app.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const generated_signature = crypto.createHmac('sha256', razorpay.key_secret)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');
  if (generated_signature === razorpay_signature) {
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
});

app.post('/create-order', async (req, res) => {
  const { amount, currency, receipt, notes } = req.body;
  try {
    const options = {
      amount: amount || 100, // amount in paise
      currency: currency || 'INR',
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || { type: 'payment' },
    };
    const order = await razorpay.orders.create(options);
    res.json(order); // Return full order object
  } catch (error) {
    console.error(error); // Log the full error for debugging
    res.status(500).json({ error: error.message });
  }
});

// Test order endpoint for demo purposes
app.post('/test-order', (req, res) => {
  const { amount, currency, receipt, notes } = req.body;
  // Simulate a successful order creation
  const testOrder = {
    id: `order_test_${Date.now()}`,
    entity: 'order',
    amount: amount || 100,
    currency: currency || 'INR',
    receipt: receipt || `receipt_${Date.now()}`,
    status: 'created',
    notes: notes || { type: 'test' },
    order_id: `order_test_${Date.now()}`
  };
  res.json(testOrder);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
