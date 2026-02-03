// Simple in-memory cache with TTL support
interface CacheEntry {
  value: any
  timestamp: number
  ttl: number
}

const cache = new Map<string, CacheEntry>()

/**
 * Get value from cache if not expired
 */
export function getCached(key: string): any | null {
  const entry = cache.get(key)
  if (!entry) return null
  
  const now = Date.now()
  if (now - entry.timestamp > entry.ttl) {
    cache.delete(key)
    return null
  }
  
  return entry.value
}

/**
 * Set value in cache with TTL
 * @param key - Cache key
 * @param value - Value to cache
 * @param ttl - Time to live in milliseconds
 */
export function setCache(key: string, value: any, ttl: number): void {
  cache.set(key, {
    value,
    timestamp: Date.now(),
    ttl
  })
}

/**
 * Clear cache entry
 */
export function clearCache(key: string): void {
  cache.delete(key)
}

/**
 * Clear all cache
 */
export function clearAllCache(): void {
  cache.clear()
}

/**
 * Get cache size
 */
export function getCacheSize(): number {
  return cache.size
}
