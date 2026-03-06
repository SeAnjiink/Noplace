// Shared types untuk frontend dan backend

export interface User {
  id: string;
  username: string;
  email: string;
  aura_type: string;
  energy_badge: string;
  journal_streak: number;
  is_anonymous: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  energy: EnergyType;
  type: PostType;
  is_anonymous: boolean;
  blur_hash?: string;
  views: number;
  created_at: string;
  updated_at: string;
  user?: User;
}

export type PostType = 'text' | 'photo' | 'audio' | 'poll' | 'rant' | 'energy';

export type EnergyType = 'soft' | 'chaos' | 'sadcore' | 'villain' | 'healing' | 'overthinking';

export type ReactionType = 'relate' | 'tooReal' | 'chaos' | 'mainChar' | 'silentScream';

export interface Reaction {
  id: string;
  post_id: string;
  user_id: string;
  type: ReactionType;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
  expires_at: string;
}

export interface AuthResponse {
  id: string;
  username: string;
  email: string;
  token: string;
}

export interface MoodCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export const MOOD_CATEGORIES: MoodCategory[] = [
  {
    id: '1',
    name: '3AM Thoughts',
    icon: '🌙',
    description: 'Pikiran larut malam',
    color: '#c71585',
  },
  {
    id: '2',
    name: 'Existential',
    icon: '🌌',
    description: 'Berat & melankolis',
    color: '#00ffff',
  },
  {
    id: '3',
    name: 'Soft Energy',
    icon: '💙',
    description: 'Lembut & damai',
    color: '#b0b0b0',
  },
  {
    id: '4',
    name: 'Chaos Energy',
    icon: '🔥',
    description: 'Kekacauan & lucu',
    color: '#ff006e',
  },
  {
    id: '5',
    name: 'Romanticizing',
    icon: '✨',
    description: 'Idealisasi hidup',
    color: '#c71585',
  },
  {
    id: '6',
    name: 'Delulu Era',
    icon: '🎭',
    description: 'Imaginery content',
    color: '#00ffff',
  },
];
