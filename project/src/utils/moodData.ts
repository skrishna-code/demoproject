import { MoodEntry, JournalEntry } from '../types';

export const saveMoodEntry = (entry: MoodEntry): void => {
  const existingEntries = getMoodEntries();
  const updatedEntries = [...existingEntries, entry];
  localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
};

export const getMoodEntries = (): MoodEntry[] => {
  const stored = localStorage.getItem('moodEntries');
  return stored ? JSON.parse(stored) : [];
};

export const saveJournalEntry = (entry: JournalEntry): void => {
  const existingEntries = getJournalEntries();
  const updatedEntries = [...existingEntries, entry];
  localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
};

export const getJournalEntries = (): JournalEntry[] => {
  const stored = localStorage.getItem('journalEntries');
  return stored ? JSON.parse(stored) : [];
};

export const getMoodTrends = (days: number = 7): { date: string; mood: string; intensity: number }[] => {
  const entries = getMoodEntries();
  const now = new Date();
  const cutoffDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
  
  return entries
    .filter(entry => new Date(entry.date) >= cutoffDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(entry => ({
      date: entry.date,
      mood: entry.mood,
      intensity: entry.intensity
    }));
};

export const getMoodInsights = (): { 
  averageMood: number; 
  mostCommonMood: string; 
  streak: number;
  improvementTrend: boolean;
} => {
  const entries = getMoodEntries();
  const recentEntries = entries.slice(-7);
  
  if (recentEntries.length === 0) {
    return { averageMood: 5, mostCommonMood: 'neutral', streak: 0, improvementTrend: false };
  }
  
  const averageMood = recentEntries.reduce((sum, entry) => sum + entry.intensity, 0) / recentEntries.length;
  
  const moodCounts = recentEntries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const mostCommonMood = Object.keys(moodCounts).reduce((a, b) => 
    moodCounts[a] > moodCounts[b] ? a : b
  );
  
  let streak = 0;
  for (let i = entries.length - 1; i >= 0; i--) {
    const entryDate = new Date(entries[i].date);
    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() - streak);
    
    if (entryDate.toDateString() === expectedDate.toDateString()) {
      streak++;
    } else {
      break;
    }
  }
  
  const firstHalf = recentEntries.slice(0, Math.ceil(recentEntries.length / 2));
  const secondHalf = recentEntries.slice(Math.ceil(recentEntries.length / 2));
  
  const firstHalfAvg = firstHalf.reduce((sum, entry) => sum + entry.intensity, 0) / firstHalf.length;
  const secondHalfAvg = secondHalf.reduce((sum, entry) => sum + entry.intensity, 0) / secondHalf.length;
  
  const improvementTrend = secondHalfAvg > firstHalfAvg;
  
  return { averageMood, mostCommonMood, streak, improvementTrend };
};