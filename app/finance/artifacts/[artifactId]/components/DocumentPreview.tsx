'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/lib/supabaseClient';
import { useSession } from '@clerk/nextjs';
import VisuallyHidden from '@/components/ui/visually-hidden';

type DocumentPreviewProps = {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: string;
    name: string;
    artifact_id: string;
  };
  userId: string;
};

function DocumentPreview({
  isOpen,
  onClose,
  document,
  userId,
}: DocumentPreviewProps) {
  const { session } = useSession();
  const [url, setUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    const getFileUrl = async () => {
      if (!session || !document) return;

      try {
        const token = await session.getToken({ template: 'supabase' });
        if (!token) throw new Error('No token');

        const supabaseClient = supabase(token);
        const { data } = await supabaseClient.storage
          .from('finance_documents')
          .createSignedUrl(
            `${userId}/${document.artifact_id}/${document.id}`,
            3600
          );

        if (data) {
          setUrl(data.signedUrl);
        }
      } catch (error) {
        console.error('Error getting file URL:', error);
      }
    };

    if (isOpen) {
      getFileUrl();
    }
  }, [isOpen, document, session, userId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <VisuallyHidden>
          <DialogTitle>Document Preview: {document.name}</DialogTitle>
        </VisuallyHidden>
        {url ? (
          <div className="w-full h-full">
            {document.name.toLowerCase().endsWith('.pdf') ? (
              <iframe
                src={url}
                className="w-full h-[70vh]"
                title={document.name}
              />
            ) : (
              <img
                src={url}
                alt={document.name}
                className="max-w-full max-h-[70vh] object-contain mx-auto"
              />
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[70vh]">
            Loading preview...
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default DocumentPreview;
