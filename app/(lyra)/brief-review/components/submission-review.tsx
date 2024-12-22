'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Check, X, AlertCircle } from "lucide-react"

interface ReviewPoint {
  type: "success" | "error" | "warning"
  message: string
}

interface SubmissionReviewProps {
  submission: {
    title: string
    type: string
    content: string
    reviewPoints: ReviewPoint[]
  }
}

export function SubmissionReview({ submission }: SubmissionReviewProps) {
  const getIcon = (type: ReviewPoint["type"]) => {
    switch (type) {
      case "success":
        return <Check className="h-5 w-5 text-primary" />
      case "error":
        return <X className="h-5 w-5 text-destructive" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-warning" />
    }
  }

  const getBadgeVariant = (type: ReviewPoint["type"]) => {
    switch (type) {
      case "success":
        return "default"
      case "error":
        return "destructive"
      case "warning":
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{submission.title}</CardTitle>
            <CardDescription>
              Review feedback for {submission.type} submission
            </CardDescription>
          </div>
          <Badge>{submission.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {submission.reviewPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-2 p-3 rounded-lg bg-secondary"
            >
              {getIcon(point.type)}
              <div className="flex-1">
                <Badge variant={getBadgeVariant(point.type)} className="mb-1">
                  {point.type.toUpperCase()}
                </Badge>
                <p className="text-sm">{point.message}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Additional Feedback</h3>
          <Textarea
            placeholder="Add your feedback here..."
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline">Request Changes</Button>
        <Button>Approve Submission</Button>
      </CardFooter>
    </Card>
  )
}
