// Simple in-memory cache with TTL support
interface CacheEntry<T = unknown> {
  value: T
  timestamp: number
  ttl: number
}

const cache = new Map<string, CacheEntry<unknown>>()

/**
 * Get value from cache if not expired
 */
export function getCached<T = unknown>(key: string): T | null {
  const entry = cache.get(key)
  if (!entry) return null
  
  const now = Date.now()
  if (now - entry.timestamp > entry.ttl) {
    cache.delete(key)
    return null
  }
  
  return entry.value as T
}

/**
 * Set value in cache with TTL
 * @param key - Cache key
 * @param value - Value to cache
 * @param ttl - Time to live in milliseconds
 */
export function setCache<T = unknown>(key: string, value: T, ttl: number): void {
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
