// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

// ---------------------------------------------------------------------------
// Shared section primitives
// ---------------------------------------------------------------------------

export interface LinkRef {
  text: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ImageRef {
  src: string;
  alt: string;
}

// ---------------------------------------------------------------------------
// Section content types (discriminated by `type`)
// ---------------------------------------------------------------------------

export interface NavbarContent {
  logo: string;
  links: NavLink[];
  button?: LinkRef;
}

export interface HeroContent {
  eyebrow?: string;
  heading: string;
  description: string;
  primaryButton?: LinkRef;
  secondaryButton?: LinkRef;
  image?: ImageRef;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

export interface FeaturesContent {
  heading: string;
  description?: string;
  items: FeatureItem[];
}

export interface ServiceItem {
  title: string;
  description: string;
  image?: ImageRef;
}

export interface ServicesContent {
  heading: string;
  description?: string;
  items: ServiceItem[];
}

export interface AboutContent {
  heading: string;
  description: string;
  image?: ImageRef;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface StatsContent {
  heading?: string;
  items: StatItem[];
}

export interface TestimonialItem {
  name: string;
  role?: string;
  quote: string;
  avatar?: ImageRef;
}

export interface TestimonialsContent {
  heading: string;
  items: TestimonialItem[];
}

export interface PricingPlan {
  name: string;
  price: string;
  description?: string;
  features: string[];
  button: LinkRef;
  highlighted: boolean;
}

export interface PricingContent {
  heading: string;
  plans: PricingPlan[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  heading: string;
  items: FaqItem[];
}

export interface GalleryContent {
  heading: string;
  images: ImageRef[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: ImageRef;
}

export interface TeamContent {
  heading: string;
  members: TeamMember[];
}

export interface CtaContent {
  heading: string;
  description?: string;
  button: LinkRef;
}

export interface FooterContent {
  logo: string;
  copyright: string;
  links: NavLink[];
}

export type SectionType =
  | "navbar"
  | "hero"
  | "features"
  | "services"
  | "about"
  | "stats"
  | "testimonials"
  | "pricing"
  | "faq"
  | "gallery"
  | "team"
  | "cta"
  | "footer";

export type SectionContentMap = {
  navbar: NavbarContent;
  hero: HeroContent;
  features: FeaturesContent;
  services: ServicesContent;
  about: AboutContent;
  stats: StatsContent;
  testimonials: TestimonialsContent;
  pricing: PricingContent;
  faq: FaqContent;
  gallery: GalleryContent;
  team: TeamContent;
  cta: CtaContent;
  footer: FooterContent;
};

export type TemplateSection = {
  [K in SectionType]: { type: K; content: SectionContentMap[K] };
}[SectionType];

export interface SectionEntry {
  id: string;
  section: TemplateSection;
}

// ---------------------------------------------------------------------------
// Template content (theme + sections)
// ---------------------------------------------------------------------------

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  muted: string;
}

export interface ThemeTypography {
  headingFont: string;
  bodyFont: string;
}

export interface Theme {
  colors: ThemeColors;
  typography: ThemeTypography;
  borderRadius: string;
}

export interface TemplateContent {
  version: number;
  theme: Theme;
  sections: SectionEntry[];
}

// ---------------------------------------------------------------------------
// Template / Site entities
// ---------------------------------------------------------------------------

export type TemplateCategory =
  | "business"
  | "agency"
  | "portfolio"
  | "real-estate"
  | "restaurant"
  | "ecommerce"
  | "personal"
  | "services"
  | "fitness"
  | "education"
  | "events"
  | "construction";

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  "business",
  "agency",
  "portfolio",
  "real-estate",
  "restaurant",
  "ecommerce",
  "personal",
  "services",
  "fitness",
  "education",
  "events",
  "construction",
];

export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  /** Not present in the documented schema; the gallery UI renders it if the
   * backend happens to send it, but never depends on it. See ASSUMPTIONS.md. */
  description?: string;
  content: TemplateContent;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export type SiteStatus = "draft" | "published";

export interface Site {
  id: string;
  userId: string;
  templateId: string;
  name: string;
  slug: string;
  status: SiteStatus;
  content: TemplateContent;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export type SortOption = "newest" | "oldest" | "name-asc" | "name-desc";

export interface PaginatedResponse<T> {
  data: T[];
  nextCursor: string | null;
  hasNextPage: boolean;
}

export interface ApiErrorShape {
  statusCode: number;
  message: string | string[];
  error?: string;
}
