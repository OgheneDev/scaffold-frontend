"use client";

import { useState } from "react";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { SiteRenderer } from "@/components/site-renderer/site-renderer";
import { useEditorStore } from "@/lib/editor/editor-store";
import { cn } from "@/lib/utils";
import type { SectionEntry } from "@/lib/types";
import { IframePreview } from "../site-renderer/iframe-preview";

const DEVICE_WIDTHS = {
  desktop: "100%",
  tablet: "834px",
  mobile: "390px",
} as const;

type Device = keyof typeof DEVICE_WIDTHS;

export function EditorPreview() {
  const content = useEditorStore((s) => s.content);
  const selectedSectionId = useEditorStore((s) => s.selectedSectionId);
  const selectSection = useEditorStore((s) => s.selectSection);
  const [device, setDevice] = useState<Device>("desktop");

  if (!content) return null;

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-bg-inset">
      <div className="flex items-center justify-center gap-1 border-b border-border py-2">
        {(["desktop", "tablet", "mobile"] as Device[]).map((d) => {
          const Icon =
            d === "desktop" ? Monitor : d === "tablet" ? Tablet : Smartphone;
          return (
            <button
              key={d}
              onClick={() => setDevice(d)}
              className={cn(
                "rounded-md p-1.5 transition-colors",
                device === d
                  ? "bg-bg-elevated text-fg"
                  : "text-fg-subtle hover:text-fg",
              )}
              aria-label={d}
            >
              <Icon className="size-4" />
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div
          className="mx-auto overflow-hidden rounded-lg border border-border bg-white shadow-xl transition-[width] duration-200"
          style={{ width: DEVICE_WIDTHS[device], maxWidth: "100%" }}
        >
          <IframePreview width="100%">
            <SiteRenderer
              content={content}
              renderSectionWrapper={(entry, children) => (
                <div
                  onClick={() => selectSection(entry.id)}
                  className={cn(
                    "relative cursor-pointer outline outline-2 -outline-offset-2 outline-transparent transition-colors hover:outline-accent/50",
                    selectedSectionId === entry.id && "outline-accent",
                  )}
                >
                  {children}
                </div>
              )}
            />
          </IframePreview>
        </div>
      </div>
    </div>
  );
}
