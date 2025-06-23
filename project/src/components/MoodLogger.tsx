import React, { useState } from 'react';
import { Calendar, Heart, MessageCircle, Plus } from 'lucide-react';
import { MoodEntry } from '../types';
import { saveMoodEntry } from '../utils/moodData';

interface MoodLoggerProps {
  onMoodLogged: () => void;
}

const MoodLogger: React.FC<MoodLoggerProps> = ({ onMoodLogged }) => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [intensity, setIntensity] = useState<number>(5);
  const [emotions, setEmotions] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>('');
  const [activities, setActivities] = useState<string[]>([]);

  const moods = [
    { id: 'happy', label: 'Happy', emoji: '😊', color: 'bg-yellow-100 border-yellow-300 text-yellow-800' },
    { id: 'sad', label: 'Sad', emoji: '😢', color: 'bg-blue-100 border-blue-300 text-blue-800' },
    { id: 'anxious', label: 'Anxious', emoji: '😰', color: 'bg-orange-100 border-orange-300 text-orange-800' },
    { id: 'angry', label: 'Angry', emoji: '😠', color: 'bg-red-100 border-red-300 text-red-800' },
    { id: 'calm', label: 'Calm', emoji: '😌', color: 'bg-green-100 border-green-300 text-green-800' },
    { id: 'excited', label: 'Excited', emoji: '🤩', color: 'bg-purple-100 border-purple-300 text-purple-800' },
    { id: 'neutral', label: 'Neutral', emoji: '😐', color: 'bg-gray-100 border-gray-300 text-gray-800' }
  ];

  const emotionTags = [
    'grateful', 'hopeful', 'loved', 'confident', 'energetic', 'peaceful',
    'lonely', 'overwhelmed', 'frustrated', 'worried', 'tired', 'stressed',
    'proud', 'content', 'inspired', 'curious', 'amused', 'relieved'
  ];

  const activityTags = [
    'work', 'exercise', 'socializing', 'family time', 'hobbies', 'meditation',
    'reading', 'music', 'cooking', 'outdoors', 'learning', 'creative',
    'shopping', 'travel', 'relaxing', 'cleaning'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood) {
      alert('Please select a mood');
      return;
    }

    const entry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood: selectedMood,
      intensity,
      emotions,
      notes: notes.trim() || undefined,
      activities: activities.length > 0 ? activities : undefined
    };

    saveMoodEntry(entry);
    
    // Reset form
    setSelectedMood('');
    setIntensity(5);
    setEmotions([]);
    setNotes('');
    setActivities([]);
    
    onMoodLogged();
  };

  const toggleTag = (tag: string, list: string[], setter: (list: string[]) => void) => {
    if (list.includes(tag)) {
      setter(list.filter(t => t !== tag));
    } else {
      setter([...list, tag]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">How are you feeling?</h2>
            <p className="text-gray-600">Take a moment to check in with yourself</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Mood Selection */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Select your primary mood
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => setSelectedMood(mood.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedMood === mood.id
                      ? `${mood.color} border-opacity-100 shadow-lg scale-105`
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="text-3xl mb-2">{mood.emoji}</div>
                  <div className="text-sm font-medium">{mood.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Intensity Slider */}
          {selectedMood && (
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                How intense is this feeling? ({intensity}/10)
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>Very Low</span>
                  <span>Moderate</span>
                  <span>Very High</span>
                </div>
              </div>
            </div>
          )}

          {/* Emotion Tags */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              What specific emotions are you experiencing? (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {emotionTags.map((emotion) => (
                <button
                  key={emotion}
                  type="button"
                  onClick={() => toggleTag(emotion, emotions, setEmotions)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    emotions.includes(emotion)
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>

          {/* Activity Tags */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              What activities influenced your mood? (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {activityTags.map((activity) => (
                <button
                  key={activity}
                  type="button"
                  onClick={() => toggleTag(activity, activities, setActivities)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activities.includes(activity)
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Additional notes (Optional)
            </label>
            <div className="relative">
              <MessageCircle className="absolute top-4 left-4 w-5 h-5 text-gray-400" />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="What's on your mind? How was your day?"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Plus className="w-6 h-6" />
            <span>Log My Mood</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MoodLogger;