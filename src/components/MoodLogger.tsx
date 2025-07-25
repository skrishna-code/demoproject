import React, { useState } from 'react';
import { Heart, MessageCircle, Plus, Sparkles } from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moods = [
    { id: 'happy', label: 'Happy', emoji: '😊', gradient: 'from-yellow-400 to-orange-500' },
    { id: 'sad', label: 'Sad', emoji: '😢', gradient: 'from-blue-400 to-blue-600' },
    { id: 'anxious', label: 'Anxious', emoji: '😰', gradient: 'from-orange-400 to-red-500' },
    { id: 'angry', label: 'Angry', emoji: '😠', gradient: 'from-red-500 to-red-700' },
    { id: 'calm', label: 'Calm', emoji: '😌', gradient: 'from-green-400 to-blue-500' },
    { id: 'excited', label: 'Excited', emoji: '🤩', gradient: 'from-purple-400 to-pink-500' },
    { id: 'neutral', label: 'Neutral', emoji: '😐', gradient: 'from-gray-400 to-gray-600' }
  ];

  const emotionTags = [
    'grateful', 'hopeful', 'loved', 'confident', 'energetic', 'peaceful',
    'lonely', 'overwhelmed', 'frustrated', 'worried', 'tired', 'stressed',
    'proud', 'content', 'inspired', 'curious', 'amused', 'relieved'
  ];

  const activityTags = [
    'work', 'exercise', 'socializing', 'family time', 'hobbies', 'meditation',
    'reading', 'music', 'cooking', 'outdoors', 'learning', 'creative'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood) {
      alert('Please select a mood');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));

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
    setIsSubmitting(false);
    
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
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 card-hover animate-fadeInUp relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
        
        <div className="flex items-center space-x-4 mb-8 relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse-custom">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">How are you feeling?</h2>
            <p className="text-gray-600 text-lg">Take a moment to check in with yourself</p>
          </div>
          <div className="ml-auto">
            <Sparkles className="w-8 h-8 text-purple-500 animate-float" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          {/* Mood Selection */}
          <div className="animate-fadeInUp stagger-1">
            <label className="block text-lg font-semibold text-gray-900 mb-6">
              Select your primary mood
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {moods.map((mood, index) => (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => setSelectedMood(mood.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 btn-hover animate-fadeInUp stagger-${index + 1} ${
                    selectedMood === mood.id
                      ? `bg-gradient-to-br ${mood.gradient} text-white border-transparent shadow-lg animate-glow`
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:shadow-md'
                  }`}
                >
                  <div className="text-4xl mb-2">{mood.emoji}</div>
                  <div className="text-sm font-medium">{mood.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Intensity Slider */}
          {selectedMood && (
            <div className="animate-fadeInUp stagger-2">
              <label className="block text-lg font-semibold text-gray-900 mb-6">
                How intense is this feeling? 
                <span className="ml-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-base font-bold">
                  {intensity}/10
                </span>
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-4 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-3">
                  <span>Very Low</span>
                  <span>Moderate</span>
                  <span>Very High</span>
                </div>
              </div>
            </div>
          )}

          {/* Emotion Tags */}
          <div className="animate-fadeInUp stagger-3">
            <label className="block text-lg font-semibold text-gray-900 mb-6">
              What specific emotions are you experiencing? 
              <span className="text-sm font-normal text-gray-600 ml-2">(Optional)</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {emotionTags.map((emotion, index) => (
                <button
                  key={emotion}
                  type="button"
                  onClick={() => toggleTag(emotion, emotions, setEmotions)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 btn-hover animate-fadeInUp stagger-${(index % 6) + 1} ${
                    emotions.includes(emotion)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>

          {/* Activity Tags */}
          <div className="animate-fadeInUp stagger-4">
            <label className="block text-lg font-semibold text-gray-900 mb-6">
              What activities influenced your mood? 
              <span className="text-sm font-normal text-gray-600 ml-2">(Optional)</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {activityTags.map((activity, index) => (
                <button
                  key={activity}
                  type="button"
                  onClick={() => toggleTag(activity, activities, setActivities)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 btn-hover animate-fadeInUp stagger-${(index % 6) + 1} ${
                    activities.includes(activity)
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="animate-fadeInUp stagger-5">
            <label className="block text-lg font-semibold text-gray-900 mb-6">
              Additional notes 
              <span className="text-sm font-normal text-gray-600 ml-2">(Optional)</span>
            </label>
            <div className="relative">
              <MessageCircle className="absolute top-4 left-4 w-5 h-5 text-gray-400" />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-300"
                placeholder="What's on your mind? How was your day?"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 btn-hover flex items-center justify-center space-x-3 animate-fadeInUp stagger-6 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white animate-glow'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving your mood...</span>
              </>
            ) : (
              <>
                <Plus className="w-6 h-6" />
                <span>Log My Mood</span>
                <Sparkles className="w-6 h-6" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MoodLogger;