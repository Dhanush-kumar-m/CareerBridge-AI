// Distributed rate limiter abstraction supporting Upstash Redis REST API
// Falls back to local in-memory Map in non-production/development environments

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const localCache = new Map();

/**
 * Checks if the request exceeds rate limits
 * @param {string} ip Client IP address
 * @param {number} limit Maximum requests allowed in the window
 * @param {number} windowSeconds Window duration in seconds
 * @returns {Promise<{success: boolean, limit: number, remaining: number}>}
 */
export async function rateLimit(ip, limit = 20, windowSeconds = 60) {
  const now = Math.floor(Date.now() / 1000);
  const currentWindow = Math.floor(now / windowSeconds);
  const key = `rate_limit:${ip}:${currentWindow}`;

  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    if (process.env.NODE_ENV === "production" && process.env.TESTING !== "true") {
      console.error("CRITICAL ERROR: Upstash Redis credentials missing in production! Blocking request to prevent rate-limit bypass.");
      return {
        success: false,
        limit,
        remaining: 0,
      };
    }
  }

  if (UPSTASH_URL && UPSTASH_TOKEN) {
    try {
      const cleanUrl = UPSTASH_URL.endsWith("/") ? UPSTASH_URL : `${UPSTASH_URL}/`;
      // Run INCR command
      const response = await fetch(`${cleanUrl}INCR/${key}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${UPSTASH_TOKEN}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        const count = result.result;

        // If it's a new key, set an expire timer on it
        if (count === 1) {
          await fetch(`${cleanUrl}EXPIRE/${key}/${windowSeconds}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${UPSTASH_TOKEN}`,
            },
          });
        }

        return {
          success: count <= limit,
          limit,
          remaining: Math.max(0, limit - count),
        };
      }
    } catch (err) {
      console.warn("Upstash Redis connection failed. Falling back to local rate limiter.", err.message);
    }
  }

  // Local development fallback
  // Prune expired entries to prevent memory growth
  for (const [key] of localCache.entries()) {
    const parts = key.split(":");
    const keyWindow = parseInt(parts[parts.length - 1], 10);
    if (isNaN(keyWindow) || keyWindow < currentWindow) {
      localCache.delete(key);
    }
  }

  const localKey = `${ip}:${currentWindow}`;
  const history = localCache.get(localKey) || [];
  const currentCount = history.length;

  if (currentCount >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
    };
  }

  history.push(now);
  localCache.set(localKey, history);

  return {
    success: true,
    limit,
    remaining: limit - currentCount - 1,
  };
}
