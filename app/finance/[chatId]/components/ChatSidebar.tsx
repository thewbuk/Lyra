'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ChatMetadata = {
  title: string;
  description: string;
  artifact_id?: string;
};

type Artifact = {
  id: string;
  name: string;
  created_at: string;
};

type ChatSidebarProps = {
  chatMetadata: ChatMetadata;
  artifacts: Artifact[];
  onUpdateMetadata: (metadata: ChatMetadata) => void;
};

function ChatSidebar({
  chatMetadata,
  artifacts,
  onUpdateMetadata,
}: ChatSidebarProps) {
  const [editingField, setEditingField] = React.useState<
    'title' | 'description' | null
  >(null);
  const [editedMetadata, setEditedMetadata] =
    React.useState<ChatMetadata>(chatMetadata);

  const handleSave = () => {
    onUpdateMetadata(editedMetadata);
    setEditingField(null);
    toast.success('Changes saved successfully');
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditedMetadata(chatMetadata);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          {editingField === 'title' ? (
            <div className="w-full">
              <Input
                value={editedMetadata.title}
                onChange={(e) =>
                  setEditedMetadata((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="Chat title"
                className="w-full"
                autoFocus
              />
              <div className="flex gap-2 mt-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSave}
                  className="flex items-center gap-1"
                >
                  <Check className="h-3 w-3" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="flex items-center gap-1"
                >
                  <X className="h-3 w-3" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold">
                {chatMetadata.title || 'Untitled Chat'}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingField('title')}
                className="h-8 w-8 p-0"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        <div className="flex items-start justify-between gap-2">
          {editingField === 'description' ? (
            <div className="w-full">
              <Input
                value={editedMetadata.description}
                onChange={(e) =>
                  setEditedMetadata((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Chat description"
                className="w-full"
                autoFocus
              />
              <div className="flex gap-2 mt-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSave}
                  className="flex items-center gap-1"
                >
                  <Check className="h-3 w-3" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="flex items-center gap-1"
                >
                  <X className="h-3 w-3" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground flex-1">
                {chatMetadata.description || 'No description'}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingField('description')}
                className="h-8 w-8 p-0 mt-[-4px]"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium block">Artifact</label>
        <Select
          value={editedMetadata.artifact_id}
          onValueChange={(value) => {
            setEditedMetadata((prev) => ({
              ...prev,
              artifact_id: value,
            }));
            onUpdateMetadata({
              ...editedMetadata,
              artifact_id: value,
            });
            toast.success('Artifact updated successfully');
          }}
          disabled={artifacts.length === 0}
        >
          <SelectTrigger className="w-full bg-background">
            <SelectValue
              placeholder={
                artifacts.length === 0
                  ? 'No artifacts available'
                  : 'Select an artifact'
              }
            />
          </SelectTrigger>
          <SelectContent className="z-50">
            {artifacts.map((artifact) => (
              <SelectItem key={artifact.id} value={artifact.id}>
                {artifact.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default ChatSidebar;
