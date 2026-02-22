import { FC, ReactNode } from "react";
import { Typography } from "@mui/material";

type LexicalNode = { type?: string; text?: string; children?: LexicalNode[] };
type LexicalRoot = { root?: { children?: LexicalNode[] } };

function renderNodes(nodes: LexicalNode[]): ReactNode {
  return nodes.map((node, i) => {
    if (node.text) return <span key={i}>{node.text}</span>;
    if (Array.isArray(node.children) && node.children.length)
      return <span key={i}>{renderNodes(node.children)}</span>;
    return null;
  });
}

export const Display: FC<{ data?: string | LexicalRoot | null }> = ({ data }) => {
  if (data == null || data === "") return null;
  const json = typeof data === "string" ? (() => { try { return JSON.parse(data) as LexicalRoot; } catch { return null; } })() : data;
  const root = json?.root;
  const children = root?.children;
  if (!Array.isArray(children) || children.length === 0) return null;
  return <Typography component="div">{renderNodes(children)}</Typography>;
};
