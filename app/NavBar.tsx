"use client";
import Link from "next/link";
import { SiStorybook } from "react-icons/si";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const NavBar = () => {
  const link = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Stories",
      href: "/stories",
    },
  ];
  const currentPath = usePathname();
  console.log(currentPath, "----current path");
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <SiStorybook />
      </Link>
      <ul className="flex space-x-6">
        {link.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classNames({
                "text-zinc-900": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
