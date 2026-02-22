export function openUrlOnClick(url: string): () => void {
  return () => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };
}
