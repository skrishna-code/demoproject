import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import MoodLogger from './components/MoodLogger';
import MoodTrends from './components/MoodTrends';
import MusicRecommendations from './components/MusicRecommendations';
import CopingStrategies from './components/CopingStrategies';
import Journal from './components/Journal';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleMoodLogged = () => {
    setRefreshKey(prev => prev + 1);
    setActiveTab('dashboard');
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard key={refreshKey} />;
      case 'mood':
        return <MoodLogger onMoodLogged={handleMoodLogged} />;
      case 'trends':
        return <MoodTrends key={refreshKey} />;
      case 'music':
        return <MusicRecommendations key={refreshKey} />;
      case 'coping':
        return <CopingStrategies />;
      case 'journal':
        return <Journal />;
      default:
        return <Dashboard key={refreshKey} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="pb-8">
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default App;