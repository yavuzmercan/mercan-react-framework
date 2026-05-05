/**
 * Tiny TSX/JSX-ish syntax highlighter — good enough for snippets, no dependencies.
 * Returns HTML string with <span class="tok-..."> spans.
 */
const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'import', 'export',
  'from', 'default', 'true', 'false', 'null', 'undefined', 'new', 'await', 'async',
  'as', 'type', 'interface',
]);

export const highlight = (code: string): string => {
  let html = '';
  let i = 0;
  const len = code.length;

  while (i < len) {
    const ch = code[i]!;

    // Block comment
    if (ch === '/' && code[i + 1] === '*') {
      const end = code.indexOf('*/', i + 2);
      const stop = end === -1 ? len : end + 2;
      html += `<span class="tok-com">${escape(code.slice(i, stop))}</span>`;
      i = stop;
      continue;
    }
    // Line comment
    if (ch === '/' && code[i + 1] === '/') {
      const end = code.indexOf('\n', i);
      const stop = end === -1 ? len : end;
      html += `<span class="tok-com">${escape(code.slice(i, stop))}</span>`;
      i = stop;
      continue;
    }
    // Strings
    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch;
      let j = i + 1;
      while (j < len && code[j] !== quote) {
        if (code[j] === '\\') j++;
        j++;
      }
      const stop = Math.min(j + 1, len);
      html += `<span class="tok-str">${escape(code.slice(i, stop))}</span>`;
      i = stop;
      continue;
    }
    // JSX tag opener: <Identifier or </Identifier
    if (ch === '<' && /[A-Za-z\/]/.test(code[i + 1] ?? '')) {
      let j = i + 1;
      if (code[j] === '/') j++;
      while (j < len && /[A-Za-z0-9.]/.test(code[j]!)) j++;
      html += `<span class="tok-tag">${escape(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    // Numbers
    if (/[0-9]/.test(ch) && (i === 0 || !/[A-Za-z_]/.test(code[i - 1] ?? ''))) {
      let j = i;
      while (j < len && /[0-9.]/.test(code[j]!)) j++;
      html += `<span class="tok-num">${escape(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    // Identifier / keyword
    if (/[A-Za-z_$]/.test(ch)) {
      let j = i;
      while (j < len && /[A-Za-z0-9_$]/.test(code[j]!)) j++;
      const word = code.slice(i, j);
      if (KEYWORDS.has(word)) {
        html += `<span class="tok-key">${escape(word)}</span>`;
      } else {
        html += escape(word);
      }
      i = j;
      continue;
    }
    html += escape(ch);
    i++;
  }
  return html;
};
