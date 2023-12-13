import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

interface Props {
  href: string;
  children: string;
  legacyBehavior?: true;
}
const Link = ({ href, children, legacyBehavior }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink color="violet" weight="medium">
        {children}
      </RadixLink>
    </NextLink>
  );
};

export default Link;
