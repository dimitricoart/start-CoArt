import { useCallback, useState } from "react";

export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  try {
    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      // eslint-disable-next-line n/no-unsupported-features/node-builtins
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    console.error("Error when copying text");
  }

  try {
    const ta = document.createElement("textarea");
    ta.value = text;

    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.left = "0";
    ta.style.opacity = "0";
    ta.style.pointerEvents = "none";

    document.body.appendChild(ta);

    ta.focus();
    ta.select();
    ta.setSelectionRange(0, ta.value.length);

    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function useClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    const ok = await copyToClipboard(text);
    setIsCopied(ok);

    if (ok) {
      window.setTimeout(() => setIsCopied(false), 1500);
    }

    return ok;
  }, []);

  return { copy, isCopied };
}
