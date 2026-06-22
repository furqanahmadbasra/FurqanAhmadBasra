import Link from 'next/link';

type NavItem = {
  label: string;
  href: string;
};

const defaultItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Project Filter', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

interface SiteNavProps {
  items?: NavItem[];
}

export function SiteNav({ items = defaultItems }: SiteNavProps) {
  return (
    <header className="site-nav">
      <Link href="/" className="brand-mark" aria-label="Furqan Ahmad Basra home">
        FAB
      </Link>
      <nav aria-label="Primary navigation">
        {items.map((item) => (
          <Link key={`${item.href}-${item.label}`} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
