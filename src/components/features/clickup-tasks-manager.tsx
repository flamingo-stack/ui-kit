"use client";

import { Button, Input, Label } from '../ui';
import { Trash2, Plus, Lightbulb } from 'lucide-react';

export interface ClickUpTaskLink {
  clickup_task_id: string; // Just the task ID
  display_order?: number;
}

interface ClickUpTasksManagerProps {
  tasks: ClickUpTaskLink[];
  onChange: (tasks: ClickUpTaskLink[]) => void;
  title?: string; // Optional custom title
  className?: string;
}

export function ClickUpTasksManager({
  tasks,
  onChange,
  title = 'ClickUp Roadmap Tasks', // Default title
  className = ''
}: ClickUpTasksManagerProps) {
  const addTask = () => {
    onChange([...tasks, { clickup_task_id: '' }]);
  };

  const removeTask = (index: number) => {
    onChange(tasks.filter((_, i) => i !== index));
  };

  const updateTask = (index: number, value: string) => {
    const updated = [...tasks];
    updated[index] = { ...updated[index], clickup_task_id: value };
    onChange(updated);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <Label className="text-[14px] text-ods-text-primary">{title}</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addTask}
          leftIcon={<Plus className="h-4 w-4" />}
          className="font-['DM_Sans'] text-[14px]"
        >
          Add Task
        </Button>
      </div>

      {tasks.map((task, index) => (
        <div key={index} className="flex items-center gap-3 p-3 bg-ods-bg-secondary rounded-lg border border-ods-border">
          <div className="w-8 h-8 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-ods-text-secondary" />
          </div>

          <div className="flex-1">
            <Input
              placeholder="Task ID (e.g., 86cq2uabk)"
              value={task.clickup_task_id}
              onChange={(e) => updateTask(index, e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
              className="bg-[#161616]"
            />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeTask(index)}
            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      {tasks.length === 0 && (
        <div className="text-center py-4 px-4 bg-ods-bg-secondary border border-ods-border rounded-lg">
          <p className="text-ods-text-secondary text-sm font-['DM_Sans']">
            No ClickUp tasks linked. Click "Add Task" to link roadmap items.
          </p>
        </div>
      )}
    </div>
  );
}
