import { Metadata } from "next"
import { BriefReviewDashboard } from "./components/brief-review-dashboard"
import { BackButton } from '../components/ui/BackButton';


export const metadata: Metadata = {
  title: "Brief Review",
  description: "Review influencer content submissions against brand briefs",
}

export default function BriefReviewPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
            <BackButton />
            

      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Brief Review</h2>
      </div>
      <div className="grid gap-4">
        <BriefReviewDashboard />
      </div>
    </div>
  )
}
