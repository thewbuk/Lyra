import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function SubmissionsList() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Content Submissions</CardTitle>
              <CardDescription>Review and approve influencer submissions</CardDescription>
            </div>
            <Button>New Review</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="space-y-1">
                <p className="font-medium leading-none">
                  {submission.influencer}
                </p>
                <p className="text-sm text-muted-foreground">
                  {submission.type} - {submission.campaign}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={submission.status === "Pending" ? "secondary" : 
                  submission.status === "Approved" ? "default" : "destructive"}>
                  {submission.status}
                </Badge>
                <Button variant="outline" size="sm">
                  Review
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

const submissions = [
  {
    id: 1,
    influencer: "Sarah Johnson",
    type: "Video Script",
    campaign: "Milanote Q4 Campaign",
    status: "Pending"
  },
  {
    id: 2,
    influencer: "Mike Chen",
    type: "Draft Video",
    campaign: "Milanote Q4 Campaign",
    status: "Needs Revision"
  },
  {
    id: 3,
    influencer: "Emily Williams",
    type: "Final Video",
    campaign: "Milanote Q4 Campaign",
    status: "Approved"
  },
]
