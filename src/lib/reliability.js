/**
 * Reliability utilities including timeouts, retries, and duplicate submission guards
 */

/**
 * Perform a fetch with a strict timeout limit
 * @param {string} url 
 * @param {RequestInit} options 
 * @param {number} timeoutMs 
 */
export async function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === "AbortError") {
      throw new Error(`Request timed out after ${timeoutMs}ms`);
    }
    throw error;
  }
}

/**
 * Retry an asynchronous function using exponential backoff
 * @param {Function} fn Function returning a promise
 * @param {number} retries Number of retries remaining
 * @param {number} delay Current backoff delay in ms
 * @param {number} factor Exponential backoff factor
 */
export async function retryIdempotent(fn, retries = 3, delay = 500, factor = 2) {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }
    console.warn(`Idempotent query failed. Retrying in ${delay}ms... (Remaining retries: ${retries})`, error.message);
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retryIdempotent(fn, retries - 1, delay * factor, factor);
  }
}

// Client-side submission guard state
const activeSubmissions = new Set();

/**
 * Check and register a unique submission key to prevent double-clicks
 * @param {string} submissionKey Unique key representing the action (e.g., 'coding-submit:101')
 * @returns {boolean} True if submission is allowed, false if it is a duplicate
 */
export function guardSubmission(submissionKey) {
  if (activeSubmissions.has(submissionKey)) {
    return false;
  }
  activeSubmissions.add(submissionKey);
  return true;
}

/**
 * Release a submission key after the action completes
 * @param {string} submissionKey 
 */
export function releaseSubmission(submissionKey) {
  activeSubmissions.delete(submissionKey);
}
