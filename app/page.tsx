import { MarketingNav } from "@/components/layout/marketing-nav";
import Hero from "@/components/landing-page/hero";
import Categories from "@/components/landing-page/categories";
import Steps from "@/components/landing-page/how-it-works";
import AboutUs from "@/components/landing-page/about";
import CTA from "@/components/landing-page/cta";
import Footer from "@/components/landing-page/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg selection:bg-accent/20">
      <MarketingNav />
      <Hero />
      <Categories />
      <Steps />
      <AboutUs />
      <CTA />
      <Footer />
    </div>
  );
}
