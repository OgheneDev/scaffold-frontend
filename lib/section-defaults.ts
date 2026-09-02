import {
  LayoutTemplate,
  Sparkles,
  Grid3x3,
  Briefcase,
  Info,
  BarChart3,
  Quote,
  DollarSign,
  HelpCircle,
  Images,
  Users,
  Megaphone,
  PanelBottom,
  type LucideIcon,
} from "lucide-react";
import type { SectionContentMap, SectionType, TemplateSection } from "@/lib/types";

export const SECTION_META: Record<SectionType, { label: string; icon: LucideIcon; singleton?: boolean }> = {
  navbar: { label: "Navbar", icon: LayoutTemplate, singleton: true },
  hero: { label: "Hero", icon: Sparkles },
  features: { label: "Features", icon: Grid3x3 },
  services: { label: "Services", icon: Briefcase },
  about: { label: "About", icon: Info },
  stats: { label: "Stats", icon: BarChart3 },
  testimonials: { label: "Testimonials", icon: Quote },
  pricing: { label: "Pricing", icon: DollarSign },
  faq: { label: "FAQ", icon: HelpCircle },
  gallery: { label: "Gallery", icon: Images },
  team: { label: "Team", icon: Users },
  cta: { label: "Call to action", icon: Megaphone },
  footer: { label: "Footer", icon: PanelBottom, singleton: true },
};

export const SECTION_TYPES: SectionType[] = [
  "navbar",
  "hero",
  "features",
  "services",
  "about",
  "stats",
  "testimonials",
  "pricing",
  "faq",
  "gallery",
  "team",
  "cta",
  "footer",
];

export function defaultSectionContent<T extends SectionType>(type: T): SectionContentMap[T] {
  const defaults: SectionContentMap = {
    navbar: {
      logo: "Your Brand",
      links: [
        { label: "Home", href: "#" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
      ],
      button: { text: "Get Started", href: "#" },
    },
    hero: {
      eyebrow: "New",
      heading: "A headline that says what you do",
      description: "One or two sentences that explain the value you offer and who it's for.",
      primaryButton: { text: "Get Started", href: "#" },
      secondaryButton: { text: "Learn More", href: "#" },
      image: { src: "", alt: "Hero image" },
    },
    features: {
      heading: "Why choose us",
      description: "A short line about what makes your offering different.",
      items: [
        { title: "Feature one", description: "Describe the benefit in a sentence." },
        { title: "Feature two", description: "Describe the benefit in a sentence." },
        { title: "Feature three", description: "Describe the benefit in a sentence." },
      ],
    },
    services: {
      heading: "What we offer",
      description: "A short line describing your services.",
      items: [
        { title: "Service one", description: "Describe this service.", image: { src: "", alt: "" } },
        { title: "Service two", description: "Describe this service.", image: { src: "", alt: "" } },
      ],
    },
    about: {
      heading: "About us",
      description: "Tell visitors who you are and why they should trust you.",
      image: { src: "", alt: "About image" },
    },
    stats: {
      heading: "By the numbers",
      items: [
        { value: "100+", label: "Clients" },
        { value: "12", label: "Years" },
        { value: "98%", label: "Satisfaction" },
      ],
    },
    testimonials: {
      heading: "What people say",
      items: [
        { name: "Jane Doe", role: "Customer", quote: "This made things so much easier.", avatar: { src: "", alt: "" } },
      ],
    },
    pricing: {
      heading: "Simple pricing",
      plans: [
        {
          name: "Starter",
          price: "$19/mo",
          description: "For individuals getting started.",
          features: ["1 site", "Basic support"],
          button: { text: "Choose Starter", href: "#" },
          highlighted: false,
        },
        {
          name: "Pro",
          price: "$49/mo",
          description: "For growing teams.",
          features: ["5 sites", "Priority support", "Custom domain"],
          button: { text: "Choose Pro", href: "#" },
          highlighted: true,
        },
      ],
    },
    faq: {
      heading: "Frequently asked questions",
      items: [{ question: "What is this?", answer: "Write a helpful answer here." }],
    },
    gallery: {
      heading: "Gallery",
      images: [
        { src: "", alt: "Image 1" },
        { src: "", alt: "Image 2" },
        { src: "", alt: "Image 3" },
      ],
    },
    team: {
      heading: "Meet the team",
      members: [{ name: "Alex Rivera", role: "Founder", image: { src: "", alt: "Alex Rivera" } }],
    },
    cta: {
      heading: "Ready to get started?",
      description: "Join today and see the difference.",
      button: { text: "Get Started", href: "#" },
    },
    footer: {
      logo: "Your Brand",
      copyright: `© ${new Date().getFullYear()} Your Brand. All rights reserved.`,
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
      ],
    },
  };

  return defaults[type];
}

export function createSection(type: SectionType, id: string): { id: string; section: TemplateSection } {
  return {
    id,
    section: { type, content: defaultSectionContent(type) } as TemplateSection,
  };
}
