"use client";
import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Brain, Target, Users, CheckCircle, Star, Play, Menu, X } from 'lucide-react';
import Header from "./dashboard/_components/Header";

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Smooth scroll to section
  const scrollToSection = (id) => {
    if (typeof window !== "undefined") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <Header />
      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center py-20 px-4">
            {/* New Release Banner */}
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200 rounded-full px-6 py-3 flex items-center space-x-3 shadow-sm">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-semibold">🚀 New Release</span>
                <div className="w-px h-4 bg-gray-300"></div>
                <button onClick={() => scrollToSection("features")} className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 bg-transparent border-none">
                  <span>See what's new</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Hero Content */}
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Your Personal{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Interview Coach
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Double your chances of landing that job offer with our AI-powered interview prep.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/dashboard">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <button
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-300 hover:text-blue-600 transition-all bg-white"
                onClick={() => scrollToSection("how-it-works")}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Background Decorations */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute top-40 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-pink-200 rounded-full opacity-20 blur-xl"></div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our AI Interview Coach?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience the most realistic interview practice with AI-powered feedback and personalized coaching.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mt-4 mb-4 text-blue-700">AI-Powered Questions</h3>
                <p className="text-gray-600 text-center">Get realistic, role-specific questions generated by advanced AI models tailored to your experience.</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mt-4 mb-4 text-blue-700">Practice with Webcam</h3>
                <p className="text-gray-600 text-center">Simulate real interviews with video, audio recording, and get comfortable with camera presence.</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mt-4 mb-4 text-blue-700">Instant Feedback</h3>
                <p className="text-gray-600 text-center">Get actionable feedback and detailed ratings to improve your performance and confidence.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-blue-700">How it Works?</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                  1
                </div>
                <h3 className="font-bold text-lg mb-4 text-blue-700">Sign Up & Login</h3>
                <p className="text-gray-600">Create your account and access your personalized dashboard with ease.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                  2
                </div>
                <h3 className="font-bold text-lg mb-4 text-blue-700">Add Interview Role</h3>
                <p className="text-gray-600">Specify your target role and let our AI generate relevant, challenging questions.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                  3
                </div>
                <h3 className="font-bold text-lg mb-4 text-blue-700">Practice Interview</h3>
                <p className="text-gray-600">Start your mock interview with webcam recording and answer AI-generated questions.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                  4
                </div>
                <h3 className="font-bold text-lg mb-4 text-blue-700">Get Feedback</h3>
                <p className="text-gray-600">Receive instant, detailed feedback and track your improvement over time.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-blue-700">What Our Users Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-xl transition-shadow">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" width={64} height={64} alt="User1" className="rounded-full mb-6" />
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="italic text-gray-600 mb-4 text-center">"The AI questions were spot on for my role. I felt super confident in my real interview and got the job!"</p>
                <span className="font-semibold text-blue-700">Amit S.</span>
                <span className="text-sm text-gray-500">Software Engineer</span>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-xl transition-shadow">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" width={64} height={64} alt="User2" className="rounded-full mb-6" />
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="italic text-gray-600 mb-4 text-center">"Loved the instant feedback and webcam practice. It felt like a real interview experience!"</p>
                <span className="font-semibold text-blue-700">Priya K.</span>
                <span className="text-sm text-gray-500">Product Manager</span>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-xl transition-shadow">
                <img src="https://randomuser.me/api/portraits/men/65.jpg" width={64} height={64} alt="User3" className="rounded-full mb-6" />
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="italic text-gray-600 mb-4 text-center">"Helped me land my dream job at a top tech company. Highly recommend to all job seekers!"</p>
                <span className="font-semibold text-blue-700">Rahul D.</span>
                <span className="text-sm text-gray-500">Data Scientist</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-blue-200">Successful Interviews</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">85%</div>
                <div className="text-blue-200">Success Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-200">Job Roles Covered</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-200">AI Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Upgrade CTA */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Ready to Ace Your Next Interview?</h2>
            <p className="text-xl text-gray-600 mb-8">Join thousands of job seekers who have successfully landed their dream jobs with our AI interview coach.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/dashboard/upgrade">
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all">
                  View Pricing
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">AI Interview Mocker</span>
              </div>
              <p className="text-gray-400">
                Your personal AI interview coach to help you land your dream job with confidence.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                <button onClick={() => router.push("/dashboard")} className="text-gray-400 hover:text-white block bg-transparent border-none text-left">Dashboard</button>
                <button onClick={() => router.push("/dashboard/questions")} className="text-gray-400 hover:text-white block bg-transparent border-none text-left">Questions</button>
                <button onClick={() => router.push("/dashboard/upgrade")} className="text-gray-400 hover:text-white block bg-transparent border-none text-left">Pricing</button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <button onClick={() => scrollToSection("features")} className="text-gray-400 hover:text-white block bg-transparent border-none text-left">Features</button>
                <button onClick={() => scrollToSection("how-it-works")} className="text-gray-400 hover:text-white block bg-transparent border-none text-left">How it Works</button>
                <a href="#" className="text-gray-400 hover:text-white block">Contact</a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white block">Help Center</a>
                <a href="#" className="text-gray-400 hover:text-white block">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white block">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AI Interview Mocker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}