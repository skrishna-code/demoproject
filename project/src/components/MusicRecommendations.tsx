import React, { useState } from 'react';
import { Music, Play, Heart, Headphones, Volume2 } from 'lucide-react';
import { musicRecommendations } from '../data/musicRecommendations';
import { getMoodEntries } from '../utils/moodData';

const MusicRecommendations: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const entries = getMoodEntries();
  const latestEntry = entries[entries.length - 1];

  const moods = [
    { id: 'happy', label: 'Happy', emoji: '😊', gradient: 'from-yellow-400 to-orange-500' },
    { id: 'sad', label: 'Sad', emoji: '😢', gradient: 'from-blue-400 to-blue-600' },
    { id: 'anxious', label: 'Anxious', emoji: '😰', gradient: 'from-orange-400 to-red-500' },
    { id: 'angry', label: 'Angry', emoji: '😠', gradient: 'from-red-500 to-red-700' },
    { id: 'calm', label: 'Calm', emoji: '😌', gradient: 'from-green-400 to-blue-500' },
    { id: 'excited', label: 'Excited', emoji: '🤩', gradient: 'from-purple-400 to-pink-500' },
    { id: 'neutral', label: 'Neutral', emoji: '😐', gradient: 'from-gray-400 to-gray-600' }
  ];

  const currentMood = selectedMood || (latestEntry?.mood);
  const recommendations = currentMood ? musicRecommendations[currentMood] || [] : [];

  const handlePlaySong = (song: any) => {
    // In a real app, this would integrate with Spotify API or other music service
    alert(`🎵 Playing: ${song.title} by ${song.artist}\n\n(This would integrate with Spotify/Apple Music in production)`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
          <Music className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Mood-Based Music Therapy</h2>
          <p className="text-gray-600">Discover music that matches and enhances your emotional state</p>
        </div>
      </div>

      {/* Current Mood Display */}
      {latestEntry && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white mb-8">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{moods.find(m => m.id === latestEntry.mood)?.emoji}</div>
            <div>
              <h3 className="text-xl font-bold">Current Mood: {latestEntry.mood}</h3>
              <p className="text-purple-100">Intensity: {latestEntry.intensity}/10</p>
            </div>
          </div>
        </div>
      )}

      {/* Mood Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Headphones className="w-6 h-6 mr-2 text-purple-600" />
          Select Your Mood for Music
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={`p-4 rounded-xl transition-all duration-200 ${
                (selectedMood === mood.id) || (!selectedMood && latestEntry?.mood === mood.id)
                  ? `bg-gradient-to-br ${mood.gradient} text-white shadow-lg scale-105`
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <div className="text-3xl mb-2">{mood.emoji}</div>
              <div className="text-sm font-medium">{mood.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Music Recommendations */}
      {recommendations.length > 0 ? (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <Volume2 className="w-7 h-7 mr-2 text-purple-600" />
            Recommended for {currentMood} mood
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {recommendations.map((song, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {song.title}
                    </h4>
                    <p className="text-gray-600 font-medium">{song.artist}</p>
                    <p className="text-sm text-gray-500 mt-1">{song.genre}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-600">Energy</div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < Math.ceil(song.energy / 2) 
                                ? 'bg-purple-500' 
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                  {song.description}
                </p>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handlePlaySong(song)}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Play className="w-5 h-5" />
                    <span>Play Now</span>
                  </button>
                  
                  <button className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
          <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Mood</h3>
          <p className="text-gray-600 mb-6">Choose your current mood to get personalized music recommendations</p>
          <div className="bg-purple-50 p-4 rounded-lg inline-block">
            <p className="text-purple-800 font-medium">🎵 Music therapy can improve mood by up to 25%!</p>
          </div>
        </div>
      )}

      {/* Music Therapy Benefits */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">🎵 Benefits of Music Therapy</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Emotional Regulation</h4>
            <p className="text-sm text-gray-600">Music helps process and balance emotions effectively</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Volume2 className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Stress Reduction</h4>
            <p className="text-sm text-gray-600">Calming music reduces cortisol and anxiety levels</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Play className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Mood Enhancement</h4>
            <p className="text-sm text-gray-600">Upbeat music releases endorphins and dopamine</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicRecommendations;