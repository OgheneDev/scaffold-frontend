import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border/60 bg-bg-inset/30 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 text-sm text-fg-subtle md:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-display font-medium text-fg">Scaffold</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-8">
          <Link href="/templates" className="transition-colors hover:text-fg">
            Templates
          </Link>
          <Link
            href="#how-it-works"
            className="transition-colors hover:text-fg"
          >
            How it works
          </Link>
          <Link href="/login" className="transition-colors hover:text-fg">
            Log in
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
