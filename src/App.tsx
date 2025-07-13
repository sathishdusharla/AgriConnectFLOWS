import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { FlowChart } from './components/FlowChart';
import { BuyerFlowChart } from './components/BuyerFlowChart';
import { CompanyFlowChart } from './components/CompanyFlowChart';

type CurrentView = 'landing' | 'farmer' | 'buyer' | 'company';

function App() {
  const [currentView, setCurrentView] = useState<CurrentView>('landing');

  const handleNavigate = (role: 'farmer' | 'buyer' | 'company') => {
    setCurrentView(role);
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'farmer':
        return <FlowChart onBack={handleBackToLanding} />;
      case 'buyer':
        return <BuyerFlowChart onBack={handleBackToLanding} />;
      case 'company':
        return <CompanyFlowChart onBack={handleBackToLanding} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return renderCurrentView();
}

export default App;