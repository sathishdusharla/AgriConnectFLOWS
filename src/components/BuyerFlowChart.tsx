import React, { useState } from 'react';
import { 
  User, 
  CheckCircle, 
  UserCheck, 
  Monitor, 
  Home, 
  ShoppingCart, 
  Search, 
  AlertTriangle, 
  Handshake, 
  ArrowRight, 
  ArrowDown,
  Truck,
  DollarSign,
  Phone,
  MessageCircle,
  Clock,
  FileText,
  Users,
  X,
  Filter,
  Eye,
  ArrowLeft
} from 'lucide-react';

interface FlowNodeProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  type: 'start' | 'decision' | 'process' | 'action' | 'end';
  className?: string;
  onClick?: () => void;
  isHighlighted?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const FlowNode: React.FC<FlowNodeProps> = ({ 
  icon, 
  title, 
  description, 
  type, 
  className = '', 
  onClick,
  isHighlighted = false,
  size = 'medium'
}) => {
  const getNodeStyles = () => {
    const sizeStyles = {
      small: "p-3 max-w-48",
      medium: "p-4 max-w-56", 
      large: "p-6 max-w-xs"
    };
    
    const baseStyles = `relative ${sizeStyles[size]} rounded-lg shadow-md border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105`;
    const highlightStyles = isHighlighted ? "ring-3 ring-blue-300 ring-opacity-50" : "";
    
    switch (type) {
      case 'start':
        return `${baseStyles} bg-green-50 border-green-200 hover:bg-green-100 ${highlightStyles}`;
      case 'decision':
        return `${baseStyles} bg-yellow-50 border-yellow-200 hover:bg-yellow-100 ${highlightStyles}`;
      case 'process':
        return `${baseStyles} bg-blue-50 border-blue-200 hover:bg-blue-100 ${highlightStyles}`;
      case 'action':
        return `${baseStyles} bg-purple-50 border-purple-200 hover:bg-purple-100 ${highlightStyles}`;
      case 'end':
        return `${baseStyles} bg-red-50 border-red-200 hover:bg-red-100 ${highlightStyles}`;
      default:
        return `${baseStyles} bg-gray-50 border-gray-200 hover:bg-gray-100 ${highlightStyles}`;
    }
  };

  const iconSize = size === 'small' ? 'w-4 h-4' : size === 'medium' ? 'w-5 h-5' : 'w-6 h-6';
  const titleSize = size === 'small' ? 'text-xs' : size === 'medium' ? 'text-sm' : 'text-base';
  const descSize = size === 'small' ? 'text-xs' : 'text-xs';

  return (
    <div 
      className={`${getNodeStyles()} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-2 mb-2">
        <div className="p-1.5 rounded-md bg-white shadow-sm">
          <div className={iconSize}>
            {icon}
          </div>
        </div>
        <h3 className={`font-semibold text-gray-800 ${titleSize}`}>{title}</h3>
      </div>
      <p className={`text-gray-600 ${descSize} leading-relaxed`}>{description}</p>
    </div>
  );
};

const ConnectorArrow: React.FC<{ direction?: 'down' | 'right' | 'diagonal'; className?: string }> = ({ 
  direction = 'down', 
  className = '' 
}) => {
  const getArrowStyles = () => {
    switch (direction) {
      case 'right':
        return 'rotate-90';
      case 'diagonal':
        return 'rotate-45';
      default:
        return '';
    }
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <ArrowDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${getArrowStyles()}`} />
    </div>
  );
};

interface BuyerFlowChartProps {
  onBack: () => void;
}

export const BuyerFlowChart: React.FC<BuyerFlowChartProps> = ({ onBack }) => {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);

  const handleFlowSelection = (flowId: string) => {
    setSelectedFlow(flowId);
  };

  const clearSelection = () => {
    setSelectedFlow(null);
  };

  const renderSelectedFlow = () => {
    switch (selectedFlow) {
      case 'browse-crops':
        return (
          <div className="mt-8 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-blue-700">Browse Crop Listings Process</h3>
                <button onClick={clearSelection} className="p-1 hover:bg-gray-100 rounded">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="flex justify-center items-center space-x-4">
                <FlowNode
                  icon={<Eye className="w-4 h-4 text-blue-600" />}
                  title="View Crop Listings"
                  description="Browse crops posted by farmers"
                  type="process"
                  size="small"
                />
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <FlowNode
                  icon={<Filter className="w-4 h-4 text-blue-600" />}
                  title="Apply Filters"
                  description="Filter by type, location, quantity, price"
                  type="process"
                  size="small"
                />
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <FlowNode
                  icon={<MessageCircle className="w-4 h-4 text-blue-600" />}
                  title="Connect & Discuss"
                  description="Chat/call with farmer to discuss terms"
                  type="process"
                  size="small"
                />
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">If Agreement</div>
                  <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Trade Agreement
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trade Agreement Process */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold text-center mb-4 text-gray-800">Trade Agreement Process</h3>
              <div className="flex justify-center items-center space-x-4">
                <FlowNode
                  icon={<Handshake className="w-4 h-4 text-green-600" />}
                  title="Agree to Trade"
                  description="Either party confirms trade terms"
                  type="process"
                  size="small"
                />
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <FlowNode
                  icon={<Users className="w-4 h-4 text-blue-600" />}
                  title="Agent Assignment"
                  description="Field agent assigned for supervision"
                  type="process"
                  size="small"
                />
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <FlowNode
                  icon={<Truck className="w-4 h-4 text-blue-600" />}
                  title="Quality & Logistics"
                  description="Agent supervises quality, loading & dispatch"
                  type="process"
                  size="small"
                />
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <FlowNode
                  icon={<DollarSign className="w-4 h-4 text-green-600" />}
                  title="Payment"
                  description="On-site payment or bank transfer"
                  type="process"
                  size="small"
                />
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <FlowNode
                  icon={<CheckCircle className="w-4 h-4 text-green-600" />}
                  title="Completion"
                  description="Buyer can return to dashboard for new transactions"
                  type="end"
                  size="small"
                />
              </div>
            </div>
          </div>
        );

      case 'post-requirement':
        return (
          <div className="mt-8 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-purple-700">Post Crop Requirement Process</h3>
                <button onClick={clearSelection} className="p-1 hover:bg-gray-100 rounded">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="flex justify-center items-center space-x-4">
                <FlowNode
                  icon={<FileText className="w-4 h-4 text-purple-600" />}
                  title="Fill Requirements"
                  description="Enter crop type, quantity, price, timeline"
                  type="process"
                  size="small"
                />
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <FlowNode
                  icon={<Search className="w-4 h-4 text-purple-600" />}
                  title="Submit Listing"
                  description="Requirement posted for farmers to see"
                  type="process"
                  size="small"
                />
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <FlowNode
                  icon={<Users className="w-4 h-4 text-purple-600" />}
                  title="Review Proposals"
                  description="Farmers contact, buyer reviews profiles"
                  type="process"
                  size="small"
                />
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <FlowNode
                  icon={<MessageCircle className="w-4 h-4 text-purple-600" />}
                  title="Engage Discussion"
                  description="Chat/call to negotiate terms"
                  type="process"
                  size="small"
                />
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">If Agreement</div>
                  <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Trade Agreement
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trade Agreement Process */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold text-center mb-4 text-gray-800">Trade Agreement Process</h3>
              <div className="flex justify-center items-center space-x-4">
                <FlowNode
                  icon={<Handshake className="w-4 h-4 text-green-600" />}
                  title="Agree to Trade"
                  description="Either party confirms trade terms"
                  type="process"
                  size="small"
                />
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <FlowNode
                  icon={<Users className="w-4 h-4 text-blue-600" />}
                  title="Agent Assignment"
                  description="Field agent assigned for supervision"
                  type="process"
                  size="small"
                />
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <FlowNode
                  icon={<Truck className="w-4 h-4 text-blue-600" />}
                  title="Quality & Logistics"
                  description="Agent supervises quality, loading & dispatch"
                  type="process"
                  size="small"
                />
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <FlowNode
                  icon={<DollarSign className="w-4 h-4 text-green-600" />}
                  title="Payment"
                  description="On-site payment or bank transfer"
                  type="process"
                  size="small"
                />
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <FlowNode
                  icon={<CheckCircle className="w-4 h-4 text-green-600" />}
                  title="Completion"
                  description="Buyer can return to dashboard for new transactions"
                  type="end"
                  size="small"
                />
              </div>
            </div>
          </div>
        );

      case 'dispute-reporting':
        return (
          <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-red-700">Dispute Reporting Process</h3>
              <button onClick={clearSelection} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex justify-center items-center space-x-4">
              <FlowNode
                icon={<AlertTriangle className="w-4 h-4 text-red-600" />}
                title="Report Dispute"
                description="Submit issue or dispute report"
                type="process"
                size="small"
              />
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <FlowNode
                icon={<Users className="w-4 h-4 text-red-600" />}
                title="Team Investigation"
                description="Support team + agent investigate"
                type="process"
                size="small"
              />
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <FlowNode
                icon={<Clock className="w-4 h-4 text-red-600" />}
                title="Resolution"
                description="Issue resolved within 72 hours"
                type="process"
                size="small"
              />
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <FlowNode
                icon={<CheckCircle className="w-4 h-4 text-green-600" />}
                title="Resume Access"
                description="Buyer can return to dashboard for new transactions"
                type="end"
                size="small"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 mb-4 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Role Selection</span>
          </button>
          <div className="flex items-center justify-center space-x-3 mb-3">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Crop Buyer Flow</h1>
          </div>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Complete Buyer Journey - From Registration to Trade Completion
          </p>
        </div>

        {/* Flow Chart */}
        <div className="space-y-6">
          {/* Registration Flow */}
          <div className="flex flex-col items-center space-y-4">
            <FlowNode
              icon={<User className="w-5 h-5 text-green-600" />}
              title="Buyer Registration"
              description="Buyer registers on AgriConnect platform"
              type="start"
              size="medium"
            />
            
            <ConnectorArrow />
            
            <FlowNode
              icon={<UserCheck className="w-5 h-5 text-blue-600" />}
              title="Identity Verification"
              description="On-site verification visit and document validation"
              type="process"
              size="medium"
            />
            
            <ConnectorArrow />
            
            <FlowNode
              icon={<CheckCircle className="w-5 h-5 text-green-600" />}
              title="Access Granted"
              description="Approval granted after verification"
              type="process"
              size="medium"
            />
          </div>

          {/* Central Dashboard */}
          <div className="flex justify-center mt-8">
            <ConnectorArrow />
          </div>
          
          <div className="flex justify-center">
            <FlowNode
              icon={<Home className="w-6 h-6 text-blue-600" />}
              title="Buyer Dashboard"
              description="Central hub with access to all buyer services and features"
              type="process"
              size="medium"
            />
          </div>

          {/* Main 3 Options in Single Row */}
          <div className="mt-8">
            <ConnectorArrow />
            <div className="grid grid-cols-3 gap-6 mt-6 justify-items-center">
              <FlowNode
                icon={<Eye className="w-4 h-4 text-blue-600" />}
                title="Browse Crop Listings"
                description="View crops posted by farmers with filters"
                type="action"
                size="small"
                onClick={() => handleFlowSelection('browse-crops')}
              />

              <FlowNode
                icon={<FileText className="w-4 h-4 text-purple-600" />}
                title="Post Crop Requirement"
                description="Submit crop requirements for farmers to see"
                type="action"
                size="small"
                onClick={() => handleFlowSelection('post-requirement')}
              />

              <FlowNode
                icon={<AlertTriangle className="w-4 h-4 text-red-600" />}
                title="Dispute Reporting"
                description="24/7 support system for issue resolution"
                type="action"
                size="small"
                onClick={() => handleFlowSelection('dispute-reporting')}
              />
            </div>
          </div>

          {/* Dynamic Sub-flow Display */}
          {renderSelectedFlow()}
        </div>

        {/* Instructions */}
        {!selectedFlow && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Click on any of the 3 main options above to see further steps
            </p>
          </div>
        )}

        {/* Legend */}
        <div className="mt-12 bg-white rounded-xl p-4 shadow-lg">
          <h3 className="text-base font-semibold mb-3 text-gray-800">Flow Legend</h3>
          <div className="grid md:grid-cols-5 gap-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-100 border-2 border-green-200 rounded"></div>
              <span className="text-xs text-gray-600">Start Point</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-100 border-2 border-yellow-200 rounded"></div>
              <span className="text-xs text-gray-600">Decision</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-100 border-2 border-blue-200 rounded"></div>
              <span className="text-xs text-gray-600">Process</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-100 border-2 border-purple-200 rounded"></div>
              <span className="text-xs text-gray-600">Action</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-100 border-2 border-red-200 rounded"></div>
              <span className="text-xs text-gray-600">End Point</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};