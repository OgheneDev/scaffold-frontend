"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface IframePreviewProps {
  children: ReactNode;
  width: string;
  className?: string;
}

export function IframePreview({
  children,
  width,
  className,
}: IframePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const iframe = iframeRef.current;
    const doc = iframe?.contentDocument;
    if (!iframe || !doc) return;

    function syncStyles() {
      doc!.head.querySelectorAll("[data-cloned]").forEach((n) => n.remove());
      document.head
        .querySelectorAll('link[rel="stylesheet"], style')
        .forEach((el) => {
          const clone = el.cloneNode(true) as HTMLElement;
          clone.setAttribute("data-cloned", "true");
          doc!.head.appendChild(clone);
        });
    }

    syncStyles();
    doc.body.style.margin = "0";
    const container = doc.createElement("div");
    doc.body.appendChild(container);
    setMountNode(container);

    // Keep styles in sync if Tailwind/HMR injects new <style> tags in dev
    const observer = new MutationObserver(syncStyles);
    observer.observe(document.head, { childList: true, subtree: true });

    // Auto-size the iframe to its content height
    const resizeObserver = new ResizeObserver(() => {
      setHeight(doc!.body.scrollHeight);
    });
    resizeObserver.observe(doc.body);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title="preview"
      className={className}
      style={{ width, height, border: "none", display: "block" }}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
}
