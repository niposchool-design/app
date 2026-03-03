/**
 * Basic Load Test Script for Nipo School
 *
 * Usage: npx tsx scripts/load-test.ts
 *
 * Tests critical read paths to measure response times
 * under concurrent load. No external dependencies needed.
 */

import 'dotenv/config'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4000'
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

interface TestResult {
  name: string
  concurrency: number
  totalMs: number
  p50Ms: number
  p95Ms: number
  p99Ms: number
  errors: number
  successRate: string
}

async function timedFetch(url: string, headers?: Record<string, string>): Promise<{ ms: number; ok: boolean }> {
  const start = Date.now()
  try {
    const res = await fetch(url, { headers })
    return { ms: Date.now() - start, ok: res.ok }
  } catch {
    return { ms: Date.now() - start, ok: false }
  }
}

function percentile(sorted: number[], p: number): number {
  const idx = Math.ceil((p / 100) * sorted.length) - 1
  return sorted[Math.max(0, idx)]
}

async function runTest(
  name: string,
  url: string,
  concurrency: number,
  headers?: Record<string, string>
): Promise<TestResult> {
  const results = await Promise.all(
    Array.from({ length: concurrency }, () => timedFetch(url, headers))
  )

  const times = results.map(r => r.ms).sort((a, b) => a - b)
  const errors = results.filter(r => !r.ok).length

  return {
    name,
    concurrency,
    totalMs: Math.max(...times),
    p50Ms: percentile(times, 50),
    p95Ms: percentile(times, 95),
    p99Ms: percentile(times, 99),
    errors,
    successRate: `${((concurrency - errors) / concurrency * 100).toFixed(1)}%`,
  }
}

async function main() {
  console.log('=== Nipo School Load Test ===')
  console.log(`Target: ${BASE_URL}`)
  console.log(`Supabase: ${SUPABASE_URL}`)
  console.log('')

  const supabaseHeaders = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  }

  const tests: TestResult[] = []

  // Test 1: Supabase read — lessons list
  for (const n of [10, 50]) {
    const result = await runTest(
      `Supabase: v_lessons (${n} concurrent)`,
      `${SUPABASE_URL}/rest/v1/v_lessons?select=id,title,lesson_number,status&limit=20`,
      n,
      supabaseHeaders
    )
    tests.push(result)
  }

  // Test 2: Supabase read — instruments
  for (const n of [10, 50]) {
    const result = await runTest(
      `Supabase: v_instruments (${n} concurrent)`,
      `${SUPABASE_URL}/rest/v1/v_instruments?select=id,name,category&limit=50`,
      n,
      supabaseHeaders
    )
    tests.push(result)
  }

  // Test 3: Supabase read — library items
  for (const n of [10, 30]) {
    const result = await runTest(
      `Supabase: v_library_items (${n} concurrent)`,
      `${SUPABASE_URL}/rest/v1/v_library_items?select=id,title,category&limit=30`,
      n,
      supabaseHeaders
    )
    tests.push(result)
  }

  // Test 4: Next.js page load (cold)
  for (const n of [5, 10]) {
    const result = await runTest(
      `Next.js: /login page (${n} concurrent)`,
      `${BASE_URL}/login`,
      n
    )
    tests.push(result)
  }

  // Print results
  console.log('Results:')
  console.log('─'.repeat(90))
  console.log(
    'Test'.padEnd(45),
    'p50'.padStart(8),
    'p95'.padStart(8),
    'p99'.padStart(8),
    'Errors'.padStart(8),
    'Success'.padStart(10)
  )
  console.log('─'.repeat(90))

  for (const t of tests) {
    console.log(
      t.name.padEnd(45),
      `${t.p50Ms}ms`.padStart(8),
      `${t.p95Ms}ms`.padStart(8),
      `${t.p99Ms}ms`.padStart(8),
      String(t.errors).padStart(8),
      t.successRate.padStart(10)
    )
  }

  console.log('─'.repeat(90))
  console.log('\nDone.')
}

main().catch(console.error)
