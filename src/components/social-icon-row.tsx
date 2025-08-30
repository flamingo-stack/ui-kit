import { Button } from './ui/button';
import { GitHubIcon, RedditIcon, XLogo } from './icons';

interface SocialIconRowProps {
  className?: string;
}

export function SocialIconRow({ className = '' }: SocialIconRowProps) {
  return (
    <div className={`flex flex-row gap-3 w-full ${className}`}>
      <Button
        asChild
        variant="outline"
        size="icon"
        className="flex-1"
      >
        <a
          href="https://github.com/flamingo-stack"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <GitHubIcon className="w-5 h-5" />
        </a>
      </Button>

      <Button asChild variant="outline" size="icon" className="flex-1">
        <a
          href="https://x.com/openmsp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X / Twitter"
        >
          <XLogo className="w-5 h-5" />
        </a>
      </Button>

      <Button asChild variant="outline" size="icon" className="flex-1">
        <a
          href="https://www.reddit.com/user/rishi_elle/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Reddit"
        >
          <RedditIcon className="w-5 h-5" variant="white" />
        </a>
      </Button>
    </div>
  );
} 