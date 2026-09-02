"use client";

import { Plus, Trash2, GripVertical } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { ImageRef, LinkRef } from "@/lib/types";

export function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} />
    </div>
  );
}

export function LinkField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: LinkRef | undefined;
  onChange: (value: LinkRef) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="space-y-1.5">
        <Label>{label} text</Label>
        <Input value={value?.text ?? ""} onChange={(e) => onChange({ text: e.target.value, href: value?.href ?? "" })} />
      </div>
      <div className="space-y-1.5">
        <Label>{label} link</Label>
        <Input value={value?.href ?? ""} onChange={(e) => onChange({ text: value?.text ?? "", href: e.target.value })} />
      </div>
    </div>
  );
}

export function ImageField({
  label,
  value,
  onChange,
}: {
  label?: string;
  value: ImageRef | undefined;
  onChange: (value: ImageRef) => void;
}) {
  return (
    <div className="space-y-2 rounded-md border border-border p-3">
      {label ? <p className="text-xs font-medium text-fg-subtle">{label}</p> : null}
      <div className="space-y-1.5">
        <Label>Image URL</Label>
        <Input
          value={value?.src ?? ""}
          onChange={(e) => onChange({ src: e.target.value, alt: value?.alt ?? "" })}
          placeholder="https://…"
        />
      </div>
      <div className="space-y-1.5">
        <Label>Alt text</Label>
        <Input value={value?.alt ?? ""} onChange={(e) => onChange({ src: value?.src ?? "", alt: e.target.value })} />
      </div>
    </div>
  );
}

export function ListSection({
  title,
  onAdd,
  children,
}: {
  title: string;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-fg-subtle">{title}</p>
        <Button variant="ghost" size="sm" onClick={onAdd} className="h-7 px-2 text-xs">
          <Plus className="size-3.5" /> Add
        </Button>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function ListItemCard({
  onRemove,
  children,
}: {
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3 rounded-md border border-border p-3">
      <div className="flex items-center justify-between">
        <GripVertical className="size-3.5 text-fg-subtle" />
        <button onClick={onRemove} className="text-fg-subtle transition-colors hover:text-danger" aria-label="Remove item">
          <Trash2 className="size-3.5" />
        </button>
      </div>
      {children}
    </div>
  );
}
