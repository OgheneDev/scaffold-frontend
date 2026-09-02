"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TextField, TextAreaField, LinkField, ImageField, ListSection, ListItemCard } from "@/components/editor/section-fields";
import type {
  AboutContent,
  CtaContent,
  FaqContent,
  FeaturesContent,
  FooterContent,
  GalleryContent,
  HeroContent,
  NavbarContent,
  PricingContent,
  ServicesContent,
  StatsContent,
  TeamContent,
  TestimonialsContent,
} from "@/lib/types";

type Patch<T> = (patch: Partial<T>) => void;

// ---------------------------------------------------------------------------
export function NavbarForm({ content, onChange }: { content: NavbarContent; onChange: Patch<NavbarContent> }) {
  return (
    <div className="space-y-5">
      <TextField label="Logo text" value={content.logo} onChange={(logo) => onChange({ logo })} />
      <ListSection
        title="Links"
        onAdd={() => onChange({ links: [...content.links, { label: "New link", href: "#" }] })}
      >
        {content.links.map((link, i) => (
          <ListItemCard key={i} onRemove={() => onChange({ links: content.links.filter((_, idx) => idx !== i) })}>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <Label>Label</Label>
                <Input
                  value={link.label}
                  onChange={(e) => {
                    const links = [...content.links];
                    links[i] = { ...links[i], label: e.target.value };
                    onChange({ links });
                  }}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Link</Label>
                <Input
                  value={link.href}
                  onChange={(e) => {
                    const links = [...content.links];
                    links[i] = { ...links[i], href: e.target.value };
                    onChange({ links });
                  }}
                />
              </div>
            </div>
          </ListItemCard>
        ))}
      </ListSection>
      <LinkField label="Button" value={content.button} onChange={(button) => onChange({ button })} />
    </div>
  );
}

// ---------------------------------------------------------------------------
export function HeroForm({ content, onChange }: { content: HeroContent; onChange: Patch<HeroContent> }) {
  return (
    <div className="space-y-5">
      <TextField label="Eyebrow" value={content.eyebrow ?? ""} onChange={(eyebrow) => onChange({ eyebrow })} />
      <TextField label="Heading" value={content.heading} onChange={(heading) => onChange({ heading })} />
      <TextAreaField label="Description" value={content.description} onChange={(description) => onChange({ description })} />
      <LinkField label="Primary button" value={content.primaryButton} onChange={(primaryButton) => onChange({ primaryButton })} />
      <LinkField label="Secondary button" value={content.secondaryButton} onChange={(secondaryButton) => onChange({ secondaryButton })} />
      <ImageField label="Image" value={content.image} onChange={(image) => onChange({ image })} />
    </div>
  );
}

// ---------------------------------------------------------------------------
export function FeaturesForm({ content, onChange }: { content: FeaturesContent; onChange: Patch<FeaturesContent> }) {
  return (
    <div className="space-y-5">
      <TextField label="Heading" value={content.heading} onChange={(heading) => onChange({ heading })} />
      <TextAreaField label="Description" value={content.description ?? ""} onChange={(description) => onChange({ description })} />
      <ListSection
        title="Items"
        onAdd={() => onChange({ items: [...content.items, { title: "New feature", description: "" }] })}
      >
        {content.items.map((item, i) => (
          <ListItemCard key={i} onRemove={() => onChange({ items: content.items.filter((_, idx) => idx !== i) })}>
            <TextField
              label="Title"
              value={item.title}
              onChange={(v) => {
                const items = [...content.items];
                items[i] = { ...items[i], title: v };
                onChange({ items });
              }}
            />
            <TextAreaField
              label="Description"
              value={item.description}
              onChange={(v) => {
                const items = [...content.items];
                items[i] = { ...items[i], description: v };
                onChange({ items });
              }}
            />
          </ListItemCard>
        ))}
      </ListSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
export function ServicesForm({ content, onChange }: { content: ServicesContent; onChange: Patch<ServicesContent> }) {
  return (
    <div className="space-y-5">
      <TextField label="Heading" value={content.heading} onChange={(heading) => onChange({ heading })} />
      <TextAreaField label="Description" value={content.description ?? ""} onChange={(description) => onChange({ description })} />
      <ListSection
        title="Items"
        onAdd={() => onChange({ items: [...content.items, { title: "New service", description: "" }] })}
      >
        {content.items.map((item, i) => (
          <ListItemCard key={i} onRemove={() => onChange({ items: content.items.filter((_, idx) => idx !== i) })}>
            <TextField
              label="Title"
              value={item.title}
              onChange={(v) => {
                const items = [...content.items];
                items[i] = { ...items[i], title: v };
                onChange({ items });
              }}
            />
            <TextAreaField
              label="Description"
              value={item.description}
              onChange={(v) => {
                const items = [...content.items];
                items[i] = { ...items[i], description: v };
                onChange({ items });
              }}
            />
            <ImageField
              value={item.image}
              onChange={(v) => {
                const items = [...content.items];
                items[i] = { ...items[i], image: v };
                onChange({ items });
              }}
            />
          </ListItemCard>
        ))}
      </ListSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
export function AboutForm({ content, onChange }: { content: AboutContent; onChange: Patch<AboutContent> }) {
  return (
    <div className="space-y-5">
      <TextField label="Heading" value={content.heading} onChange={(heading) => onChange({ heading })} />
      <TextAreaField label="Description" value={content.description} onChange={(description) => onChange({ description })} />
      <ImageField label="Image" value={content.image} onChange={(image) => onChange({ image })} />
    </div>
  );
}

// ---------------------------------------------------------------------------
export function StatsForm({ content, onChange }: { content: StatsContent; onChange: Patch<StatsContent> }) {
  return (
    <div className="space-y-5">
      <TextField label="Heading" value={content.heading ?? ""} onChange={(heading) => onChange({ heading })} />
      <ListSection title="Stats" onAdd={() => onChange({ items: [...content.items, { value: "0", label: "New stat" }] })}>
        {content.items.map((item, i) => (
          <ListItemCard key={i} onRemove={() => onChange({ items: content.items.filter((_, idx) => idx !== i) })}>
            <div className="grid grid-cols-2 gap-2">
              <TextField
                label="Value"
                value={item.value}
                onChange={(v) => {
                  const items = [...content.items];
                  items[i] = { ...items[i], value: v };
                  onChange({ items });
                }}
              />
              <TextField
                label="Label"
                value={item.label}
                onChange={(v) => {
                  const items = [...content.items];
                  items[i] = { ...items[i], label: v };
                  onChange({ items });
                }}
              />
            </div>
          </ListItemCard>
        ))}
      </ListSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
export function TestimonialsForm({ content, onChange }: { content: TestimonialsContent; onChange: Patch<TestimonialsContent> }) {
  return (
    <div className="space-y-5">
      <TextField label="Heading" value={content.heading} onChange={(heading) => onChange({ heading })} />
      <ListSection
        title="Testimonials"
        onAdd={() =>
          onChange({ items: [...content.items, { name: "New person", quote: "", avatar: { src: "", alt: "" } }] })
        }
      >
        {content.items.map((item, i) => (
          <ListItemCard key={i} onRemove={() => onChange({ items: content.items.filter((_, idx) => idx !== i) })}>
            <div className="grid grid-cols-2 gap-2">
              <TextField
                label="Name"
                value={item.name}
                onChange={(v) => {
                  const items = [...content.items];
                  items[i] = { ...items[i], name: v };
                  onChange({ items });
                }}
              />
              <TextField
                label="Role"
                value={item.role ?? ""}
                onChange={(v) => {
                  const items = [...content.items];
                  items[i] = { ...items[i], role: v };
                  onChange({ items });
                }}
              />
            </div>
            <TextAreaField
              label="Quote"
              value={item.quote}
              onChange={(v) => {
                const items = [...content.items];
                items[i] = { ...items[i], quote: v };
                onChange({ items });
              }}
            />
            <ImageField
              label="Avatar"
              value={item.avatar}
              onChange={(v) => {
                const items = [...content.items];
                items[i] = { ...items[i], avatar: v };
                onChange({ items });
              }}
            />
          </ListItemCard>
        ))}
      </ListSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
export function PricingForm({ content, onChange }: { content: PricingContent; onChange: Patch<PricingContent> }) {
  return (
    <div className="space-y-5">
      <TextField label="Heading" value={content.heading} onChange={(heading) => onChange({ heading })} />
      <ListSection
        title="Plans"
        onAdd={() =>
          onChange({
            plans: [
              ...content.plans,
              { name: "New plan", price: "$0/mo", features: [], button: { text: "Choose", href: "#" }, highlighted: false },
            ],
          })
        }
      >
        {content.plans.map((plan, i) => (
          <ListItemCard key={i} onRemove={() => onChange({ plans: content.plans.filter((_, idx) => idx !== i) })}>
            <div className="grid grid-cols-2 gap-2">
              <TextField
                label="Name"
                value={plan.name}
                onChange={(v) => {
                  const plans = [...content.plans];
                  plans[i] = { ...plans[i], name: v };
                  onChange({ plans });
                }}
              />
              <TextField
                label="Price"
                value={plan.price}
                onChange={(v) => {
                  const plans = [...content.plans];
                  plans[i] = { ...plans[i], price: v };
                  onChange({ plans });
                }}
              />
            </div>
            <TextAreaField
              label="Description"
              value={plan.description ?? ""}
              onChange={(v) => {
                const plans = [...content.plans];
                plans[i] = { ...plans[i], description: v };
                onChange({ plans });
              }}
            />
            <div className="space-y-1.5">
              <Label>Features (one per line)</Label>
              <textarea
                className="min-h-[80px] w-full rounded-md border border-border bg-bg-inset px-3 py-2 text-sm text-fg outline-none focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent"
                value={plan.features.join("\n")}
                onChange={(e) => {
                  const plans = [...content.plans];
                  plans[i] = { ...plans[i], features: e.target.value.split("\n") };
                  onChange({ plans });
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <TextField
                label="Button text"
                value={plan.button.text}
                onChange={(v) => {
                  const plans = [...content.plans];
                  plans[i] = { ...plans[i], button: { ...plans[i].button, text: v } };
                  onChange({ plans });
                }}
              />
              <TextField
                label="Button link"
                value={plan.button.href}
                onChange={(v) => {
                  const plans = [...content.plans];
                  plans[i] = { ...plans[i], button: { ...plans[i].button, href: v } };
                  onChange({ plans });
                }}
              />
            </div>
            <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
              <Label>Highlighted</Label>
              <Switch
                checked={plan.highlighted}
                onCheckedChange={(checked) => {
                  const plans = [...content.plans];
                  plans[i] = { ...plans[i], highlighted: checked };
                  onChange({ plans });
                }}
              />
            </div>
          </ListItemCard>
        ))}
      </ListSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
export function FaqForm({ content, onChange }: { content: FaqContent; onChange: Patch<FaqContent> }) {
  return (
    <div className="space-y-5">
      <TextField label="Heading" value={content.heading} onChange={(heading) => onChange({ heading })} />
      <ListSection
        title="Questions"
        onAdd={() => onChange({ items: [...content.items, { question: "New question", answer: "" }] })}
      >
        {content.items.map((item, i) => (
          <ListItemCard key={i} onRemove={() => onChange({ items: content.items.filter((_, idx) => idx !== i) })}>
            <TextField
              label="Question"
              value={item.question}
              onChange={(v) => {
                const items = [...content.items];
                items[i] = { ...items[i], question: v };
                onChange({ items });
              }}
            />
            <TextAreaField
              label="Answer"
              value={item.answer}
              onChange={(v) => {
                const items = [...content.items];
                items[i] = { ...items[i], answer: v };
                onChange({ items });
              }}
            />
          </ListItemCard>
        ))}
      </ListSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
export function GalleryForm({ content, onChange }: { content: GalleryContent; onChange: Patch<GalleryContent> }) {
  return (
    <div className="space-y-5">
      <TextField label="Heading" value={content.heading} onChange={(heading) => onChange({ heading })} />
      <ListSection title="Images" onAdd={() => onChange({ images: [...content.images, { src: "", alt: "" }] })}>
        {content.images.map((img, i) => (
          <ListItemCard key={i} onRemove={() => onChange({ images: content.images.filter((_, idx) => idx !== i) })}>
            <ImageField
              value={img}
              onChange={(v) => {
                const images = [...content.images];
                images[i] = v;
                onChange({ images });
              }}
            />
          </ListItemCard>
        ))}
      </ListSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
export function TeamForm({ content, onChange }: { content: TeamContent; onChange: Patch<TeamContent> }) {
  return (
    <div className="space-y-5">
      <TextField label="Heading" value={content.heading} onChange={(heading) => onChange({ heading })} />
      <ListSection
        title="Members"
        onAdd={() =>
          onChange({ members: [...content.members, { name: "New member", role: "Role", image: { src: "", alt: "" } }] })
        }
      >
        {content.members.map((member, i) => (
          <ListItemCard key={i} onRemove={() => onChange({ members: content.members.filter((_, idx) => idx !== i) })}>
            <div className="grid grid-cols-2 gap-2">
              <TextField
                label="Name"
                value={member.name}
                onChange={(v) => {
                  const members = [...content.members];
                  members[i] = { ...members[i], name: v };
                  onChange({ members });
                }}
              />
              <TextField
                label="Role"
                value={member.role}
                onChange={(v) => {
                  const members = [...content.members];
                  members[i] = { ...members[i], role: v };
                  onChange({ members });
                }}
              />
            </div>
            <ImageField
              value={member.image}
              onChange={(v) => {
                const members = [...content.members];
                members[i] = { ...members[i], image: v };
                onChange({ members });
              }}
            />
          </ListItemCard>
        ))}
      </ListSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
export function CtaForm({ content, onChange }: { content: CtaContent; onChange: Patch<CtaContent> }) {
  return (
    <div className="space-y-5">
      <TextField label="Heading" value={content.heading} onChange={(heading) => onChange({ heading })} />
      <TextAreaField label="Description" value={content.description ?? ""} onChange={(description) => onChange({ description })} />
      <LinkField label="Button" value={content.button} onChange={(button) => onChange({ button })} />
    </div>
  );
}

// ---------------------------------------------------------------------------
export function FooterForm({ content, onChange }: { content: FooterContent; onChange: Patch<FooterContent> }) {
  return (
    <div className="space-y-5">
      <TextField label="Logo text" value={content.logo} onChange={(logo) => onChange({ logo })} />
      <TextField label="Copyright" value={content.copyright} onChange={(copyright) => onChange({ copyright })} />
      <ListSection title="Links" onAdd={() => onChange({ links: [...content.links, { label: "New link", href: "#" }] })}>
        {content.links.map((link, i) => (
          <ListItemCard key={i} onRemove={() => onChange({ links: content.links.filter((_, idx) => idx !== i) })}>
            <div className="grid grid-cols-2 gap-2">
              <TextField
                label="Label"
                value={link.label}
                onChange={(v) => {
                  const links = [...content.links];
                  links[i] = { ...links[i], label: v };
                  onChange({ links });
                }}
              />
              <TextField
                label="Link"
                value={link.href}
                onChange={(v) => {
                  const links = [...content.links];
                  links[i] = { ...links[i], href: v };
                  onChange({ links });
                }}
              />
            </div>
          </ListItemCard>
        ))}
      </ListSection>
    </div>
  );
}
