const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_BASE_URL;

export async function getHomePage() {
  // Ensure we have a base URL and strip trailing slash if present
  const baseUrl = (WP_BASE_URL || "").replace(/\/$/, "");
  // Correct endpoint includes /wp-json
  const url = `${baseUrl}/wp-json/wp/v2/pages?slug=home&_acf_format=standard`;

  console.log("Fetching Home Page from:", url);

  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const res = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(id);

    if (!res.ok) {
      console.error(`Fetch failed with status: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch home page: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // Check if we got an empty array (no page found)
    if (Array.isArray(data) && data.length === 0) {
      console.warn("No pages found with slug 'home'");
      return null;
    }

    return data[0];
  } catch (error) {
    console.error("Error in getHomePage:", error);
    // Rethrow so the component can handle it
    throw error;
  }
}
export async function getPage(idOrSlug: string | number) {
  const baseUrl = (WP_BASE_URL || "").replace(/\/$/, "");
  const isId = typeof idOrSlug === 'number' || !isNaN(Number(idOrSlug));
  const url = isId
    ? `${baseUrl}/wp-json/wp/v2/pages/${idOrSlug}?_acf_format=standard`
    : `${baseUrl}/wp-json/wp/v2/pages?slug=${idOrSlug}&_acf_format=standard`;

  console.log(`Fetching Page ${idOrSlug} from:`, url);

  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(id);

    if (!res.ok) {
      throw new Error(`Failed to fetch page ${idOrSlug}: ${res.status}`);
    }

    const data = await res.json();
    if (isId) {
      return data;
    }
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error(`Error in getPage (${idOrSlug}):`, error);
    throw error;
  }
}
