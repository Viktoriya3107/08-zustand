import { getNotes } from '@/lib/api/notes';

export default async function Page({
  params,
}: {
  params: { slug: string[] };
}) {
  const notes = await getNotes();

  const filter = params.slug?.[0] || 'all';

  const filtered =
    filter === 'all'
      ? notes
      : notes.filter((n) => n.tag.toLowerCase() === filter);

  return (
    <main>
      <h1>Filter: {filter}</h1>

      <ul>
        {filtered.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}