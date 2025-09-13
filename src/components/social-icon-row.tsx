import { Button } from './ui/button';
import { GitHubIcon, RedditIcon, XLogo, LinkedInIcon, LumaIcon, WhatsAppIcon } from './icons';

interface SocialLink {
  platform: 'github' | 'twitter' | 'reddit' | 'linkedin' | 'luma' | 'whatsapp';
  href: string;
  label?: string;
}

interface SocialIconRowProps {
  className?: string;
  links?: SocialLink[];
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

const defaultLinks: SocialLink[] = [
  { platform: 'github', href: 'https://github.com/flamingo-stack', label: 'GitHub' },
  { platform: 'twitter', href: 'https://x.com/openmsp', label: 'X / Twitter' },
  { platform: 'reddit', href: 'https://www.reddit.com/user/rishi_elle/', label: 'Reddit' }
];

function renderSocialIcon(platform: SocialLink['platform']) {
  switch (platform) {
    case 'github':
      return <GitHubIcon className="w-5 h-5" />;
    case 'twitter':
      return <XLogo className="w-5 h-5" />;
    case 'reddit':
      return <RedditIcon className="w-5 h-5" variant="white" />;
    case 'linkedin':
      return <LinkedInIcon className="w-5 h-5" />;
    case 'luma':
      return <LumaIcon className="w-5 h-5" />;
    case 'whatsapp':
      return <WhatsAppIcon className="w-5 h-5" />;
    default:
      return null;
  }
}

export function SocialIconRow({ className = '', links = defaultLinks, variant = 'outline' }: SocialIconRowProps) {
  return (
    <div className={`flex flex-row gap-3 w-full ${className}`}>
      {links.map((link, index) => (
        <Button
          key={index}
          asChild
          variant={variant}
          size="icon"
          className="flex-1"
        >
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label || link.platform}
          >
            {renderSocialIcon(link.platform)}
          </a>
        </Button>
      ))}
    </div>
  );
} 