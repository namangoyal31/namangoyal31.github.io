import katex from 'katex';

/**
 * Render trusted, author-authored rich text to HTML.
 * Supports inline math $...$, links [text](href), and **bold**.
 * Content is authored in src/data/*.ts; no untrusted input flows through here.
 */
export function renderRich(text: string): string {
  let html = text.replace(/\$([^$]+)\$/g, (_m, tex: string) =>
    katex.renderToString(tex, { throwOnError: false })
  );
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return html;
}
