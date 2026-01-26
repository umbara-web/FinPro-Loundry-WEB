interface FooterLinksProps {
  title: string;
  links: { label: string; href: string }[];
}

export function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <div>
      <h4 className='mb-6 font-bold text-black dark:text-white'>{title}</h4>
      <ul className='space-y-4'>
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className='text-gray-500 transition-colors hover:text-blue-500 dark:hover:text-white'
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
