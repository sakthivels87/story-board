"use client";
import Link from "next/link";
import { SiStorybook } from "react-icons/si";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { Box, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

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
  const { status, data: session } = useSession();

  return (
    <nav className="border-b mb-5 px-5 h-14 py-4">
      <Flex justify="between" gap="3">
        <Flex align="center" gap="3">
          <Link href="/">
            <SiStorybook size={24} />
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
        </Flex>
        <Box>
          {status === "authenticated" && (
            <Link href="/api/auth/signout">Logout</Link>
          )}
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </Box>
      </Flex>
    </nav>
  );
};

export default NavBar;
