export const formatDate = (dateString: string) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  if (date.getFullYear() <= 1970) return '—';
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
