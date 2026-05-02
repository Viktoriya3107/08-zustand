'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import { getNotes } from '@/lib/api/notes';
import type { Note } from '@/types/note';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';

type Props = {
  tag?: string;
};

function useDebounce(value: string, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

export default function NotesClient({ tag }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') || 1);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  const { data: notes = [] } = useQuery<Note[]>({
    queryKey: ['notes', tag, debouncedSearch, page],
    queryFn: () => getNotes(tag, debouncedSearch, page),
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    router.push('?page=1');
  };

  const totalPages = Math.ceil(notes.length / 10);

  return (
    <div>
      <SearchBox onSearch={handleSearch} />

      {notes.length > 0 && <NoteList notes={notes} />}

      {notes.length > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={(p) => router.push(`?page=${p}`)}
        />
      )}

      <button onClick={() => router.push('/notes/action/create')}>
        Create note
      </button>
    </div>
  );
}