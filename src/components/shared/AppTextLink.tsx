import Link from "next/link";

interface AppTextLinkProps {
  href: string;
  children: string;
}

// text links to navigate between pages
function AppTextLink({ href, children }: AppTextLinkProps) {
  return (
    <Link className="text_link" href={href}>
      {children}
    </Link>
  );
}

export default AppTextLink;
