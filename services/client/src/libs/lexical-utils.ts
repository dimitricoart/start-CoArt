const LEXICAL_EMPTY_ROOT =
  '{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

export const emptyStateString = LEXICAL_EMPTY_ROOT;
export const simpleFormatting = LEXICAL_EMPTY_ROOT;

export function getMarkdown(value: string | Record<string, unknown> | null | undefined): string {
  if (value == null) return "";
  const str = typeof value === "string" ? value : JSON.stringify(value);
  try {
    const json = typeof value === "string" ? JSON.parse(value) : value;
    const root = (json as { root?: { children?: unknown[] } })?.root;
    if (!root?.children?.length) return "";
    const parts: string[] = [];
    const visit = (nodes: Array<{ text?: string; children?: unknown[] }>): void => {
      for (const node of nodes) {
        if (node.text) parts.push(String(node.text));
        if (Array.isArray(node.children)) visit(node.children);
      }
    };
    visit(root.children as Array<{ text?: string; children?: unknown[] }>);
    return parts.join(" ").trim() || "";
  } catch {
    return str;
  }
}
