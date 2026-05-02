import { getNotes } from '@/lib/api/notes';

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const filter = params.slug?.join('/') || 'all';

  return {
    title: `Filter: ${filter}`,
    description: `Filtered notes by ${filter}`,
    openGraph: {
      title: `Filter: ${filter}`,
      description: `Filtered notes by ${filter}`,
      url: `/notes/filter/${filter}`,
      images: [
        'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      ],
    },
  };
}

export default async function FilterPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const filter = params.slug?.[0] || 'all';

  const notes = await getNotes();

  const filtered =
    filter === 'all'
      ? notes
      : notes.filter((n) => n.tag.toLowerCase() === filter);

  return (
    <main>
      <h1>Filter: {filter}</h1>
      <pre>{JSON.stringify(filtered, null, 2)}</pre>
    </main>
  );
}