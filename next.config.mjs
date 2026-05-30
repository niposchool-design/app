/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

// Headers de segurança (R-024 A05). CSP começa permissiva mas declarada —
// pode ser endurecida com nonces depois. connect-src/media-src liberam Supabase
// (DB/Storage/Realtime). camera/microphone = self por causa da gravação de
// portfólio direto no app. OpenAI é chamada server-side, não precisa em connect-src.
//
// HSTS SÓ em produção: em dev o server é HTTP, e mandar HSTS faria o navegador
// forçar https://localhost (que não existe) e quebrar o acesso local.
const securityHeaders = [
  ...(isProd
    ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }]
    : []),
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(self), microphone=(self), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "media-src 'self' blob: https://*.supabase.co",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
]

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
