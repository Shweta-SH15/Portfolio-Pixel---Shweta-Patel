import {create} from 'zustand';

type User = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
};

type ChatStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
