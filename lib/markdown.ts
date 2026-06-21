export function markdownToHtml(md: string): string {
  if (!md) return "";

  let html = md
    // Fenced code blocks
    .replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>")
    // Inline code
    .replace(/`([^`]+)`/gim, "<code>$1</code>")
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" />')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>');

  // Wrap unordered lists
  html = html.replace(/((?:^- .*$\n?)+)/gim, (match) => {
    const items = match
      .trim()
      .split("\n")
      .map((line) => line.replace(/^- (.*)$/, "<li>$1</li>"))
      .join("");
    return `<ul>${items}</ul>`;
  });

  // Wrap ordered lists
  html = html.replace(/((?:^\d+\. .*$\n?)+)/gim, (match) => {
    const items = match
      .trim()
      .split("\n")
      .map((line) => line.replace(/^\d+\. (.*)$/, "<li>$1</li>"))
      .join("");
    return `<ol>${items}</ol>`;
  });

  html = html
    // Headings
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    // Blockquotes
    .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
    // Bold and italic
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    // Line breaks
    .replace(/\n/gim, "<br/>");

  return html;
}
