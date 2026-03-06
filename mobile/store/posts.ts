// store/posts.ts - Zustand store for posts
import { create } from 'zustand';
import { Post, Reaction } from '@noplace/types';
import { postAPI, reactionAPI } from '@noplace/utils';

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  
  fetchFeed: () => Promise<void>;
  createPost: (content: string, energy: string, type: string, isAnon: boolean) => Promise<void>;
  addReaction: (postId: string, type: string) => Promise<void>;
  refreshFeed: () => Promise<void>;
}

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [],
  loading: false,
  error: null,

  fetchFeed: async () => {
    set({ loading: true, error: null });
    try {
      const res = await postAPI.getFeed();
      set({ posts: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createPost: async (content, energy, type, isAnon) => {
    set({ loading: true, error: null });
    try {
      const res = await postAPI.createPost(content, energy, type, isAnon);
      set({ posts: [res.data, ...get().posts], loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  addReaction: async (postId, type) => {
    try {
      const res = await reactionAPI.addReaction(postId, type);
      // Optimistically update UI
      set({
        posts: get().posts.map(post =>
          post.id === postId ? { ...post } : post
        ),
      });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  refreshFeed: async () => {
    await get().fetchFeed();
  },
}));
