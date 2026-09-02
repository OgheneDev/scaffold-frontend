"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { SECTION_META } from "@/lib/section-defaults";
import type { SectionEntry } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SortableSectionRow({
  entry,
  onSelect,
}: {
  entry: SectionEntry;
  onSelect: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: entry.id });
  const meta = SECTION_META[entry.section.type];

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex items-center gap-2 rounded-md border border-transparent px-2 py-2 text-sm transition-colors hover:border-border hover:bg-bg-inset/60",
        isDragging && "z-10 border-border bg-bg-elevated opacity-80",
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none text-fg-subtle active:cursor-grabbing"
        aria-label="Reorder section"
      >
        <GripVertical className="size-4" />
      </button>
      <button onClick={onSelect} className="flex flex-1 items-center gap-2.5 text-left text-fg-muted group-hover:text-fg">
        <meta.icon className="size-4 shrink-0" />
        <span className="truncate">{meta.label}</span>
      </button>
    </div>
  );
}
