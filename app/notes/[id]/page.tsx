import { getNoteById } from '@/lib/api/notes';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  const note = await getNoteById(params.id);

  return {
    title: note.title,
    description: note.content.slice(0, 120),
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 120),
      url: `/notes/${params.id}`,
      images: [
        'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      ],
    },
  };
}

export default async function NotePage({
  params,
}: {
  params: { id: string };
}) {
  const note = await getNoteById(params.id);

  return (
    <main>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <span>{note.tag}</span>
    </main>
  );
}