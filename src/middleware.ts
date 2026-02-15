import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const requiredEnvVars = ['OPENAI_API_KEY', 'PINECONE_API_KEY', 'PINECONE_REGION', 'PINECONE_INDEX'];
    
    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar] && !process.env.CI) {
            // Log the error instead of throwing it to prevent the infinite crash loop
            console.error(`Error: ${envVar} is missing.`);
            return NextResponse.next(); 
        }
    }
    return NextResponse.next();
}

// CRITICAL: This stops middleware from running on static files and error pages
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.).*)',
  ],
};
