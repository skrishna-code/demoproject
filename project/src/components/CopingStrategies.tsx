import React, { useState } from 'react';
import { Brain, Clock, Star, ChevronRight, Play, CheckCircle } from 'lucide-react';
import { copingStrategies } from '../data/copingStrategies';
import { getMoodEntries } from '../utils/moodData';

const CopingStrategies: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [completedStrategies, setCompletedStrategies] = useState<string[]>([]);
  
  const entries = getMoodEntries();
  const latestEntry = entries[entries.length - 1];

  const categories = [
    { id: 'all', label: 'All Strategies', icon: Brain, color: 'bg-purple-500' },
    { id: 'breathing', label: 'Breathing', icon: Brain, color: 'bg-blue-500' },
    { id: 'mindfulness', label: 'Mindfulness', icon: Brain, color: 'bg-green-500' },
    { id: 'cbt', label: 'CBT', icon: Brain, color: 'bg-orange-500' },
    { id: 'movement', label: 'Movement', icon: Brain, color: 'bg-red-500' },
    { id: 'creative', label: 'Creative', icon: Brain, color: 'bg-pink-500' }
  ];

  const filteredStrategies = selectedCategory === 'all' 
    ? copingStrategies 
    : copingStrategies.filter(strategy => strategy.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const categoryObj = categories.find(cat => cat.id === category);
    return categoryObj?.color || 'bg-gray-500';
  };

  const handleCompleteStrategy = (strategyId: string) => {
    if (!completedStrategies.includes(strategyId)) {
      setCompletedStrategies([...completedStrategies, strategyId]);
    }
  };

  const getRecommendedStrategies = () => {
    if (!latestEntry) return [];
    
    const moodRecommendations: Record<string, string[]> = {
      anxious: ['breathing', 'mindfulness'],
      sad: ['creative', 'movement'],
      angry: ['breathing', 'movement'],
      happy: ['creative', 'mindfulness'],
      excited: ['mindfulness', 'movement'],
      calm: ['creative', 'mindfulness'],
      neutral: ['breathing', 'cbt']
    };

    const recommendedCategories = moodRecommendations[latestEntry.mood] || ['breathing'];
    return copingStrategies.filter(strategy => 
      recommendedCategories.includes(strategy.category)
    ).slice(0, 3);
  };

  const recommendedStrategies = getRecommendedStrategies();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Coping Strategies & Therapy</h2>
          <p className="text-gray-600">Evidence-based techniques to support your mental well-being</p>
        </div>
      </div>

      {/* Personalized Recommendations */}
      {recommendedStrategies.length > 0 && (
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold mb-4">🎯 Recommended for You</h3>
          <p className="text-green-100 mb-4">
            Based on your current mood ({latestEntry?.mood}), here are some helpful strategies:
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            {recommendedStrategies.map((strategy) => (
              <div
                key={strategy.id}
                className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm border border-white border-opacity-30"
              >
                <h4 className="font-semibold text-white mb-2">{strategy.title}</h4>
                <p className="text-sm text-green-100 mb-3">{strategy.duration}</p>
                <button
                  onClick={() => setSelectedStrategy(strategy.id)}
                  className="bg-white text-green-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors"
                >
                  Try Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Browse by Category</h3>
        
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? `${category.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Strategies Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStrategies.map((strategy) => (
          <div
            key={strategy.id}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {strategy.title}
                </h4>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(strategy.category)} text-white`}>
                    {strategy.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(strategy.difficulty)}`}>
                    {strategy.difficulty}
                  </span>
                </div>
              </div>
              
              {completedStrategies.includes(strategy.id) && (
                <CheckCircle className="w-6 h-6 text-green-500" />
              )}
            </div>
            
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {strategy.description}
            </p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{strategy.duration}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < (strategy.difficulty === 'easy' ? 1 : strategy.difficulty === 'medium' ? 2 : 3)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedStrategy(strategy.id)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Start</span>
              </button>
              
              <button
                onClick={() => handleCompleteStrategy(strategy.id)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <CheckCircle className={`w-5 h-5 ${
                  completedStrategies.includes(strategy.id) 
                    ? 'text-green-500' 
                    : 'text-gray-400'
                }`} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Strategy Detail Modal */}
      {selectedStrategy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {(() => {
              const strategy = copingStrategies.find(s => s.id === selectedStrategy);
              if (!strategy) return null;
              
              return (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">{strategy.title}</h3>
                    <button
                      onClick={() => setSelectedStrategy(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(strategy.category)} text-white`}>
                        {strategy.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(strategy.difficulty)}`}>
                        {strategy.difficulty}
                      </span>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{strategy.duration}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Instructions</h4>
                      <p className="text-gray-700 leading-relaxed">{strategy.description}</p>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-3">💡 Tips for Success</h4>
                      <ul className="text-blue-800 space-y-2 text-sm">
                        <li>• Find a quiet, comfortable space</li>
                        <li>• Set aside dedicated time without distractions</li>
                        <li>• Be patient with yourself as you practice</li>
                        <li>• Regular practice increases effectiveness</li>
                      </ul>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          handleCompleteStrategy(strategy.id);
                          setSelectedStrategy(null);
                        }}
                        className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                      >
                        Mark as Completed
                      </button>
                      
                      <button
                        onClick={() => setSelectedStrategy(null)}
                        className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Progress Tracking */}
      {completedStrategies.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
            Your Progress
          </h3>
          
          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${(completedStrategies.length / copingStrategies.length) * 100}%`
                }}
              />
            </div>
            <div className="text-sm font-medium text-gray-700">
              {completedStrategies.length} of {copingStrategies.length} completed
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CopingStrategies;