import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, FileUp } from 'lucide-react';

type ChatInputProps = {
  input: string;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  hasFileData: boolean;
};

export const ChatInput = ({
  input,
  isLoading,
  onInputChange,
  onFileUpload,
  onSubmit,
  hasFileData,
}: ChatInputProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <Input
        value={input}
        onChange={onInputChange}
        placeholder={
          hasFileData
            ? 'Ask a question about the uploaded PDF...'
            : 'Type your message...'
        }
        disabled={isLoading}
        className="flex-1"
      />
      <input
        type="file"
        accept="application/pdf"
        onChange={onFileUpload}
        className="hidden"
        ref={fileInputRef}
      />
      <Button
        type="button"
        variant={hasFileData ? 'secondary' : 'outline'}
        size="icon"
        onClick={() => fileInputRef.current?.click()}
        disabled={isLoading || hasFileData}
        title={hasFileData ? 'PDF already uploaded' : 'Upload PDF'}
      >
        <FileUp className={`h-4 w-4 ${hasFileData ? 'text-green-500' : ''}`} />
      </Button>
      <Button
        type="submit"
        size="icon"
        disabled={isLoading || (!input && !hasFileData)}
        title="Send message"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
