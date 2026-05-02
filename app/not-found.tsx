export const metadata = {
  title: 'Page not found',
  description: 'This page does not exist',
  openGraph: {
    title: 'Page not found',
    description: 'This page does not exist',
    url: '/not-found',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function NotFound() {
  return <h1>404 - Page not found</h1>;
}