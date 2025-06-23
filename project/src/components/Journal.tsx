import React, { useState } from 'react';
import { BookOpen, Plus, Edit3, Calendar, Tag, Search, Filter } from 'lucide-react';
import { JournalEntry } from '../types';
import { saveJournalEntry, getJournalEntries, getMoodEntries } from '../utils/moodData';

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(getJournalEntries());
  const [isWriting, setIsWriting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMood, setFilterMood] = useState('');

  const moodEntries = getMoodEntries();
  const todaysMood = moodEntries.find(entry => 
    new Date(entry.date).toDateString() === new Date().toDateString()
  );

  const moods = [
    { id: 'happy', label: 'Happy', emoji: '😊' },
    { id: 'sad', label: 'Sad', emoji: '😢' },
    { id: 'anxious', label: 'Anxious', emoji: '😰' },
    { id: 'angry', label: 'Angry', emoji: '😠' },
    { id: 'calm', label: 'Calm', emoji: '😌' },
    { id: 'excited', label: 'Excited', emoji: '🤩' },
    { id: 'neutral', label: 'Neutral', emoji: '😐' }
  ];

  const commonTags = [
    'gratitude', 'reflection', 'goals', 'relationships', 'work', 'health',
    'growth', 'challenges', 'achievements', 'dreams', 'fears', 'hope'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    const entry: JournalEntry = {
      id: editingId || Date.now().toString(),
      date: new Date().toISOString(),
      title: title.trim(),
      content: content.trim(),
      mood: selectedMood || todaysMood?.mood || 'neutral',
      tags
    };

    if (editingId) {
      // Update existing entry
      const updatedEntries = entries.map(e => e.id === editingId ? entry : e);
      setEntries(updatedEntries);
      localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    } else {
      // Save new entry
      saveJournalEntry(entry);
      setEntries(getJournalEntries());
    }

    // Reset form
    setTitle('');
    setContent('');
    setSelectedMood('');
    setTags([]);
    setIsWriting(false);
    setEditingId(null);
  };

  const handleEdit = (entry: JournalEntry) => {
    setTitle(entry.title);
    setContent(entry.content);
    setSelectedMood(entry.mood);
    setTags(entry.tags);
    setEditingId(entry.id);
    setIsWriting(true);
  };

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMood = !filterMood || entry.mood === filterMood;
    return matchesSearch && matchesMood;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Personal Journal</h2>
            <p className="text-gray-600">Reflect, process, and track your thoughts and feelings</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsWriting(true)}
          className="bg-gradient-to-r from-orange-500 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Entry</span>
        </button>
      </div>

      {/* Today's Mood Context */}
      {todaysMood && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Today's Mood Context</h3>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{moods.find(m => m.id === todaysMood.mood)?.emoji}</span>
            <div>
              <p className="text-gray-700 capitalize font-medium">{todaysMood.mood}</p>
              <p className="text-sm text-gray-600">Intensity: {todaysMood.intensity}/10</p>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterMood}
              onChange={(e) => setFilterMood(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
            >
              <option value="">All moods</option>
              {moods.map(mood => (
                <option key={mood.id} value={mood.id}>{mood.emoji} {mood.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* New/Edit Entry Form */}
      {isWriting && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Edit3 className="w-6 h-6 mr-2 text-orange-600" />
            {editingId ? 'Edit Entry' : 'New Journal Entry'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's on your mind today?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Your thoughts
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                placeholder="Write about your day, feelings, thoughts, or anything that comes to mind..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Current mood
              </label>
              <div className="grid grid-cols-7 gap-2">
                {moods.map(mood => (
                  <button
                    key={mood.id}
                    type="button"
                    onClick={() => setSelectedMood(mood.id)}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      selectedMood === mood.id || (!selectedMood && todaysMood?.mood === mood.id)
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{mood.emoji}</div>
                    <div className="text-xs font-medium">{mood.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {commonTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                      tags.includes(tag)
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-orange-500 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                {editingId ? 'Update Entry' : 'Save Entry'}
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setIsWriting(false);
                  setEditingId(null);
                  setTitle('');
                  setContent('');
                  setSelectedMood('');
                  setTags([]);
                }}
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Journal Entries */}
      <div className="space-y-6">
        {filteredEntries.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {entries.length === 0 ? 'Start Your Journey' : 'No Entries Found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {entries.length === 0 
                ? 'Begin documenting your thoughts and feelings to track your mental health journey'
                : 'Try adjusting your search or filter criteria'
              }
            </p>
            <div className="bg-orange-50 p-4 rounded-lg inline-block">
              <p className="text-orange-800 font-medium">✍️ Regular journaling can reduce stress and improve mood</p>
            </div>
          </div>
        ) : (
          filteredEntries
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map(entry => (
              <div key={entry.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{entry.title}</h3>
                      <span className="text-2xl">{moods.find(m => m.id === entry.mood)?.emoji}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(entry.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Tag className="w-4 h-4" />
                        <span className="capitalize">{entry.mood}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleEdit(entry)}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <Edit3 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  {entry.content.length > 200 
                    ? `${entry.content.substring(0, 200)}...` 
                    : entry.content
                  }
                </p>
                
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
        )}
      </div>

      {/* Journaling Benefits */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-8 border border-orange-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">✍️ Benefits of Journaling</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Edit3 className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Self-Awareness</h4>
            <p className="text-sm text-gray-600">Understand your thoughts, emotions, and behavioral patterns</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-pink-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Stress Relief</h4>
            <p className="text-sm text-gray-600">Express and process difficult emotions in a safe space</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Progress Tracking</h4>
            <p className="text-sm text-gray-600">Monitor your mental health journey over time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;