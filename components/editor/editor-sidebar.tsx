"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditorStore } from "@/lib/editor/editor-store";
import { SortableSectionRow } from "@/components/editor/sortable-section-row";
import { AddSectionMenu } from "@/components/editor/add-section-menu";
import { SectionEditorPanel } from "@/components/editor/section-editor-panel";
import { ThemeEditor } from "@/components/editor/theme-editor";
import { SiteSettingsEditor } from "@/components/editor/site-settings-editor";

export function EditorSidebar() {
  const content = useEditorStore((s) => s.content);
  const activePanel = useEditorStore((s) => s.activePanel);
  const setActivePanel = useEditorStore((s) => s.setActivePanel);
  const selectedSectionId = useEditorStore((s) => s.selectedSectionId);
  const selectSection = useEditorStore((s) => s.selectSection);
  const reorderSections = useEditorStore((s) => s.reorderSections);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id || !content) return;
    const fromIndex = content.sections.findIndex((s) => s.id === active.id);
    const toIndex = content.sections.findIndex((s) => s.id === over.id);
    if (fromIndex === -1 || toIndex === -1) return;
    reorderSections(fromIndex, toIndex);
  }

  if (activePanel === "sections" && selectedSectionId) {
    return (
      <aside className="flex w-80 shrink-0 flex-col border-r border-border bg-bg-elevated">
        <SectionEditorPanel />
      </aside>
    );
  }

  return (
    <aside className="flex w-80 shrink-0 flex-col border-r border-border bg-bg-elevated">
      <div className="border-b border-border p-3">
        <Tabs value={activePanel} onValueChange={(v) => setActivePanel(v as typeof activePanel)}>
          <TabsList className="w-full">
            <TabsTrigger value="sections" className="flex-1">
              Sections
            </TabsTrigger>
            <TabsTrigger value="theme" className="flex-1">
              Theme
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">
              Settings
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activePanel === "sections" && content ? (
          <div className="space-y-3 p-3">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={content.sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-1">
                  {content.sections.map((entry) => (
                    <SortableSectionRow key={entry.id} entry={entry} onSelect={() => selectSection(entry.id)} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
            <AddSectionMenu />
          </div>
        ) : null}

        {activePanel === "theme" ? <ThemeEditor /> : null}
        {activePanel === "settings" ? <SiteSettingsEditor /> : null}
      </div>
    </aside>
  );
}
