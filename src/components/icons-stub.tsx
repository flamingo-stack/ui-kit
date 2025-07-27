// Stub implementations for missing icons
import { DollarSign, Code, Users, Building, GitCompare, Globe, MessageSquare } from "lucide-react";

export const OpenSourceIcon = Code;
export const CoinsIcon = DollarSign;
export const VendorDirectoryIcon = Building;
export const CommunityHubIcon = Users;
export const VendorsIcon = Building;
export const CommunityIcon = MessageSquare;
export const CompareIcon = GitCompare;

// Stub OpenmspLogo component
export function OpenmspLogo({ 
  className,
  frontBubbleColor,
  innerFrontBubbleColor,
  backBubbleColor
}: { 
  className?: string;
  frontBubbleColor?: string;
  innerFrontBubbleColor?: string;
  backBubbleColor?: string;
}) {
  return <div className={className} style={{ color: frontBubbleColor }}>MSP</div>;
}

// Stub OpenFrame logo
export function OpenFrameLogo({ 
  className, 
  lowerPathColor, 
  upperPathColor 
}: { 
  className?: string; 
  lowerPathColor?: string; 
  upperPathColor?: string; 
}) {
  return <div className={className} style={{ color: lowerPathColor || upperPathColor }}>OF</div>;
}