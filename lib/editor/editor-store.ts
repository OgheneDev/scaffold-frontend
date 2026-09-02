import { create } from "zustand";
import type { Site, SectionEntry, SectionType, TemplateContent, Theme } from "@/lib/types";
import { createSection } from "@/lib/section-defaults";
import { generateId } from "@/lib/utils";

export type SaveStatus = "idle" | "pending" | "saving" | "saved" | "error";

interface EditorState {
  site: Site | null;
  content: TemplateContent | null;
  name: string;
  slug: string;
  selectedSectionId: string | null;
  activePanel: "sections" | "theme" | "settings";
  saveStatus: SaveStatus;
  isDirty: boolean;

  load: (site: Site) => void;
  selectSection: (id: string | null) => void;
  setActivePanel: (panel: EditorState["activePanel"]) => void;

  updateSectionContent: <T extends SectionType>(id: string, patch: Partial<import("@/lib/types").SectionContentMap[T]>) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  addSection: (type: SectionType) => void;
  deleteSection: (id: string) => void;
  duplicateSection: (id: string) => void;

  updateTheme: (patch: Partial<Theme>) => void;
  updateThemeColors: (patch: Partial<Theme["colors"]>) => void;
  updateThemeTypography: (patch: Partial<Theme["typography"]>) => void;

  setName: (name: string) => void;
  setSlug: (slug: string) => void;

  markSaving: () => void;
  markSaved: (updatedSite: Site) => void;
  markError: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  site: null,
  content: null,
  name: "",
  slug: "",
  selectedSectionId: null,
  activePanel: "sections",
  saveStatus: "idle",
  isDirty: false,

  load: (site) =>
    set({
      site,
      content: site.content,
      name: site.name,
      slug: site.slug,
      selectedSectionId: null,
      saveStatus: "idle",
      isDirty: false,
    }),

  selectSection: (id) => set({ selectedSectionId: id, activePanel: "sections" }),
  setActivePanel: (panel) => set({ activePanel: panel, selectedSectionId: panel === "sections" ? get().selectedSectionId : null }),

  updateSectionContent: (id, patch) => {
    const content = get().content;
    if (!content) return;
    set({
      isDirty: true,
      saveStatus: "pending",
      content: {
        ...content,
        sections: content.sections.map((entry) =>
          entry.id === id
            ? ({ ...entry, section: { ...entry.section, content: { ...entry.section.content, ...patch } } } as SectionEntry)
            : entry,
        ),
      },
    });
  },

  reorderSections: (fromIndex, toIndex) => {
    const content = get().content;
    if (!content) return;
    const sections = [...content.sections];
    const [moved] = sections.splice(fromIndex, 1);
    sections.splice(toIndex, 0, moved);
    set({ content: { ...content, sections }, isDirty: true, saveStatus: "pending" });
  },

  addSection: (type) => {
    const content = get().content;
    if (!content) return;
    const entry = createSection(type, generateId());
    // Keep navbar first and footer last if present.
    const sections = [...content.sections];
    const footerIndex = sections.findIndex((s) => s.section.type === "footer");
    if (type !== "navbar" && type !== "footer" && footerIndex !== -1) {
      sections.splice(footerIndex, 0, entry);
    } else {
      sections.push(entry);
    }
    set({ content: { ...content, sections }, isDirty: true, saveStatus: "pending", selectedSectionId: entry.id });
  },

  deleteSection: (id) => {
    const content = get().content;
    if (!content) return;
    set({
      content: { ...content, sections: content.sections.filter((s) => s.id !== id) },
      isDirty: true,
      saveStatus: "pending",
      selectedSectionId: get().selectedSectionId === id ? null : get().selectedSectionId,
    });
  },

  duplicateSection: (id) => {
    const content = get().content;
    if (!content) return;
    const index = content.sections.findIndex((s) => s.id === id);
    if (index === -1) return;
    const original = content.sections[index];
    const copy: SectionEntry = { id: generateId(), section: structuredClone(original.section) };
    const sections = [...content.sections];
    sections.splice(index + 1, 0, copy);
    set({ content: { ...content, sections }, isDirty: true, saveStatus: "pending", selectedSectionId: copy.id });
  },

  updateTheme: (patch) => {
    const content = get().content;
    if (!content) return;
    set({ content: { ...content, theme: { ...content.theme, ...patch } }, isDirty: true, saveStatus: "pending" });
  },

  updateThemeColors: (patch) => {
    const content = get().content;
    if (!content) return;
    set({
      content: { ...content, theme: { ...content.theme, colors: { ...content.theme.colors, ...patch } } },
      isDirty: true,
      saveStatus: "pending",
    });
  },

  updateThemeTypography: (patch) => {
    const content = get().content;
    if (!content) return;
    set({
      content: {
        ...content,
        theme: { ...content.theme, typography: { ...content.theme.typography, ...patch } },
      },
      isDirty: true,
      saveStatus: "pending",
    });
  },

  setName: (name) => set({ name, isDirty: true, saveStatus: "pending" }),
  setSlug: (slug) => set({ slug, isDirty: true, saveStatus: "pending" }),

  markSaving: () => set({ saveStatus: "saving" }),
  markSaved: (updatedSite) =>
    set({
      saveStatus: "saved",
      isDirty: false,
      site: updatedSite,
    }),
  markError: () => set({ saveStatus: "error" }),
}));
