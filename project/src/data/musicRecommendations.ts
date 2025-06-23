import { MusicRecommendation } from '../types';

export const musicRecommendations: Record<string, MusicRecommendation[]> = {
  happy: [
    {
      title: 'Good as Hell',
      artist: 'Lizzo',
      genre: 'Pop',
      mood: 'happy',
      energy: 8,
      description: 'Uplifting anthem for self-love and confidence'
    },
    {
      title: 'Walking on Sunshine',
      artist: 'Katrina & The Waves',
      genre: 'Pop Rock',
      mood: 'happy',
      energy: 9,
      description: 'Classic feel-good track to boost your mood'
    }
  ],
  sad: [
    {
      title: 'The Night We Met',
      artist: 'Lord Huron',
      genre: 'Indie Folk',
      mood: 'sad',
      energy: 3,
      description: 'Gentle melody for processing difficult emotions'
    },
    {
      title: 'Mad World',
      artist: 'Gary Jules',
      genre: 'Alternative',
      mood: 'sad',
      energy: 2,
      description: 'Reflective song for contemplative moments'
    }
  ],
  anxious: [
    {
      title: 'Weightless',
      artist: 'Marconi Union',
      genre: 'Ambient',
      mood: 'anxious',
      energy: 1,
      description: 'Scientifically designed to reduce anxiety by 65%'
    },
    {
      title: 'Claire de Lune',
      artist: 'Claude Debussy',
      genre: 'Classical',
      mood: 'anxious',
      energy: 2,
      description: 'Soothing classical piece for calming nerves'
    }
  ],
  angry: [
    {
      title: 'Lose Yourself',
      artist: 'Eminem',
      genre: 'Hip Hop',
      mood: 'angry',
      energy: 7,
      description: 'Channel anger into motivation and determination'
    },
    {
      title: 'Break Stuff',
      artist: 'Limp Bizkit',
      genre: 'Nu Metal',
      mood: 'angry',
      energy: 9,
      description: 'High-energy release for intense emotions'
    }
  ],
  calm: [
    {
      title: 'River',
      artist: 'Leon Bridges',
      genre: 'Soul',
      mood: 'calm',
      energy: 4,
      description: 'Peaceful melody for relaxation and reflection'
    },
    {
      title: 'Spiegel im Spiegel',
      artist: 'Arvo Pärt',
      genre: 'Minimalist Classical',
      mood: 'calm',
      energy: 2,
      description: 'Minimalist composition for deep tranquility'
    }
  ],
  excited: [
    {
      title: 'Can\'t Stop the Feeling!',
      artist: 'Justin Timberlake',
      genre: 'Pop',
      mood: 'excited',
      energy: 9,
      description: 'Infectious energy to amplify positive emotions'
    },
    {
      title: 'Pump It',
      artist: 'The Black Eyed Peas',
      genre: 'Hip Hop',
      mood: 'excited',
      energy: 8,
      description: 'High-energy track to maintain excitement'
    }
  ],
  neutral: [
    {
      title: 'Breathe Me',
      artist: 'Sia',
      genre: 'Alternative',
      mood: 'neutral',
      energy: 4,
      description: 'Introspective song for self-reflection'
    },
    {
      title: 'Mad World',
      artist: 'Tears for Fears',
      genre: 'New Wave',
      mood: 'neutral',
      energy: 5,
      description: 'Balanced track for contemplative moments'
    }
  ]
};