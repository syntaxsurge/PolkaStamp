import { next } from '@vercel/edge'

/**
 * Edge Middleware
 *  - Redirects /demo-video requests to the YouTube embed.
 *  - Adds common security headers to all other responses.
 */
export default function middleware(req) {
  const { pathname } = new URL(req.url)

  // Redirect /demo-video (with or without trailing slash)
  if (pathname === '/demo-video' || pathname === '/demo-video/') {
    return new Response(null, {
      status: 302,
      headers: {
        Location: 'https://www.youtube.com/watch?v=B-0lPOdbbsw',
      },
    })
  }

  // Continue to origin with additional security headers
  return next({
    headers: {
      'Referrer-Policy': 'origin-when-cross-origin',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-DNS-Prefetch-Control': 'on',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    },
  })
}
