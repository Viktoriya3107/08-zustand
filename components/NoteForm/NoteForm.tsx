'use client';

import { useNoteStore } from '@/lib/store/noteStore';
import { createNote } from '@/lib/api/notes';
import { useRouter } from 'next/navigation';

export default function NoteForm() {
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDraft({ [e.target.name]: e.target.value });
  };

  async function action() {
    await createNote(draft);
    clearDraft();
    router.back();
  }

  return (
    <form action={action}>
      <input name="title" value={draft.title} onChange={handleChange} />
      <textarea name="content" value={draft.content} onChange={handleChange} />

      <select name="tag" value={draft.tag} onChange={handleChange}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>

      <button type="submit">Create</button>

      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
    </form>
  );
}