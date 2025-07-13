import React from 'react';
import { User, ShoppingCart, Building2, Wheat, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (role: 'farmer' | 'buyer' | 'company') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const roleCards = [
    {
      id: 'farmer' as const,
      title: 'Farmer Role Flow',
      description: 'Complete journey from registration to selling crops and accessing agri-inputs',
      icon: <User className="w-8 h-8 text-green-600" />,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverColor: 'hover:bg-green-100',
      features: ['Order Agri-Inputs', 'Post Crops for Sale', 'Search Buyers', 'Health Visits', 'Issue Reporting']
    },
    {
      id: 'buyer' as const,
      title: 'Crop Buyer Role Flow',
      description: 'Browse crop listings, post requirements, and complete trade agreements',
      icon: <ShoppingCart className="w-8 h-8 text-blue-600" />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:bg-blue-100',
      features: ['Browse Crop Listings', 'Post Requirements', 'Trade Negotiations', 'Quality Assurance', 'Secure Payments']
    },
    {
      id: 'company' as const,
      title: 'Company Role Flow',
      description: 'Manage agri-input listings, process orders, and handle inventory logistics',
      icon: <Building2 className="w-8 h-8 text-purple-600" />,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverColor: 'hover:bg-purple-100',
      features: ['List Agri-Inputs', 'Manage Orders', 'Inventory Control', 'Quality Management', 'Logistics Coordination']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Wheat className="w-12 h-12 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800">AgriConnect</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive Agricultural Platform - Connecting Farmers, Buyers, and Companies
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Explore the complete user journey for each role in our ecosystem
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {roleCards.map((role) => (
            <div
              key={role.id}
              className={`${role.bgColor} ${role.borderColor} ${role.hoverColor} border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 group`}
              onClick={() => onNavigate(role.id)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {role.icon}
                </div>
                <h2 className="text-xl font-bold text-gray-800">{role.title}</h2>
              </div>
              
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {role.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <h3 className="text-sm font-semibold text-gray-700">Key Features:</h3>
                <ul className="space-y-1">
                  {role.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">View Flow Chart</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Platform Overview */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Platform Overview</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800">Farmers</h4>
              <p className="text-xs text-gray-600">Access inputs, sell crops, get expert advice</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800">Buyers</h4>
              <p className="text-xs text-gray-600">Source quality crops directly from farmers</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800">Companies</h4>
              <p className="text-xs text-gray-600">Supply certified agri-inputs and services</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Developed by{' '}
            <a 
              href="https://linkedin.com/in/sathishdusharla" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-800 underline cursor-pointer transition-colors"
            >
              @Sathish Dusharla
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};