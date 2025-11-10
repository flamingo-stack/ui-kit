"use client";

import { Button, Input, Label } from '../ui';
import { Trash2, Plus, FileText } from 'lucide-react';

export interface KBLink {
  kb_article_path: string; // Relative path like /api/authentication/api-keys.md
  display_order?: number;
}

interface KnowledgeBaseLinksManagerProps {
  links: KBLink[];
  onChange: (links: KBLink[]) => void;
  className?: string;
}

export function KnowledgeBaseLinksManager({
  links,
  onChange,
  className = ''
}: KnowledgeBaseLinksManagerProps) {
  const addLink = () => {
    onChange([...links, { kb_article_path: '' }]);
  };

  const removeLink = (index: number) => {
    onChange(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, value: string) => {
    const updated = [...links];
    updated[index] = { ...updated[index], kb_article_path: value };
    onChange(updated);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <Label className="text-[14px] text-ods-text-primary">Knowledge Base Articles</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addLink}
          leftIcon={<Plus className="h-4 w-4" />}
          className="font-['DM_Sans'] text-[14px]"
        >
          Add KB Article
        </Button>
      </div>

      {links.map((link, index) => (
        <div key={index} className="flex items-center gap-3 p-3 bg-ods-bg-secondary rounded-lg border border-ods-border">
          <div className="w-8 h-8 flex items-center justify-center">
            <FileText className="w-5 h-5 text-ods-text-secondary" />
          </div>

          <div className="flex-1">
            <Input
              placeholder="Relative path (e.g., /api/authentication/api-keys.md)"
              value={link.kb_article_path}
              onChange={(e) => updateLink(index, e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
              className="bg-[#161616]"
            />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeLink(index)}
            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      {links.length === 0 && (
        <div className="text-center py-4 px-4 bg-ods-bg-secondary border border-ods-border rounded-lg">
          <p className="text-ods-text-secondary text-sm font-['DM_Sans']">
            No knowledge base articles linked. Click "Add KB Article" to link articles.
          </p>
        </div>
      )}
    </div>
  );
}
