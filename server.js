import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: 'rzp_test_9WaeLLXnagzude', // updated to match frontend
  key_secret: 'oVeQp5yJdPn1USEFfbt4QSlM',
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
    res.json({ order_id: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
