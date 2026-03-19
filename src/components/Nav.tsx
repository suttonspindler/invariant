"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/lab", label: "Lab" },
  { href: "/hall-of-fame", label: "Hall of Fame" },
  { href: "/blog", label: "The Ledger" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-mono text-lg font-bold tracking-widest text-zinc-50 transition-colors hover:text-blue-400"
        >
          INVARIANT
        </Link>

        <ul className="flex items-center gap-8" role="list">
          {links.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    isActive
                      ? "text-blue-400"
                      : "text-zinc-400 hover:text-zinc-50"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
