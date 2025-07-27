// Stub user summary component
interface UserSummaryProps {
  name?: string;
  email?: string;
  compact?: boolean;
  avatarSize?: number;
  subtitle?: string;
  avatarUrl?: string | null;
  mspPreview?: any;
  showEditButton?: boolean;
  authProviders?: any[];
  className?: string;
}

export function UserSummary({ name, email, className, ...props }: UserSummaryProps) {
  return (
    <div className={className}>
      <span>{name || email || 'Unknown User'}</span>
    </div>
  );
}