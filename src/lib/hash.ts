/**
 * SHA-256 hash helper for IP anonymization.
 * We never store raw visitor IPs — only their hash, so the same visitor
 * can be deduplicated without us being able to reverse the IP.
 */
export async function hashIp(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
