import { NextRequest, NextResponse } from "next/server"

// Middleware temporariamente desabilitado para debugging
export async function middleware(request: NextRequest) {
  return NextResponse.next()
}
