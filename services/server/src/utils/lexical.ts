const LEXICAL_EMPTY_ROOT =
  '{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

export const simpleFormatting = LEXICAL_EMPTY_ROOT;
export const emptyStateString = LEXICAL_EMPTY_ROOT;

/**
 * Extract plain text from Lexical JSON (for length validation).
 */
export function getHeadlessText(value: string): string {
  if (!value || typeof value !== "string") return "";
  try {
    const json = JSON.parse(value) as { root?: { children?: Array<{ text?: string; children?: unknown[] }> } };
    const root = json?.root;
    if (!root?.children?.length) return "";
    return root.children
      .map((node: { text?: string }) => (node && "text" in node ? String(node.text ?? "") : ""))
      .join("");
  } catch {
    return value;
  }
}

/**
 * Convert Lexical JSON to markdown (simplified: flatten text).
 */
export function getMarkdown(value: string | Record<string, unknown>): string {
  if (value == null) return "";
  const str = typeof value === "string" ? value : JSON.stringify(value);
  try {
    const json = typeof value === "string" ? JSON.parse(value) : value;
    const root = (json as { root?: { children?: unknown[] } })?.root;
    if (!root?.children?.length) return "";
    const parts: string[] = [];
    const visit = (nodes: Array<{ type?: string; text?: string; children?: unknown[] }>): void => {
      for (const node of nodes) {
        if (node.text) parts.push(String(node.text));
        if (Array.isArray(node.children)) visit(node.children as Array<{ type?: string; text?: string; children?: unknown[] }>);
      }
    };
    visit(root.children as Array<{ type?: string; text?: string; children?: unknown[] }>);
    return parts.join(" ").trim() || "";
  } catch {
    return str;
  }
}
