import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Draft = {
  title: string;
  content: string;
  tag: string;
};

type NoteStore = {
  draft: Draft;
  setDraft: (data: Partial<Draft>) => void;
  clearDraft: () => void;
};

const initialDraft: Draft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set, get) => ({
      draft: initialDraft,

      setDraft: (data) =>
        set({
          draft: {
            ...get().draft,
            ...data,
          },
        }),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
    }
  )
);