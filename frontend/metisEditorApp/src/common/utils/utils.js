import { DocumentType } from './Enums';

export function getCookie(key) {
  const cookies = document.cookie.split(';');
  let result;
  cookies.forEach((item) => {
    const str = item.trim();
    const itemPair = str.split('=');
    if (itemPair[0] === key) {
      result = itemPair[1];
    }
  });

  return result;
}

const ext = {
  [DocumentType.Markdown]: '.md',
};

export function downloadFile(name, content, type) {
  const link = document.createElement('a');
  link.download = `${name}${ext[type] || '.txt'}`;
  link.style.display = 'none';
  const blob = new Blob([content]);
  link.href = URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
