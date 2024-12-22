'use client'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Cloud, File } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileUploaderProps {
  onFilesAdded: (files: File[]) => void
  acceptedFileTypes?: Record<string, string[]>
  className?: string
}

export function FileUploader({
  onFilesAdded,
  acceptedFileTypes,
  className,
}: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesAdded(acceptedFiles)
    },
    [onFilesAdded]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors',
        isDragActive
          ? 'border-primary bg-secondary/50'
          : 'border-border hover:border-primary/50',
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        {isDragActive ? (
          <Cloud className="h-8 w-8 text-primary animate-bounce" />
        ) : (
          <File className="h-8 w-8 text-muted-foreground" />
        )}
        <div className="text-sm">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </div>
        <div className="text-xs text-muted-foreground">
          Supported formats: MP4, TXT, PDF
        </div>
      </div>
    </div>
  )
}
