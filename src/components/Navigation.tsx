import React from 'react';
import { Heart, TrendingUp, Music, BookOpen, Home, Brain } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'mood', label: 'Mood Log', icon: Heart },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'coping', label: 'Coping', icon: Brain },
    { id: 'journal', label: 'Journal', icon: BookOpen },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3 animate-fadeInUp">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse-custom">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text animate-float">
              MindfulAI
            </h1>
          </div>
          
          <div className="hidden md:flex space-x-1">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ripple animate-slideInRight stagger-${index + 1} ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg animate-glow'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:shadow-md'
                }`}
              >
                <tab.icon className={`w-5 h-5 transition-transform duration-200 ${
                  activeTab === tab.id ? 'animate-bounce-custom' : ''
                }`} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex overflow-x-auto pb-2 space-x-1 scrollbar-hide">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 whitespace-nowrap animate-fadeInUp stagger-${index + 1} ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon className={`w-5 h-5 transition-transform duration-200 ${
                activeTab === tab.id ? 'animate-bounce-custom' : ''
              }`} />
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;