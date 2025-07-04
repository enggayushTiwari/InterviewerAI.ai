"use client";
import React, { useState } from 'react';
import { toast } from "sonner";
import { PaidUser } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import moment from 'moment';

export default function UpgradePage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useUser();

  // Only Free and Professional plans
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      popular: false,
      description: 'Perfect for trying out our platform',
      features: [
        '5 practice sessions per month',
        'Basic AI feedback',
        'Limited question bank',
        'Email support',
        '720p video recording'
      ],
      limitations: [
        'No advanced analytics',
        'No custom questions',
        'No interview scheduling'
      ]
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 29,
      popular: true,
      description: 'Ideal for serious job seekers',
      features: [
        'Unlimited practice sessions',
        'Advanced AI feedback & scoring',
        'Complete question bank (500+ questions)',
        'Priority email & chat support',
        '1080p video recording',
        'Detailed performance analytics',
        'Custom question creation',
        'Interview scheduling assistant',
        'Resume analysis integration',
        'Progress tracking & goals'
      ],
      limitations: []
    }
  ];

  const handleUpgrade = (plan) => {
    if (plan.id === 'free') {
      toast.info('You are already on the free plan!');
      return;
    }
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  // Razorpay payment handler
  const handleRazorpayPayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Load Razorpay script if not already loaded
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => openRazorpay();
      script.onerror = () => {
        setIsProcessing(false);
        alert("Failed to load Razorpay. Please check your internet connection.");
      };
      document.body.appendChild(script);
    } else {
      openRazorpay();
    }
  };

  const openRazorpay = async () => {
    setIsProcessing(false);

    // Fetch payment config from your API
    const res = await fetch('/api/razorpay/initiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: selectedPlan.price * 100 }),
    });
    const paymentConfig = await res.json();

    const options = {
      ...paymentConfig,
      handler: async function (response) {
        // Mark user as paid in your DB
        await db.insert(PaidUser).values({
          userEmail: user?.primaryEmailAddress?.emailAddress,
          paidAt: moment().format('DD-MM-yyyy HH:mm:ss')
        });
        toast.success("Payment successful! Welcome to Professional plan!");
        setShowPaymentModal(false);
        setSelectedPlan(null);
      },
      prefill: {
        email: user?.primaryEmailAddress?.emailAddress || "test@razorpay.com",
        contact: "9999999999"
      },
      theme: {
        color: "#6366f1"
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              Choose Your <span className="text-blue-600">Plan</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock your interview potential with AI-powered coaching tailored to your career goals
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all hover:shadow-xl ${
                plan.popular
                  ? 'border-blue-500 scale-105'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </div>

                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleUpgrade(plan)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : plan.id === 'free'
                      ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                      : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                  }`}
                  disabled={plan.id === 'free'}
                >
                  {plan.id === 'free' ? 'Current Plan' : `Get ${plan.name}`}
                </button>
              </div>
            </div>
          ))}

          {/* Features Comparison */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Feature Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Features</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">Free</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">Professional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 px-4 text-gray-700">Practice Sessions</td>
                    <td className="py-4 px-4 text-center text-gray-600">5/month</td>
                    <td className="py-4 px-4 text-center text-green-600">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">AI Feedback Quality</td>
                    <td className="py-4 px-4 text-center text-gray-600">Basic</td>
                    <td className="py-4 px-4 text-center text-green-600">Advanced</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">Question Bank Access</td>
                    <td className="py-4 px-4 text-center text-gray-600">Limited</td>
                    <td className="py-4 px-4 text-center text-green-600">Full (500+)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">Video Quality</td>
                    <td className="py-4 px-4 text-center text-gray-600">720p</td>
                    <td className="py-4 px-4 text-center text-green-600">1080p</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">Analytics & Reports</td>
                    <td className="py-4 px-4 text-center text-red-500">✗</td>
                    <td className="py-4 px-4 text-center text-green-600">✓</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">Custom Questions</td>
                    <td className="py-4 px-4 text-center text-red-500">✗</td>
                    <td className="py-4 px-4 text-center text-green-600">✓</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">Interview Scheduling</td>
                    <td className="py-4 px-4 text-center text-red-500">✗</td>
                    <td className="py-4 px-4 text-center text-green-600">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Razorpay Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-screen overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Complete Your Purchase</h3>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{selectedPlan?.name} Plan</span>
                    <span className="font-bold text-blue-600">
                      ${selectedPlan?.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Only Razorpay Payment Button */}
              <div className="p-6">
                <button
                  type="button"
                  className="w-full py-3 px-6 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  disabled={isProcessing}
                  onClick={handleRazorpayPayment}
                >
                  {isProcessing ? "Processing..." : `Pay with Razorpay`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
