// app/api/razorpay/initiate.js
import Razorpay from "razorpay";

export async function POST(req) {
  const { amount } = await req.json();

  // Create a Razorpay order (recommended for production)
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // server-side only
    key_secret: process.env.RAZORPAY_KEY_SECRET, // server-side only
  });

  const order = await instance.orders.create({
    amount: amount, // amount in paise
    currency: "INR",
    receipt: "receipt_order_" + Date.now(),
  });

  // Return the public key and order details to the client
  return new Response(
    JSON.stringify({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // public key for client
      amount,
      currency: "INR",
      order_id: order.id,
      name: "Your Company Name",
      description: "Upgrade to Professional Plan",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
