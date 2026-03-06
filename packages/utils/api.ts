import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (username: string, email: string, password: string) =>
    apiClient.post('/auth/signup', { username, email, password }),
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
};

export const postAPI = {
  createPost: (content: string, energy: string, type: string, isAnon: boolean) =>
    apiClient.post('/posts', { content, energy, type, is_anonymous: isAnon }),
  getFeed: () => apiClient.get('/posts/feed'),
  getPostById: (id: string) => apiClient.get(`/posts/${id}`),
  deletePost: (id: string) => apiClient.delete(`/posts/${id}`),
};

export const reactionAPI = {
  addReaction: (postId: string, type: string) =>
    apiClient.post(`/posts/${postId}/reactions`, { type }),
  getReactions: (postId: string) => apiClient.get(`/posts/${postId}/reactions`),
};

export const messageAPI = {
  sendMessage: (receiverId: string, content: string) =>
    apiClient.post('/messages', { receiver_id: receiverId, content }),
  getInbox: () => apiClient.get('/messages/inbox'),
  getConversation: (userId: string) => apiClient.get(`/messages/${userId}`),
};

export const userAPI = {
  getProfile: () => apiClient.get('/user/profile'),
};

export default apiClient;
