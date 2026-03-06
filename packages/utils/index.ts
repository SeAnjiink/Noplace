// Auth utility functions
export const saveAuthToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('auth_token');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Energy type helpers
export const energyEmojis: Record<string, string> = {
  soft: '💙',
  chaos: '🔥',
  sadcore: '📍',
  villain: '👑',
  healing: '🌿',
  overthinking: '🌀',
};

export const reactionEmojis: Record<string, string> = {
  relate: '💙',
  tooReal: '😭',
  chaos: '🔥',
  mainChar: '👑',
  silentScream: '🤐',
};

// Format time
export const formatTime = (date: string): string => {
  const now = new Date();
  const posted = new Date(date);
  const diff = now.getTime() - posted.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return posted.toLocaleDateString();
};
