'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser, useSession } from '@clerk/nextjs';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Upload, File, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import ConnectAccounts from '../../[chatId]/components/ConnectAccounts';
import DocumentPreview from './components/DocumentPreview';

type Artifact = {
  id: string;
  name: string;
  created_at: string;
  user_id: string;
};

type Document = {
  id: string;
  name: string;
  artifact_id: string;
  created_at: string;
};

function ArtifactPage() {
  const params = useParams();
  const artifactId =
    typeof params?.artifactId === 'string' ? params.artifactId : '';
  const [artifact, setArtifact] = React.useState<Artifact | null>(null);
  const [documents, setDocuments] = React.useState<Document[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [artifactName, setArtifactName] = React.useState('');
  const [selectedDocument, setSelectedDocument] =
    React.useState<Document | null>(null);
  const [documentToDelete, setDocumentToDelete] =
    React.useState<Document | null>(null);
  const { user } = useUser();
  const { session } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (session && user?.id && artifactId) {
      fetchArtifact();
      fetchDocuments();
    }
  }, [session, user?.id, artifactId]);

  const getSupabaseClient = async () => {
    if (!session) throw new Error('No session');
    const token = await session.getToken({ template: 'supabase' });
    if (!token) throw new Error('No token');
    return supabase(token);
  };

  const fetchArtifact = async () => {
    if (!session || !user?.id) return;

    setIsLoading(true);
    try {
      const supabaseClient = await getSupabaseClient();

      const { data, error } = await supabaseClient
        .from('finance_artifacts')
        .select('*')
        .eq('id', artifactId)
        .single();

      if (error || !data) {
        console.error('Error fetching artifact:', error);
        setIsLoading(false);
        return;
      }

      setArtifact(data);
      setArtifactName(data.name);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDocuments = async () => {
    if (!session || !user?.id) return;

    try {
      const supabaseClient = await getSupabaseClient();

      const { data, error } = await supabaseClient
        .from('finance_documents')
        .select('*')
        .eq('artifact_id', artifactId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching documents:', error);
        return;
      }

      setDocuments(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateArtifactName = async () => {
    if (!session || !user?.id || !artifact) return;

    try {
      const supabaseClient = await getSupabaseClient();

      const { error } = await supabaseClient
        .from('finance_artifacts')
        .update({ name: artifactName })
        .eq('id', artifactId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating artifact name:', error);
        return;
      }

      setArtifact({ ...artifact, name: artifactName });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !session || !user?.id) return;

    // Validate file type
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      toast.error('Only PDF files are allowed');
      return;
    }

    try {
      const supabaseClient = await getSupabaseClient();

      // Create document record
      const { data: docData, error: docError } = await supabaseClient
        .from('finance_documents')
        .insert({
          name: file.name,
          artifact_id: artifactId,
          user_id: user.id,
        })
        .select()
        .single();

      if (docError || !docData) {
        console.error('Error creating document record:', docError);
        toast.error('Failed to upload document');
        return;
      }

      // Upload file to storage
      const { error: uploadError } = await supabaseClient.storage
        .from('finance_documents')
        .upload(`${user.id}/${artifactId}/${docData.id}`, file);

      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        // Clean up the document record if upload fails
        await supabaseClient
          .from('finance_documents')
          .delete()
          .eq('id', docData.id);
        toast.error('Failed to upload document');
        return;
      }

      toast.success('Document uploaded successfully');
      fetchDocuments();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to upload document');
    }
  };

  const handleDeleteDocument = async (doc: Document, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening preview when clicking delete
    setDocumentToDelete(doc);
  };

  const confirmDelete = async () => {
    if (!session || !user?.id || !documentToDelete) return;

    try {
      const supabaseClient = await getSupabaseClient();

      // Delete file from storage
      const { error: storageError } = await supabaseClient.storage
        .from('finance_documents')
        .remove([`${user.id}/${artifactId}/${documentToDelete.id}`]);

      if (storageError) {
        console.error('Error deleting file from storage:', storageError);
        toast.error('Failed to delete document');
        return;
      }

      // Delete document record
      const { error: dbError } = await supabaseClient
        .from('finance_documents')
        .delete()
        .eq('id', documentToDelete.id);

      if (dbError) {
        console.error('Error deleting document record:', dbError);
        toast.error('Failed to delete document');
        return;
      }

      toast.success('Document deleted successfully');
      setDocumentToDelete(null);
      fetchDocuments();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete document');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!artifact) {
    return <div>Artifact not found</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <Input
                value={artifactName}
                onChange={(e) => setArtifactName(e.target.value)}
                className="text-2xl font-bold w-auto"
              />
              <Button onClick={updateArtifactName} size="sm">
                <Save className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Created on {new Date(artifact.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <Tabs defaultValue="documents">
          <TabsList>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-4">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Documents</h3>
                  <div>
                    <Input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden cursor-pointer"
                      id="file-upload"
                      accept=".pdf"
                    />
                    <Label htmlFor="file-upload">
                      <Button asChild>
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload PDF
                        </span>
                      </Button>
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  {documents.length > 0 ? (
                    documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer"
                        onClick={() => setSelectedDocument(doc)}
                      >
                        <div className="flex items-center gap-2">
                          <File className="h-4 w-4" />
                          <span>{doc.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">
                            {new Date(doc.created_at).toLocaleDateString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleDeleteDocument(doc, e)}
                            className="hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      No documents yet. Upload one to get started!
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="accounts">
            <ConnectAccounts />
          </TabsContent>
        </Tabs>
      </div>

      {selectedDocument && user?.id && (
        <DocumentPreview
          isOpen={!!selectedDocument}
          onClose={() => setSelectedDocument(null)}
          document={selectedDocument}
          userId={user.id}
        />
      )}

      <Dialog
        open={!!documentToDelete}
        onOpenChange={() => setDocumentToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Document</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{documentToDelete?.name}
              &quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDocumentToDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ArtifactPage;
