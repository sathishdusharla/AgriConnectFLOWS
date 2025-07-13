import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle, 
  UserCheck, 
  Home, 
  Package, 
  ShoppingCart, 
  Warehouse, 
  AlertTriangle, 
  ArrowRight, 
  ArrowDown,
  Truck,
  Users,
  Clock,
  FileText,
  X,
  Upload,
  Settings,
  ArrowLeft,
  Phone
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

interface CompanyFlowChartProps {
  onBack: () => void;
}

export const CompanyFlowChart: React.FC<CompanyFlowChartProps> = ({ onBack }) => {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);

  const handleFlowSelection = (flowId: string) => {
    setSelectedFlow(flowId);
  };

  const clearSelection = () => {
    setSelectedFlow(null);
  };

  const renderSelectedFlow = () => {
    switch (selectedFlow) {
      case 'list-inputs':
        return (
          <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-green-700">List Certified Agri-Inputs Process</h3>
              <button onClick={clearSelection} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex justify-center items-center space-x-4">
              <FlowNode
                icon={<Package className="w-4 h-4 text-green-600" />}
                title="Add Products"
                description="Add seeds, fertilizers, pesticides"
                type="process"
                size="small"
              />
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <FlowNode
                icon={<Upload className="w-4 h-4 text-green-600" />}
                title="Upload Certifications"
                description="Upload certificates and descriptions"
                type="process"
                size="small"
              />
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <FlowNode
                icon={<Settings className="w-4 h-4 text-green-600" />}
                title="Set Pricing"
                description="Set pricing and availability"
                type="process"
                size="small"
              />
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <FlowNode
                icon={<FileText className="w-4 h-4 text-green-600" />}
                title="Submit for Review"
                description="Platform approves and products go live"
                type="process"
                size="small"
              />
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <FlowNode
                icon={<CheckCircle className="w-4 h-4 text-green-600" />}
                title="Completion"
                description="Company can continue managing listings and orders"
                type="end"
                size="small"
              />
            </div>
          </div>
        );

      case 'manage-orders':
        return (
          <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-blue-700">Order Management by AgriConnect Platform</h3>
              <button onClick={clearSelection} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex justify-center items-center space-x-4">
              <FlowNode
                icon={<ShoppingCart className="w-4 h-4 text-blue-600" />}
                title="Receive Orders"
                description="Platform receives farmer orders"
                type="process"
                size="small"
              />
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <FlowNode
                icon={<Package className="w-4 h-4 text-blue-600" />}
                title="Process Orders"
                description="AgriConnect processes and coordinates"
                type="process"
                size="small"
              />
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <FlowNode
                icon={<Truck className="w-4 h-4 text-blue-600" />}
                title="Handle Delivery"
                description="Platform manages delivery logistics"
                type="process"
                size="small"
              />
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <FlowNode
                icon={<CheckCircle className="w-4 h-4 text-blue-600" />}
                title="Complete Transaction"
                description="Platform processes payment and confirms delivery"
                type="process"
                size="small"
              />
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <FlowNode
                icon={<FileText className="w-4 h-4 text-green-600" />}
                title="Send Transaction Details"
                description="Company receives transaction information and payment"
                type="end"
                size="small"
              />
            </div>
          </div>
        );

      case 'manage-inventory':
        return (
          <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-purple-700">Inventory & Logistics Management by AgriConnect</h3>
              <button onClick={clearSelection} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex justify-center items-center space-x-4">
              <FlowNode
                icon={<Warehouse className="w-4 h-4 text-purple-600" />}
                title="Track Inventory"
                description="Platform monitors company stock levels"
                type="process"
                size="small"
              />
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <FlowNode
                icon={<AlertTriangle className="w-4 h-4 text-purple-600" />}
                title="Automated Alerts"
                description="Platform sends low stock notifications"
                type="process"
                size="small"
              />
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <FlowNode
                icon={<Users className="w-4 h-4 text-purple-600" />}
                title="Coordinate Logistics"
                description="Platform manages delivery crew assignments"
                type="process"
                size="small"
              />
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <FlowNode
                icon={<Settings className="w-4 h-4 text-purple-600" />}
                title="Optimize Routes"
                description="Platform optimizes delivery routes and schedules"
                type="process"
                size="small"
              />
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <FlowNode
                icon={<FileText className="w-4 h-4 text-green-600" />}
                title="Send Reports"
                description="Company receives inventory and logistics reports"
                type="end"
                size="small"
              />
            </div>
          </div>
        );

      case 'dispute-handling':
        return (
          <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-red-700">Dispute Reporting & Product Complaints Process</h3>
              <button onClick={clearSelection} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex justify-center items-center space-x-4">
              <FlowNode
                icon={<AlertTriangle className="w-4 h-4 text-red-600" />}
                title="Quality Issues Raised"
                description="Farmers report product quality issues"
                type="process"
                size="small"
              />
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <FlowNode
                icon={<Users className="w-4 h-4 text-red-600" />}
                title="Platform Investigation"
                description="Platform investigates the issue"
                type="process"
                size="small"
              />
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <FlowNode
                icon={<FileText className="w-4 h-4 text-red-600" />}
                title="Agent Feedback"
                description="Resolution through agent feedback"
                type="process"
                size="small"
              />
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <FlowNode
                icon={<Package className="w-4 h-4 text-red-600" />}
                title="Product Adjustment"
                description="Company adjusts or replaces if necessary"
                type="process"
                size="small"
              />
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <FlowNode
                icon={<CheckCircle className="w-4 h-4 text-green-600" />}
                title="Resolution"
                description="Company can continue managing listings and orders"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 mb-4 text-purple-600 hover:text-purple-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Role Selection</span>
          </button>
          <div className="flex items-center justify-center space-x-3 mb-3">
            <Building2 className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">Agricultural Company Flow</h1>
          </div>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Complete Company Journey - From Registration to Order Management
          </p>
        </div>

        {/* Flow Chart */}
        <div className="space-y-6">
          {/* Registration Flow */}
          <div className="flex flex-col items-center space-y-4">
            <FlowNode
              icon={<Building2 className="w-5 h-5 text-green-600" />}
              title="Company Registration"
              description="Company registers on AgriConnect platform"
              type="start"
              size="medium"
            />
            
            <ConnectorArrow />
            
            <FlowNode
              icon={<FileText className="w-5 h-5 text-blue-600" />}
              title="Identity Verification"
              description="Submit verification documents"
              type="process"
              size="medium"
            />
            
            <ConnectorArrow />
            
            <FlowNode
              icon={<Phone className="w-5 h-5 text-yellow-600" />}
              title="Verification Call"
              description="Company schedules verification call"
              type="process"
              size="medium"
            />
            
            <ConnectorArrow />
            
            <FlowNode
              icon={<UserCheck className="w-5 h-5 text-blue-600" />}
              title="Field Visit"
              description="Physical verification visit conducted"
              type="process"
              size="medium"
            />
            
            <ConnectorArrow />
            
            <FlowNode
              icon={<CheckCircle className="w-5 h-5 text-green-600" />}
              title="Access Granted"
              description="Post-approval dashboard access granted"
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
              icon={<Home className="w-6 h-6 text-purple-600" />}
              title="Company Dashboard"
              description="Central hub for managing products, orders, and logistics"
              type="process"
              size="medium"
            />
          </div>

          {/* Main 4 Options in Single Row */}
          <div className="mt-8">
            <ConnectorArrow />
            <div className="grid grid-cols-4 gap-4 mt-6">
              <FlowNode
                icon={<Package className="w-4 h-4 text-green-600" />}
                title="List Certified Agri-Inputs"
                description="Add and manage product listings"
                type="action"
                size="small"
                onClick={() => handleFlowSelection('list-inputs')}
              />

              <FlowNode
                icon={<ShoppingCart className="w-4 h-4 text-blue-600" />}
                title="Orders Managed by Platform"
                description="AgriConnect handles order processing and fulfillment"
                type="action"
                size="small"
                onClick={() => handleFlowSelection('manage-orders')}
              />

              <FlowNode
                icon={<Warehouse className="w-4 h-4 text-purple-600" />}
                title="Inventory & Logistics by Platform"
                description="AgriConnect manages stock tracking and logistics"
                type="action"
                size="small"
                onClick={() => handleFlowSelection('manage-inventory')}
              />

              <FlowNode
                icon={<AlertTriangle className="w-4 h-4 text-red-600" />}
                title="Dispute Reporting"
                description="Handle product complaints and issues"
                type="action"
                size="small"
                onClick={() => handleFlowSelection('dispute-handling')}
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
              Click on any of the 4 options above to see detailed process steps
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Order management and inventory logistics are handled by AgriConnect platform
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

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Developed by{' '}
            <a 
              href="https://linkedin.com/in/sathishdusharla" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 underline cursor-pointer transition-colors"
            >
              @Sathish Dusharla
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};