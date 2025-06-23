export interface MoodEntry {
  id: string;
  date: string;
  mood: string;
  intensity: number;
  emotions: string[];
  notes?: string;
  activities?: string[];
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
  tags: string[];
}

export interface CopingStrategy {
  id: string;
  title: string;
  description: string;
  category: 'breathing' | 'mindfulness' | 'cbt' | 'movement' | 'creative';
  duration: string;
  difficulty: 'easy' | 'medium' | 'advanced';
}

export interface MusicRecommendation {
  title: string;
  artist: string;
  genre: string;
  mood: string;
  energy: number;
  description: string;
}