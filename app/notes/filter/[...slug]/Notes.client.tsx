'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { getNotes } from '@/lib/api/notes';
import type { Note } from '@/types/note';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';

type Props = {
  tag?: string;
};

type NotesResponse = {
  items: Note[];
  totalPages: number;
};

function useDebounce(value: string, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useState(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(handler);
  });

  return debounced;
}

export default function NotesClient({ tag }: Props) {
  const router = useRouter();

  // ✅ PAGE STATE (FIX REVIEWS REQUIREMENT)
  const [page, setPage] = useState(1);

  // SEARCH STATE
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  // QUERY
  const { data } = useQuery<NotesResponse>({
    queryKey: ['notes', tag, debouncedSearch, page],
    queryFn: () => getNotes(tag, debouncedSearch, page),
  });

  const notes = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1); // sync state reset
  };

  const handlePageChange = (p: number) => {
    setPage(p);
  };

  return (
    <div>
      <SearchBox onSearch={handleSearch} />

      <NoteList notes={notes} />

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={handlePageChange}
      />

      <button onClick={() => router.push('/notes/action/create')}>
        Create note
      </button>
    </div>
  );
}