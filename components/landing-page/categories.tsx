import React from "react";
import Link from "next/link";
import {
  Briefcase,
  Building2,
  Image as ImageIcon,
  Home,
  UtensilsCrossed,
  ShoppingBag,
  User,
  Wrench,
  Dumbbell,
  GraduationCap,
  CalendarDays,
  HardHat,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

type Category = {
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
};

const categories: Category[] = [
  {
    name: "Business",
    slug: "business",
    description: "Company sites with services and contact info",
    icon: Briefcase,
  },
  {
    name: "Agency",
    slug: "agency",
    description: "Case studies, client work, and team pages",
    icon: Building2,
  },
  {
    name: "Portfolio",
    slug: "portfolio",
    description: "Personal sites for creatives and freelancers",
    icon: ImageIcon,
  },
  {
    name: "Real estate",
    slug: "real-estate",
    description: "Listings, galleries, and agent profiles",
    icon: Home,
  },
  {
    name: "Restaurant",
    slug: "restaurant",
    description: "Menus, reservations, and location details",
    icon: UtensilsCrossed,
  },
  {
    name: "E-commerce",
    slug: "ecommerce",
    description: "Product catalogs and checkout flows",
    icon: ShoppingBag,
  },
  {
    name: "Personal",
    slug: "personal",
    description: "Blogs, resumes, and simple landing pages",
    icon: User,
  },
  {
    name: "Services",
    slug: "services",
    description: "Bookings, pricing, and service listings",
    icon: Wrench,
  },
  {
    name: "Fitness",
    slug: "fitness",
    description: "Class schedules, trainers, and memberships",
    icon: Dumbbell,
  },
  {
    name: "Education",
    slug: "education",
    description: "Courses, cohorts, and instructor profiles",
    icon: GraduationCap,
  },
  {
    name: "Events",
    slug: "events",
    description: "Schedules, speakers, and ticketing",
    icon: CalendarDays,
  },
  {
    name: "Construction",
    slug: "construction",
    description: "Project galleries and service pages",
    icon: HardHat,
  },
];

const Categories = () => {
  return (
    <section className="border-y border-border/60 bg-bg-inset/30 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-fg">
              Start with a template built for your industry
            </h2>
            <p className="mt-1.5 text-sm text-fg-subtle">
              Every template is fully editable once you pick a starting point.
            </p>
          </div>
          <Link
            href="/templates"
            className="group inline-flex items-center gap-1 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
          >
            Browse all templates
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ name, slug, description, icon: Icon }) => (
            <Link
              href={`/templates?category=${slug}`}
              key={slug}
              className="group relative flex flex-col gap-3 bg-bg p-5 transition-colors hover:bg-accent/5"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/80 bg-bg-inset text-fg-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <ArrowUpRight className="h-4 w-4 text-fg-subtle opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent group-hover:opacity-100" />
              </div>

              <div>
                <p className="text-sm font-medium text-fg">{name}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-fg-subtle">
                  {description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
