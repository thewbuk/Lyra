import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function BriefDetails() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Milanote Q4 Campaign Brief</CardTitle>
          <CardDescription>Campaign brief and requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Key Messages</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Emphasize Milanote&apos;s visual organization capabilities</li>
              <li>Highlight the collaborative features for creative teams</li>
              <li>Showcase the intuitive drag-and-drop interface</li>
              <li>Mention the flexible board layout system</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Do&apos;s</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Show real examples of using Milanote for project organization</li>
              <li>Demonstrate how easy it is to share and collaborate</li>
              <li>Include a clear call-to-action with provided discount code</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Don&apos;ts</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Compare directly with competitor products</li>
              <li>Make performance claims without evidence</li>
              <li>Use unofficial branding elements</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Required Elements</h3>
            <div className="flex flex-wrap gap-2">
              <Badge>Product Demo</Badge>
              <Badge>Use Case Example</Badge>
              <Badge>Discount Code</Badge>
              <Badge>Brand Logo</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
