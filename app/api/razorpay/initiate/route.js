import Razorpay from "razorpay";

export async function POST(req) {
  const { amount } = await req.json();

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const order = await instance.orders.create({
    amount: amount,
    currency: "INR",
    receipt: "receipt_order_" + Date.now(),
  });

  return new Response(
    JSON.stringify({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
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
