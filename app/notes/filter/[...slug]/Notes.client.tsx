'use client';

import { Note } from '@/types/note';

export default function NotesClient({ notes }: { notes: Note[] }) {
  return (
    <ul>
      {notes.map((n) => (
        <li key={n.id}>{n.title}</li>
      ))}
    </ul>
  );
}