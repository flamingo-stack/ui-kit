"use client";

import { Button, Input, Label } from '../ui';
import { Trash2, Plus, ExternalLink } from 'lucide-react';

export interface GitHubReleaseLink {
  github_release_url: string; // Full GitHub release URL
  display_order?: number;
}

interface GitHubReleasesManagerProps {
  releases: GitHubReleaseLink[];
  onChange: (releases: GitHubReleaseLink[]) => void;
  className?: string;
}

export function GitHubReleasesManager({
  releases,
  onChange,
  className = ''
}: GitHubReleasesManagerProps) {
  const addRelease = () => {
    onChange([...releases, { github_release_url: '' }]);
  };

  const removeRelease = (index: number) => {
    onChange(releases.filter((_, i) => i !== index));
  };

  const updateRelease = (index: number, value: string) => {
    const updated = [...releases];
    updated[index] = { ...updated[index], github_release_url: value };
    onChange(updated);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <Label className="text-[14px] text-ods-text-primary">GitHub Releases</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addRelease}
          leftIcon={<Plus className="h-4 w-4" />}
          className="font-['DM_Sans'] text-[14px]"
        >
          Add GitHub Release
        </Button>
      </div>

      {releases.map((release, index) => (
        <div key={index} className="flex items-center gap-3 p-3 bg-ods-bg-secondary rounded-lg border border-ods-border">
          <div className="w-8 h-8 flex items-center justify-center">
            <ExternalLink className="w-5 h-5 text-ods-text-secondary" />
          </div>

          <div className="flex-1">
            <Input
              placeholder="https://github.com/org/repo/releases/tag/v2.0.0"
              value={release.github_release_url}
              onChange={(e) => updateRelease(index, e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
              className="bg-[#161616]"
            />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeRelease(index)}
            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      {releases.length === 0 && (
        <div className="text-center py-4 px-4 bg-ods-bg-secondary border border-ods-border rounded-lg">
          <p className="text-ods-text-secondary text-sm font-['DM_Sans']">
            No GitHub releases linked. Click "Add GitHub Release" to link releases.
          </p>
        </div>
      )}
    </div>
  );
}
