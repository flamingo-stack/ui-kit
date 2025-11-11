"use client";

import { ChangelogManager } from './changelog-manager';
import type { ChangelogEntry } from '../../types/product-release';

interface ChangelogSectionsManagerProps {
  featuresAdded: ChangelogEntry[];
  bugsFixed: ChangelogEntry[];
  improvements: ChangelogEntry[];
  breakingChanges: ChangelogEntry[];
  onFeaturesAddedChange: (entries: ChangelogEntry[]) => void;
  onBugsFixedChange: (entries: ChangelogEntry[]) => void;
  onImprovementsChange: (entries: ChangelogEntry[]) => void;
  onBreakingChangesChange: (entries: ChangelogEntry[]) => void;
  className?: string;
}

export function ChangelogSectionsManager({
  featuresAdded,
  bugsFixed,
  improvements,
  breakingChanges,
  onFeaturesAddedChange,
  onBugsFixedChange,
  onImprovementsChange,
  onBreakingChangesChange,
  className = ''
}: ChangelogSectionsManagerProps) {
  return (
    <div className={`space-y-6 p-6 bg-ods-card border border-ods-border rounded-lg ${className}`}>
      <h3 className="font-['Azeret_Mono'] text-[18px] font-semibold uppercase text-ods-text-primary">Changelog</h3>

      {/* Features Added */}
      <ChangelogManager
        title="Features Added"
        entries={featuresAdded}
        onChange={onFeaturesAddedChange}
      />

      {/* Bugs Fixed */}
      <ChangelogManager
        title="Bugs Fixed"
        entries={bugsFixed}
        onChange={onBugsFixedChange}
      />

      {/* Improvements */}
      <ChangelogManager
        title="Improvements"
        entries={improvements}
        onChange={onImprovementsChange}
      />

      {/* Breaking Changes */}
      <ChangelogManager
        title="Breaking Changes"
        entries={breakingChanges}
        onChange={onBreakingChangesChange}
      />
    </div>
  );
}
