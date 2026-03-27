export function getCurrentDate() {
  const currentDate = new Date();
  const dateStr = currentDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  const datetime = `${year}-${month}-${day}`;

  return {dateStr, datetime}
}
