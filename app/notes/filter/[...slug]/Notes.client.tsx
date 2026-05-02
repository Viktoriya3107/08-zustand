'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import { getNotes } from '@/lib/api/notes';
import type { Note } from '@/types/note';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';

function useDebounce(value: string, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useState(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  });

  return debounced;
}

export default function NotesClient({ tag }: { tag: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') || 1);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  const { data: notes = [] } = useQuery<Note[]>({
    queryKey: ['notes', tag, debouncedSearch, page],
    queryFn: getNotes,
  });

  const filtered = notes.filter((note) => {
    const matchTag = tag === 'all' || note.tag.toLowerCase() === tag;
    const matchSearch = note.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    return matchTag && matchSearch;
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    router.push('?page=1');
  };

  const totalPages = Math.ceil(filtered.length / 10);

  return (
    <div>
      <SearchBox onSearch={handleSearch} />

      <NoteList notes={filtered} />

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => router.push(`?page=${p}`)}
      />
    </div>
  );
}