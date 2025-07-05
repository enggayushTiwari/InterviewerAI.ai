About
This is an AI based mock interviewing platform made using Google Gemini API use test credentials ayushtiwari8t@gmail.com and Password: Projects@321@

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Simulating a Successful Payment with Razorpay (Test Mode)

This project uses Razorpay in test mode for payment simulation. You can test the payment flow without real money:

1. **Start the app locally** and go to the upgrade/payment page.
2. Choose a paid plan and proceed to pay (Razorpay modal will open).
3. Select **UPI** as the payment method.
4. Enter the following test UPI ID:

   ```
   test@razorpay
   ```

5. Click **Pay**. The payment will be simulated as successful.
6. You will see a success message and your subscription/upgrade will be processed in the app.

**Note:**
- You can use any of Razorpay's [test payment methods](https://razorpay.com/docs/payments/payment-gateway/test-card-upi-details/) for more scenarios.
- No real money is involved in test mode.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
