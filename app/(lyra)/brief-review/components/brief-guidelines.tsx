import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

interface BriefGuidelinesProps {
  brief: {
    title: string
    description: string
    keyMessages: string[]
    dos: string[]
    donts: string[]
    requiredElements: string[]
  }
}

export function BriefGuidelines({ brief }: BriefGuidelinesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{brief.title}</CardTitle>
        <CardDescription>{brief.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Key Messages</h3>
          <ul className="space-y-2">
            {brief.keyMessages.map((message, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>{message}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Do&apos;s</h3>
            <ul className="space-y-2">
              {brief.dos.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Don&apos;ts</h3>
            <ul className="space-y-2">
              {brief.donts.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <X className="h-5 w-5 text-destructive mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Required Elements</h3>
          <div className="flex flex-wrap gap-2">
            {brief.requiredElements.map((element, index) => (
              <Badge key={index} variant="outline">
                {element}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
