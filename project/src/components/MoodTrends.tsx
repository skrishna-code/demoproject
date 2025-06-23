import React from 'react';
import { TrendingUp, BarChart3, Calendar, Target } from 'lucide-react';
import { getMoodTrends, getMoodEntries } from '../utils/moodData';

const MoodTrends: React.FC = () => {
  const trends = getMoodTrends(30); // Last 30 days
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

  // Calculate mood distribution
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

  // Group trends by week
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
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Mood Trends & Analytics</h2>
          <p className="text-gray-600">Insights into your emotional patterns over time</p>
        </div>
      </div>

      {trends.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Data Yet</h3>
          <p className="text-gray-600 mb-6">Start logging your moods to see trends and insights</p>
          <div className="bg-blue-50 p-4 rounded-lg inline-block">
            <p className="text-blue-800 font-medium">💡 Tip: Log your mood daily for the best insights</p>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mood Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
              Mood Distribution
            </h3>
            
            <div className="space-y-4">
              {moodDistribution
                .sort((a, b) => b.count - a.count)
                .map(({ mood, count, percentage }) => (
                  <div key={mood} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 w-24">
                      <span className="text-xl">{moodEmojis[mood]}</span>
                      <span className="text-sm font-medium capitalize text-gray-700">
                        {mood}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-500"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: moodColors[mood]
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="text-right w-20">
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
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-purple-600" />
              Weekly Intensity
            </h3>
            
            <div className="space-y-4">
              {weeklyAverages.slice(-4).reverse().map(({ week, average, dominantMood }, index) => {
                const weekDate = new Date(week);
                const weekEnd = new Date(weekDate);
                weekEnd.setDate(weekDate.getDate() + 6);
                
                return (
                  <div key={week} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-900">
                        {weekDate.toLocaleDateString()} - {weekEnd.toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{moodEmojis[dominantMood]}</span>
                        <span className="text-sm text-gray-600 capitalize">
                          {dominantMood}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${(average / 10) * 100}%`,
                            backgroundColor: moodColors[dominantMood]
                          }}
                        />
                      </div>
                      <div className="text-sm font-semibold text-gray-900 w-12">
                        {average.toFixed(1)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Trends */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-2 text-green-600" />
              Recent Mood Timeline
            </h3>
            
            <div className="space-y-3">
              {trends.slice(-7).reverse().map((entry, index) => {
                const date = new Date(entry.date);
                const isToday = date.toDateString() === new Date().toDateString();
                
                return (
                  <div
                    key={entry.date}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      isToday 
                        ? 'border-blue-300 bg-blue-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{moodEmojis[entry.mood]}</span>
                        <div>
                          <div className="font-medium text-gray-900 capitalize">
                            {entry.mood}
                            {isToday && (
                              <span className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                                Today
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            {date.toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {entry.intensity}/10
                        </div>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${(entry.intensity / 10) * 100}%`,
                              backgroundColor: moodColors[entry.mood]
                            }}
                          />
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