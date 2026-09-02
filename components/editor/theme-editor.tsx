"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEditorStore } from "@/lib/editor/editor-store";

const COLOR_FIELDS: { key: "primary" | "secondary" | "background" | "foreground" | "muted"; label: string }[] = [
  { key: "primary", label: "Primary" },
  { key: "secondary", label: "Secondary" },
  { key: "background", label: "Background" },
  { key: "foreground", label: "Foreground" },
  { key: "muted", label: "Muted" },
];

const RADIUS_PRESETS = [
  { label: "None", value: "0px" },
  { label: "Small", value: "4px" },
  { label: "Medium", value: "8px" },
  { label: "Large", value: "14px" },
  { label: "Full", value: "999px" },
];

function ColorField({ colorKey, label }: { colorKey: (typeof COLOR_FIELDS)[number]["key"]; label: string }) {
  const value = useEditorStore((s) => s.content?.theme.colors[colorKey] ?? "#000000");
  const updateThemeColors = useEditorStore((s) => s.updateThemeColors);

  return (
    <div className="flex items-center justify-between gap-3">
      <Label className="shrink-0">{label}</Label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value) ? value : "#000000"}
          onChange={(e) => updateThemeColors({ [colorKey]: e.target.value })}
          className="size-8 shrink-0 cursor-pointer rounded-md border border-border bg-transparent p-0.5"
        />
        <Input
          value={value}
          onChange={(e) => updateThemeColors({ [colorKey]: e.target.value })}
          className="w-28 font-mono text-xs"
        />
      </div>
    </div>
  );
}

export function ThemeEditor() {
  const typography = useEditorStore((s) => s.content?.theme.typography);
  const borderRadius = useEditorStore((s) => s.content?.theme.borderRadius ?? "8px");
  const updateThemeTypography = useEditorStore((s) => s.updateThemeTypography);
  const updateTheme = useEditorStore((s) => s.updateTheme);

  return (
    <div className="space-y-8 p-4">
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wide text-fg-subtle">Colors</p>
        <div className="space-y-3">
          {COLOR_FIELDS.map((f) => (
            <ColorField key={f.key} colorKey={f.key} label={f.label} />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wide text-fg-subtle">Typography</p>
        <div className="space-y-1.5">
          <Label>Heading font</Label>
          <Input
            value={typography?.headingFont ?? ""}
            onChange={(e) => updateThemeTypography({ headingFont: e.target.value })}
            placeholder="Poppins"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Body font</Label>
          <Input
            value={typography?.bodyFont ?? ""}
            onChange={(e) => updateThemeTypography({ bodyFont: e.target.value })}
            placeholder="Inter"
          />
        </div>
        <p className="text-xs text-fg-subtle">Matched against Google Fonts. Use the exact family name.</p>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wide text-fg-subtle">Shape</p>
        <div className="space-y-1.5">
          <Label>Border radius</Label>
          <Select value={borderRadius} onValueChange={(v) => updateTheme({ borderRadius: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RADIUS_PRESETS.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
