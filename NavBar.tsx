import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav className="flex border-b mb-5 px-5 h-14">
      <Link href="/">Logo</Link>
      <ul className="flex space-x-6">
        <li>
          <Link href="/">Dashboard</Link>
        </li>
        <li>
          <Link href="/stories">Stories</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
