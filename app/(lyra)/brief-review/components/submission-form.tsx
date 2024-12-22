'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./file-uploader"

export function SubmissionForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Submission</CardTitle>
        <CardDescription>
          Submit your content for review against the brand brief
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="submissionType">Submission Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select submission type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="topic">Video Topic</SelectItem>
              <SelectItem value="script">Draft Script</SelectItem>
              <SelectItem value="video">Draft Video</SelectItem>
              <SelectItem value="final">Final Video</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Enter submission title" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your submission"
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label>Content</Label>
          <FileUploader 
            onFilesAdded={(files) => console.log(files)}
            acceptedFileTypes={{
              'video/mp4': ['.mp4'],
              'text/plain': ['.txt'],
              'application/pdf': ['.pdf']
            }}
          />
        </div>

        <Button className="w-full">Submit for Review</Button>
      </CardContent>
    </Card>
  )
}
