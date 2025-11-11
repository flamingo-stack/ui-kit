"use client";

import { Button, Input, Textarea, Label } from '../ui';
import { Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { ChangelogEntry } from '../../types/product-release';

interface ChangelogManagerProps {
  title: string;
  entries: ChangelogEntry[];
  onChange: (entries: ChangelogEntry[]) => void;
  className?: string;
}

export function ChangelogManager({
  title,
  entries,
  onChange,
  className = ''
}: ChangelogManagerProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const addEntry = () => {
    const newEntry: ChangelogEntry = {
      title: '',
      description: ''
    };
    onChange([...entries, newEntry]);
    setExpandedIndex(entries.length); // Expand the newly added entry
  };

  const removeEntry = (index: number) => {
    onChange(entries.filter((_, i) => i !== index));
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  const updateEntry = (index: number, field: keyof ChangelogEntry, value: string) => {
    const updated = [...entries];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <Label className="text-[14px] text-ods-text-primary">
          {title}
        </Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addEntry}
          leftIcon={<Plus className="h-4 w-4" />}
          className="font-['DM_Sans'] text-[14px]"
        >
          Add Entry
        </Button>
      </div>

      {entries.map((entry, index) => {
        const isExpanded = expandedIndex === index;
        const hasContent = entry.title.trim().length > 0;

        return (
          <div key={index} className="bg-ods-bg-secondary rounded-lg border border-ods-border overflow-hidden">
            {/* Header - always visible */}
            <div className="flex items-center gap-3 p-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => toggleExpanded(index)}
                className="shrink-0"
              >
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>

              <div className="flex-1 min-w-0">
                {hasContent ? (
                  <p className="font-['DM_Sans'] font-medium text-[14px] text-ods-text-primary truncate">
                    {entry.title}
                  </p>
                ) : (
                  <p className="font-['DM_Sans'] font-medium text-[14px] text-ods-text-secondary italic">
                    New entry (click to edit)
                  </p>
                )}
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeEntry(index)}
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10 shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Expanded content */}
            {isExpanded && (
              <div className="px-3 pb-3 space-y-3 border-t border-ods-border pt-3">
                {/* Title */}
                <div className="space-y-1">
                  <Label className="text-[12px] text-ods-text-secondary">Title *</Label>
                  <Input
                    placeholder="e.g., New dark mode theme support"
                    value={entry.title}
                    onChange={(e) => updateEntry(index, 'title', e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                    className="bg-[#161616]"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <Label className="text-[12px] text-ods-text-secondary">Description</Label>
                  <Textarea
                    placeholder="Detailed explanation of the change..."
                    value={entry.description || ''}
                    onChange={(e) => updateEntry(index, 'description', e.target.value)}
                    rows={2}
                    className="bg-[#161616]"
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}

      {entries.length === 0 && (
        <div className="text-center py-4 px-4 bg-ods-bg-secondary border border-ods-border rounded-lg">
          <p className="text-ods-text-secondary text-sm font-['DM_Sans']">
            No entries added. Click "Add Entry" to create {title.toLowerCase()}.
          </p>
        </div>
      )}
    </div>
  );
}
