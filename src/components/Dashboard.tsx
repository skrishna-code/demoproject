import React from 'react';
import { TrendingUp, Calendar, Target, Smile, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
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
      happy: 'text-green-600 bg-green-50 border-green-200',
      sad: 'text-blue-600 bg-blue-50 border-blue-200',
      anxious: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      angry: 'text-red-600 bg-red-50 border-red-200',
      calm: 'text-purple-600 bg-purple-50 border-purple-200',
      excited: 'text-orange-600 bg-orange-50 border-orange-200',
      neutral: 'text-gray-600 bg-gray-50 border-gray-200'
    };
    return colors[mood] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const statCards = [
    {
      icon: Calendar,
      value: insights.streak,
      label: 'Day Streak',
      color: 'bg-blue-100 text-blue-600',
      bgGradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      value: entries.length,
      label: 'Total Logs',
      color: 'bg-green-100 text-green-600',
      bgGradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Smile,
      value: insights.averageMood.toFixed(1),
      label: 'Avg Mood',
      color: 'bg-purple-100 text-purple-600',
      bgGradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: insights.improvementTrend ? TrendingUp : AlertCircle,
      value: insights.improvementTrend ? 'Improving' : 'Stable',
      label: 'Trend',
      color: insights.improvementTrend ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600',
      bgGradient: insights.improvementTrend ? 'from-green-500 to-teal-500' : 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-2xl p-8 text-white relative overflow-hidden animate-fadeInUp">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-pulse-custom">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2 animate-slideInRight">Welcome back!</h2>
              <p className="text-blue-100 text-lg animate-slideInRight stagger-1">
                {todayEntry 
                  ? `You're feeling ${todayEntry.mood} today ${moodEmojis[todayEntry.mood]}` 
                  : "How are you feeling today? Let's log your mood!"
                }
              </p>
            </div>
          </div>
          
          {todayEntry && (
            <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm animate-fadeInUp stagger-2">
              <div className="flex items-center space-x-3">
                <div className="text-3xl animate-bounce-custom">{moodEmojis[todayEntry.mood]}</div>
                <div>
                  <p className="font-semibold">Mood Intensity: {todayEntry.intensity}/10</p>
                  {todayEntry.emotions && todayEntry.emotions.length > 0 && (
                    <p className="text-sm text-blue-100 mt-1">
                      Emotions: {todayEntry.emotions.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-4 right-20 w-12 h-12 bg-white/10 rounded-full animate-float stagger-2"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={stat.label}
            className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 card-hover animate-fadeInUp stagger-${index + 1} relative overflow-hidden group`}
          >
            <div className="flex items-center space-x-3 relative z-10">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 transition-all duration-300 group-hover:scale-105">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
            
            {/* Hover gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
          </div>
        ))}
      </div>

      {/* Insights & Recommendations */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 card-hover animate-fadeInUp stagger-5">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-blue-600 animate-bounce-custom" />
            Your Insights
          </h3>
          
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${getInsightColor(insights.mostCommonMood)}`}>
              <div className="flex items-center space-x-3">
                <span className="text-3xl animate-pulse-custom">{moodEmojis[insights.mostCommonMood]}</span>
                <div>
                  <p className="font-semibold">Most Common Mood</p>
                  <p className="text-sm opacity-80 capitalize">{insights.mostCommonMood}</p>
                </div>
              </div>
            </div>

            {insights.improvementTrend && (
              <div className="p-4 rounded-lg bg-green-50 text-green-800 border border-green-200 transition-all duration-300 hover:scale-105 animate-fadeInUp stagger-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 animate-bounce-custom" />
                  <p className="font-semibold">Great Progress!</p>
                </div>
                <p className="text-sm mt-1">Your mood has been improving over the past week.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 card-hover animate-fadeInUp stagger-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-purple-600 animate-pulse-custom" />
            Today's Recommendations
          </h3>
          
          <div className="space-y-4">
            {!todayEntry ? (
              <div className="p-4 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center animate-pulse-custom">
                    <Smile className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold">Start your day right</p>
                    <p className="text-sm mt-1">Log your mood to get personalized recommendations</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="p-4 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 transition-all duration-300 hover:scale-105 btn-hover-lift cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center animate-pulse-custom">
                      <Music className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold">🎵 Music Therapy</p>
                      <p className="text-sm mt-1">Listen to mood-matched music for emotional balance</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-green-50 text-green-800 border border-green-200 transition-all duration-300 hover:scale-105 btn-hover-lift cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center animate-pulse-custom">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold">🧘 Mindfulness Break</p>
                      <p className="text-sm mt-1">Try a 5-minute grounding exercise</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-8 border border-indigo-100 animate-fadeInUp stagger-7">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <blockquote className="text-xl font-medium text-gray-900 mb-4 italic">
            "The greatest revolution of our generation is the discovery that human beings, by changing the inner attitudes of their minds, can change the outer aspects of their lives."
          </blockquote>
          <cite className="text-gray-600 font-semibold">— William James</cite>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;