import React from 'react';
import { TrendingUp, Calendar, Target, Smile, AlertCircle, CheckCircle } from 'lucide-react';
import { getMoodEntries, getMoodInsights } from '../utils/moodData';

const Dashboard: React.FC = () => {
  const entries = getMoodEntries();
  const insights = getMoodInsights();
  const todayEntry = entries.find(entry => 
    new Date(entry.date).toDateString() === new Date().toDateString()
  );

  const moodEmojis: Record<string, string> = {
    happy: '😊',
    sad: '😢',
    anxious: '😰',
    angry: '😠',
    calm: '😌',
    excited: '🤩',
    neutral: '😐'
  };

  const getInsightColor = (mood: string) => {
    const colors: Record<string, string> = {
      happy: 'text-green-600 bg-green-50',
      sad: 'text-blue-600 bg-blue-50',
      anxious: 'text-yellow-600 bg-yellow-50',
      angry: 'text-red-600 bg-red-50',
      calm: 'text-purple-600 bg-purple-50',
      excited: 'text-orange-600 bg-orange-50',
      neutral: 'text-gray-600 bg-gray-50'
    };
    return colors[mood] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
        <p className="text-blue-100 text-lg">
          {todayEntry 
            ? `You're feeling ${todayEntry.mood} today ${moodEmojis[todayEntry.mood]}` 
            : "How are you feeling today? Let's log your mood!"
          }
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{insights.streak}</p>
              <p className="text-sm text-gray-600">Day Streak</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{entries.length}</p>
              <p className="text-sm text-gray-600">Total Logs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Smile className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {insights.averageMood.toFixed(1)}
              </p>
              <p className="text-sm text-gray-600">Avg Mood</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              insights.improvementTrend ? 'bg-green-100' : 'bg-yellow-100'
            }`}>
              {insights.improvementTrend ? (
                <TrendingUp className="w-6 h-6 text-green-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">
                {insights.improvementTrend ? 'Improving' : 'Stable'}
              </p>
              <p className="text-sm text-gray-600">Trend</p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
            Your Insights
          </h3>
          
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${getInsightColor(insights.mostCommonMood)}`}>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{moodEmojis[insights.mostCommonMood]}</span>
                <div>
                  <p className="font-semibold">Most Common Mood</p>
                  <p className="text-sm opacity-80 capitalize">{insights.mostCommonMood}</p>
                </div>
              </div>
            </div>

            {insights.improvementTrend && (
              <div className="p-4 rounded-lg bg-green-50 text-green-800 border border-green-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <p className="font-semibold">Great Progress!</p>
                </div>
                <p className="text-sm mt-1">Your mood has been improving over the past week.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Recommendations</h3>
          
          <div className="space-y-3">
            {!todayEntry ? (
              <div className="p-4 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                <p className="font-semibold">Start your day right</p>
                <p className="text-sm mt-1">Log your mood to get personalized recommendations</p>
              </div>
            ) : (
              <>
                <div className="p-4 rounded-lg bg-purple-50 text-purple-800 border border-purple-200">
                  <p className="font-semibold">🎵 Music Therapy</p>
                  <p className="text-sm mt-1">Listen to mood-matched music for emotional balance</p>
                </div>
                
                <div className="p-4 rounded-lg bg-green-50 text-green-800 border border-green-200">
                  <p className="font-semibold">🧘 Mindfulness Break</p>
                  <p className="text-sm mt-1">Try a 5-minute grounding exercise</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;