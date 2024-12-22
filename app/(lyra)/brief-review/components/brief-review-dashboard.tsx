import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubmissionsList } from "./submissions-list"
import { BriefDetails } from "./brief-details"

export function BriefReviewDashboard() {
  return (
    <Tabs defaultValue="submissions" className="space-y-4">
      <TabsList>
        <TabsTrigger value="submissions">Submissions</TabsTrigger>
        <TabsTrigger value="briefs">Brand Briefs</TabsTrigger>
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
      <TabsContent value="briefs" className="space-y-4">
        <BriefDetails />
      </TabsContent>
    </Tabs>
  )
}
