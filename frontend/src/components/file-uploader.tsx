/**
 * v0 by Vercel.
 * @see https://v0.dev/t/aDFucFbMyb8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { File } from 'lucide-react'

export default function FileUploader() {
  return (
    <Card className="text-foreground w-[80%] bg-[var(--md-sys-color-surface-bright)]">
      <CardContent className="space-y-2 p-6">
        <div className="border-foreground flex flex-col items-center gap-1 rounded-lg border-2 border-dashed p-6">
          <File className="h-12 w-12" />
          <span className="text-sm font-medium">Drag and drop a file or click to browse</span>
          <span className="text-xs">PDF, image, video, or audio</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <Label htmlFor="file" className="text-base font-medium">
            File
          </Label>
          <Input id="file" type="file" placeholder="File" accept="application/pdf" />
        </div>
      </CardContent>
      <CardFooter>
        <Button size="lg" className="text-background w-full">
          Upload
        </Button>
      </CardFooter>
    </Card>
  )
}
