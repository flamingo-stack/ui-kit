import { Button } from './ui/button';
import { GitHubIcon, RedditIcon, XLogo, LinkedInIcon, LumaIcon, WhatsAppIcon, GlobeIcon, MessageCircleIcon, TelegramIcon, YouTubeIcon, InstagramIcon, FacebookIcon } from './icons';

interface SocialLink {
  platform: string;
  href: string;
  label?: string;
}

interface SocialIconRowProps {
  className?: string;
  links?: SocialLink[];
  variant?: "destructive" | "outline" | "secondary" | "ghost" | "link" | "search" | "primary" | "white" | "transparent" | "ghost-nav" | "submit" | "success" | "warning" | "info" | "flamingo-primary" | "flamingo-secondary" | "footer-link" | "filter" | "filter-active" | "section" | "section-active" | null | undefined;
}

const defaultLinks: SocialLink[] = [
  { platform: 'github', href: 'https://github.com/flamingo-stack', label: 'GitHub' },
  { platform: 'twitter', href: 'https://x.com/openmsp', label: 'X / Twitter' },
  { platform: 'reddit', href: 'https://www.reddit.com/user/rishi_elle/', label: 'Reddit' }
];

function renderSocialIcon(platform: string) {
  const normalizedPlatform = platform.toLowerCase().trim();

  switch (normalizedPlatform) {
    case 'github':
      return <GitHubIcon className="w-5 h-5" />;
    case 'twitter':
    case 'x':
      return <XLogo className="w-5 h-5" />;
    case 'reddit':
      return <RedditIcon className="w-5 h-5" variant="white" />;
    case 'linkedin':
      return <LinkedInIcon className="w-5 h-5" />;
    case 'luma':
      return <LumaIcon className="w-5 h-5" />;
    case 'whatsapp':
      return <WhatsAppIcon className="w-5 h-5" />;
    case 'website':
    case 'web':
    case 'url':
      return <GlobeIcon className="w-5 h-5" />;
    case 'discord':
    case 'slack':
      return <MessageCircleIcon className="w-5 h-5" />;
    case 'telegram':
      return <TelegramIcon className="w-5 h-5" />;
    case 'youtube':
    case 'yt':
      return <YouTubeIcon className="w-5 h-5" />;
    case 'instagram':
    case 'ig':
      return <InstagramIcon className="w-5 h-5" />;
    case 'facebook':
    case 'fb':
      return <FacebookIcon className="w-5 h-5" />;
    default:
      return <GlobeIcon className="w-5 h-5" />;
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