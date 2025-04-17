import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Trainee Management',
    description: 'Easily add, update, and manage trainees with an intuitive dashboard.',
    icon: (
      <svg className="w-10 h-10 mx-auto mb-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" />
      </svg>
    ),
  },
  {
    title: 'Role-Based Access',
    description: 'Granular permissions for Admin, HR, and Trainers to ensure security.',
    icon: (
      <svg className="w-10 h-10 mx-auto mb-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a7.5 7.5 0 0113 0" />
      </svg>
    ),
  },
  {
    title: 'Real-Time Updates',
    description: 'Stay up-to-date with instant notifications and live trainee progress.',
    icon: (
      <svg className="w-10 h-10 mx-auto mb-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
];

const LandingPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Enhanced decorative background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <svg width="100%" height="100%" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle cx="0" cy="0" r="400" fill="url(#grad1)" />
            <circle cx="1440" cy="400" r="600" fill="url(#grad2)" />
            <circle cx="750" cy="100" r="150" fill="#6366F1" fillOpacity="0.2" />
            <circle cx="300" cy="600" r="200" fill="#8B5CF6" fillOpacity="0.2" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
      </div>

      {/* Hero Section - Enhanced */}
      <section className="min-h-screen flex items-center justify-center relative z-10 px-4 py-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left animate-fade-in">
            <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full bg-blue-500 bg-opacity-20 backdrop-blur-sm border border-blue-400 border-opacity-30">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse mr-2"></div>
              <span className="text-sm font-medium text-white">Elite Trainee Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              <span className="inline-block">Trainee</span>
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">Management</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-10 max-w-xl animate-fade-in-slow">
              Elevate your training programs with our sophisticated platform. Streamline onboarding, track progress, and empower your future leaders.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-center md:justify-start">
              <Link
                to="/register"
                className="group relative px-8 py-4 bg-white text-blue-800 font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <Link
                to="/login"
                className="group relative px-8 py-4 border border-blue-300 text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-200"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-blue-500 bg-opacity-20 group-hover:bg-opacity-30 transition-all"></div>
              </Link>
            </div>
          </div>

          {/* Abstract 3D Visual */}
          <div className="relative hidden md:block animate-float">
            <div className="absolute w-72 h-72 bg-blue-500 bg-opacity-20 backdrop-blur rounded-full top-10 left-10"></div>
            <div className="absolute w-60 h-60 bg-indigo-500 bg-opacity-20 backdrop-blur rounded-full bottom-10 right-10"></div>
            <div className="relative z-10 backdrop-blur-sm bg-white bg-opacity-10 border border-white border-opacity-20 rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="h-24 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600"></div>
                <div className="h-24 rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600"></div>
              </div>
              <div className="h-24 rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 mb-4"></div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-12 rounded-md bg-white bg-opacity-20"></div>
                <div className="h-12 rounded-md bg-white bg-opacity-20"></div>
                <div className="h-12 rounded-md bg-white bg-opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white bg-opacity-95 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-16">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature) => (
              <div key={feature.title} className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-1">
                {feature.icon}
                <h4 className="text-xl font-semibold mb-2 text-blue-700">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          &copy; 2025 <span className="font-bold text-white">Trainee Management</span>. All rights reserved.
        </div>
      </footer>

      {/* Animations */}
      {/* eslint-disable-next-line no-useless-escape */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 1s ease;
          }
          .animate-fade-in-slow {
            animation: fadeIn 1.5s ease;
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .hover:shadow-glow:hover {
            box-shadow: 0 0 25px rgba(147, 197, 253, 0.5);
          }
          .hover:shadow-glow:hover {
            box-shadow: 0 0 25px rgba(147, 197, 253, 0.5);
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: none;}
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;