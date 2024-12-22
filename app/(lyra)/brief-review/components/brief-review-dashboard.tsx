'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubmissionsList } from "./submissions-list"
import { BriefGuidelines } from "./brief-guidelines"
import { SubmissionForm } from "./submission-form"
import { SubmissionReview } from "./submission-review"

const mockBrief = {
  title: "Milanote Game Design Brief",
  description: "Guidelines for creating game design content",
  keyMessages: [
    "Emphasize Milanote's visual organization capabilities",
    "Highlight collaborative features for creative teams",
    "Showcase intuitive drag-and-drop interface",
    "Mention flexible board layout system",
  ],
  dos: [
    "Show real examples of using Milanote for project organization",
    "Demonstrate how easy it is to share and collaborate",
    "Include clear call-to-action with provided discount code",
  ],
  donts: [
    "Compare directly with competitor products",
    "Make performance claims without evidence",
    "Use unofficial branding elements",
  ],
  requiredElements: [
    "Product Demo",
    "Use Case Example",
    "Discount Code",
    "Brand Logo",
  ],
}

const mockSubmission = {
  title: "Game Design Workflow Video",
  type: "Draft Script",
  content: "Script content here...",
  reviewPoints: [
    {
      type: "success" as const,
      message: "Effectively demonstrates Milanote's visual organization features",
    },
    {
      type: "warning" as const,
      message: "Could emphasize collaborative features more clearly",
    },
    {
      type: "error" as const,
      message: "Missing required brand logo placement",
    },
  ],
}

export function BriefReviewDashboard() {
  return (
    <Tabs defaultValue="submissions" className="space-y-4">
      <TabsList>
        <TabsTrigger value="submissions">Submissions</TabsTrigger>
        <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
        <TabsTrigger value="new">New Submission</TabsTrigger>
        <TabsTrigger value="review">Review</TabsTrigger>
      </TabsList>

      <TabsContent value="submissions" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Approved Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Needs Revision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Review Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4h</div>
            </CardContent>
          </Card>
        </div>
        <SubmissionsList />
      </TabsContent>

      <TabsContent value="guidelines" className="space-y-4">
        <BriefGuidelines brief={mockBrief} />
      </TabsContent>

      <TabsContent value="new" className="space-y-4">
        <SubmissionForm />
      </TabsContent>

      <TabsContent value="review" className="space-y-4">
        <SubmissionReview submission={mockSubmission} />
      </TabsContent>
    </Tabs>
  )
}
