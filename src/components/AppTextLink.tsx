import Link from "next/link";

interface AppTextLinkProps {
  href: string;
  children: string;
}

function AppTextLink({ href, children }: AppTextLinkProps) {
  return (
    <Link className="text_link" href={href}>
      {children}
    </Link>
  );
}

export default AppTextLink;
