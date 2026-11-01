export function exportToCsv(filename, data, headers) {
  if (!data || !data.length) return;

  const headerRow = headers.map(h => `"${h.label}"`).join(',');
  const rows = data.map(row => {
    return headers
      .map(h => {
        const val = row[h.key] !== undefined && row[h.key] !== null ? row[h.key] : '';
        const escaped = String(val).replace(/"/g, '""');
        return `"${escaped}"`;
      })
      .join(',');
  });

  const csvContent = 'data:text/csv;charset=utf-8,' + [headerRow, ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${filename || 'export'}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
