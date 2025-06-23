import React from 'react';
import { TrendingUp, BarChart3, Calendar, Target, Sparkles } from 'lucide-react';
import { getMoodTrends, getMoodEntries } from '../utils/moodData';

const MoodTrends: React.FC = () => {
  const trends = getMoodTrends(30);
  const allEntries = getMoodEntries();

  const moodColors: Record<string, string> = {
    happy: '#10B981',
    sad: '#3B82F6',
    anxious: '#F59E0B',
    angry: '#EF4444',
    calm: '#8B5CF6',
    excited: '#F97316',
    neutral: '#6B7280'
  };

  const moodEmojis: Record<string, string> = {
    happy: '😊',
    sad: '😢',
    anxious: '😰',
    angry: '😠',
    calm: '😌',
    excited: '🤩',
    neutral: '😐'
  };

  const moodCounts = allEntries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalEntries = allEntries.length;
  const moodDistribution = Object.entries(moodCounts).map(([mood, count]) => ({
    mood,
    count,
    percentage: (count / totalEntries) * 100
  }));

  const weeklyData = trends.reduce((acc, entry) => {
    const date = new Date(entry.date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = weekStart.toISOString().split('T')[0];
    
    if (!acc[weekKey]) {
      acc[weekKey] = { intensities: [], moods: {} };
    }
    
    acc[weekKey].intensities.push(entry.intensity);
    acc[weekKey].moods[entry.mood] = (acc[weekKey].moods[entry.mood] || 0) + 1;
    
    return acc;
  }, {} as Record<string, { intensities: number[]; moods: Record<string, number> }>);

  const weeklyAverages = Object.entries(weeklyData).map(([week, data]) => ({
    week,
    average: data.intensities.reduce((sum, val) => sum + val, 0) / data.intensities.length,
    dominantMood: Object.keys(data.moods).reduce((a, b) => 
      data.moods[a] > data.moods[b] ? a : b
    )
  }));

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center space-x-4 mb-8 animate-fadeInUp">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse-custom">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Mood Trends & Analytics</h2>
          <p className="text-gray-600 text-lg">Insights into your emotional patterns over time</p>
        </div>
        <div className="ml-auto">
          <Sparkles className="w-8 h-8 text-purple-500 animate-float" />
        </div>
      </div>

      {trends.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-xl border border-gray-100 animate-fadeInUp">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Data Yet</h3>
          <p className="text-gray-600 mb-8 text-lg">Start logging your moods to see trends and insights</p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl inline-block border border-blue-100">
            <p className="text-blue-800 font-medium text-lg">💡 Tip: Log your mood daily for the best insights</p>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mood Distribution */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 card-hover animate-fadeInUp stagger-1">
            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
              <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
              Mood Distribution
            </h3>
            
            <div className="space-y-6">
              {moodDistribution
                .sort((a, b) => b.count - a.count)
                .map(({ mood, count, percentage }, index) => (
                  <div key={mood} className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 hover:scale-105 animate-fadeInUp stagger-${index + 1}`}>
                    <div className="flex items-center space-x-3 w-32">
                      <span className="text-2xl">{moodEmojis[mood]}</span>
                      <span className="text-sm font-medium capitalize text-gray-700">
                        {mood}
                      </span>
                    </div>
                    
                    <div className="flex-1 relative">
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                          className="h-4 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: moodColors[mood]
                          }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right w-24">
                      <div className="text-sm font-semibold text-gray-900">
                        {count} times
                      </div>
                      <div className="text-xs text-gray-500">
                        {percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Weekly Averages */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 card-hover animate-fadeInUp stagger-2">
            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-purple-600" />
              Weekly Intensity
            </h3>
            
            <div className="space-y-6">
              {weeklyAverages.slice(-4).reverse().map(({ week, average, dominantMood }, index) => {
                const weekDate = new Date(week);
                const weekEnd = new Date(weekDate);
                weekEnd.setDate(weekDate.getDate() + 6);
                
                return (
                  <div key={week} className={`p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 transition-all duration-300 hover:scale-105 animate-fadeInUp stagger-${index + 1}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-medium text-gray-900">
                        {weekDate.toLocaleDateString()} - {weekEnd.toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{moodEmojis[dominantMood]}</span>
                        <span className="text-sm text-gray-600 capitalize font-medium">
                          {dominantMood}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                          style={{
                            width: `${(average / 10) * 100}%`,
                            backgroundColor: moodColors[dominantMood]
                          }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-gray-900 w-12">
                        {average.toFixed(1)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Trends */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-xl border border-gray-100 card-hover animate-fadeInUp stagger-3">
            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
              <Target className="w-6 h-6 mr-3 text-green-600" />
              Recent Mood Timeline
            </h3>
            
            <div className="space-y-4">
              {trends.slice(-7).reverse().map((entry, index) => {
                const date = new Date(entry.date);
                const isToday = date.toDateString() === new Date().toDateString();
                
                return (
                  <div
                    key={entry.date}
                    className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 card-hover animate-fadeInUp stagger-${index + 1} ${
                      isToday 
                        ? 'border-blue-300 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg' 
                        : 'border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl">{moodEmojis[entry.mood]}</span>
                        <div>
                          <div className="font-semibold text-gray-900 capitalize flex items-center space-x-2">
                            <span>{entry.mood}</span>
                            {isToday && (
                              <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full font-bold">
                                Today
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {date.toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900 mb-2">
                          {entry.intensity}/10
                        </div>
                        <div className="w-20 bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                            style={{
                              width: `${(entry.intensity / 10) * 100}%`,
                              backgroundColor: moodColors[entry.mood]
                            }}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTrends;