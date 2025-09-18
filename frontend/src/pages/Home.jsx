import React from 'react';
import { Link } from 'react-router-dom';

// Mock data for new sections
const useCases = [
  { title: '24/7 AI Assistance', description: 'Get answers and quotes anytime, day or night, from our advanced AI agent.' },
  { title: 'Personalized Quotes', description: 'Our AI analyzes your needs to provide custom quotes in minutes, not days.' },
  { title: 'Simplified Claims', description: 'Start a claim by simply talking to our AI. No complicated forms, no waiting on hold.' },
];

const reviews = [
  { name: 'Sarah L.', rating: 5, text: 'The AI made getting a quote so easy! I was done in 5 minutes. Highly recommend!' },
  { name: 'Michael B.', rating: 5, text: 'Finally, an insurance company that uses modern technology. The process was seamless.' },
  { name: 'Jessica P.', rating: 4, text: 'A great experience overall. The AI was helpful and the rates were competitive.' },
];

const awards = [
  { name: 'A+ Financial Strength', logo: 'A+' },
  { name: 'InsurTech Innovator 2024', logo: '🏆' },
  { name: 'AI Excellence Award', logo: '🤖' },
  { name: 'Top Customer Service', logo: '⭐' },
];

const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'Australia', 'Singapore'];

const Home = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      {/* Hero Section */}
      <div className="relative w-full max-w-5xl mx-auto text-center py-24">
        <div className="bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-16 border border-white/30">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
            Insurance, Reimagined by <span className="text-teal-800">AI</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            Your intelligent insurance partner. Get personalized quotes and manage your policies with the power of conversational AI.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/signup" className="rounded-md bg-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 transition-transform transform hover:scale-105 duration-200">
              Get Started
            </Link>
            <Link to="/login" className="text-lg font-semibold leading-6 text-gray-900 hover:text-gray-700 transition-colors">
              Log in <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="max-w-5xl mx-auto my-16">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Why Choose Insure AI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase) => (
            <div key={useCase.title} className="bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition-transform duration-300">
              <h3 className="font-semibold text-2xl text-teal-800">{useCase.title}</h3>
              <p className="text-gray-600 mt-4">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-5xl mx-auto my-16">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Trusted by Thousands</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.name} className="bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-4 text-2xl">{'⭐'.repeat(review.rating)}<span className="text-gray-400">{'⭐'.repeat(5 - review.rating)}</span></div>
              <p className="text-gray-600 italic">"{review.text}"</p>
              <p className="text-right font-semibold text-teal-800 mt-4">- {review.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Awards & Ratings Section */}
      <div className="max-w-5xl mx-auto my-16">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Industry Recognition & Ratings</h2>
        <div className="bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-lg p-8">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {awards.map((award) => (
              <div key={award.name} className="flex items-center gap-3 text-gray-700 font-semibold text-lg">
                <span className="text-3xl">{award.logo}</span>
                <span>{award.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Coverage Section */}
      <div className="max-w-5xl mx-auto my-16">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Serving Clients Worldwide</h2>
        <div className="bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-lg p-8">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-gray-700 font-medium">
            {countries.map((country) => (
              <span key={country} className="ring-1 ring-gray-300/50 rounded-full px-4 py-2">{country}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
