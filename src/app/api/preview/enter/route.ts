import { NextRequest } from "next/server"

import { handleStudioPreviewEnter } from "@/lib/studio-preview"

export async function GET(request: NextRequest) {
  return handleStudioPreviewEnter(request)
}
