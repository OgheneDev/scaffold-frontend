"use client";

import { Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SECTION_META, SECTION_TYPES } from "@/lib/section-defaults";
import { useEditorStore } from "@/lib/editor/editor-store";

export function AddSectionMenu() {
  const content = useEditorStore((s) => s.content);
  const addSection = useEditorStore((s) => s.addSection);
  const existingTypes = new Set(content?.sections.map((s) => s.section.type));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="w-full justify-start">
          <Plus className="size-4" /> Add section
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-72 overflow-y-auto">
        {SECTION_TYPES.map((type) => {
          const meta = SECTION_META[type];
          const disabled = meta.singleton && existingTypes.has(type);
          return (
            <DropdownMenuItem key={type} disabled={disabled} onSelect={() => addSection(type)}>
              <meta.icon /> {meta.label}
              {disabled ? <span className="ml-auto text-[10px] text-fg-subtle">added</span> : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
