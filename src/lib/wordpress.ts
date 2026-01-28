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
      next: { revalidate: 60 },
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
  } catch (error: any) {

    console.error("Error in getHomePage:", error);
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
      next: { revalidate: 60 },
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
  } catch (error: any) {

    console.error(`Error in getPage (${idOrSlug}):`, error);
    throw error;
  }
}
export async function getPosts(limit: number = 10) {
  const baseUrl = (WP_BASE_URL || "").replace(/\/$/, "");
  const url = `${baseUrl}/wp-json/wp/v2/posts?per_page=${limit}&_acf_format=standard&_embed`;

  console.log("Fetching Posts from:", url);

  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(url, {
      next: { revalidate: 60 },
      signal: controller.signal,
    });
    clearTimeout(id);

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status}`);
    }

    return await res.json();
  } catch (error: any) {

    console.error("Error in getPosts:", error);
    throw error;
  }
}

export async function getPostBySlug(slug: string) {
  const baseUrl = (WP_BASE_URL || "").replace(/\/$/, "");
  const url = `${baseUrl}/wp-json/wp/v2/posts?slug=${slug}&_acf_format=standard&_embed`;

  console.log(`Fetching Post ${slug} from:`, url);

  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(url, {
      next: { revalidate: 60 },
      signal: controller.signal,
    });
    clearTimeout(id);

    if (!res.ok) {
      throw new Error(`Failed to fetch post ${slug}: ${res.status}`);
    }

    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  } catch (error: any) {

    console.error(`Error in getPostBySlug (${slug}):`, error);
    throw error;
  }
}

export async function getCategoryBySlug(slug: string) {
  const baseUrl = (WP_BASE_URL || "").replace(/\/$/, "");
  const url = `${baseUrl}/wp-json/wp/v2/categories?slug=${slug.toLowerCase()}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Category fetch failed: ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error in getCategoryBySlug:", error);
    return null;
  }
}

export async function getPostsByCategory(categoryId: number, limit: number = 10) {
  const baseUrl = (WP_BASE_URL || "").replace(/\/$/, "");
  const url = `${baseUrl}/wp-json/wp/v2/posts?categories=${categoryId}&per_page=${limit}&_acf_format=standard&_embed`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Posts fetch failed: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error in getPostsByCategory:", error);
    return [];
  }
}


export async function getRankMathSEO(path: string) {
  const baseUrl = (WP_BASE_URL || "").replace(/\/$/, "");
  const frontendUrl = `https://web.qintella.com${path}`;
  const url = `${baseUrl}/wp-json/rankmath/v1/getHead?url=${frontendUrl}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.success ? data.head : null;
  } catch (error) {
    console.error(`Error fetching Rank Math SEO for ${path}:`, error);
    return null;
  }
}

/**
 * Basic parser for Rank Math HTML head string to Next.js Metadata
 */
export function parseRankMathMetadata(headString: string): any {
  if (!headString) return {};

  const metadata: any = {
    other: {}
  };

  // Extract Title
  const titleMatch = headString.match(/<title>(.*?)<\/title>/);
  if (titleMatch) metadata.title = titleMatch[1];

  // Extract Meta Tags
  const metaRegex = /<meta (?:name|property)="(.*?)" content="(.*?)"\s*\/?>/g;
  let match;
  while ((match = metaRegex.exec(headString)) !== null) {
    const key = match[1];
    const value = match[2];

    if (key === 'description') metadata.description = value;
    else if (key.startsWith('og:')) {
      if (!metadata.openGraph) metadata.openGraph = {};
      const ogKey = key.replace('og:', '');
      metadata.openGraph[ogKey] = value;
    }
    else if (key.startsWith('twitter:')) {
      if (!metadata.twitter) metadata.twitter = {};
      const twitterKey = key.replace('twitter:', '');
      metadata.twitter[twitterKey] = value;
    }
    else {
      metadata.other[key] = value;
    }
  }

  // Extract Canonical
  const canonicalMatch = headString.match(/<link rel="canonical" href="(.*?)"\s*\/?>/);
  if (canonicalMatch) {
    if (!metadata.alternates) metadata.alternates = {};
    metadata.alternates.canonical = canonicalMatch[1];
  }

  // Extract Robots
  const robotsMatch = headString.match(/<meta name="robots" content="(.*?)"\s*\/?>/);
  if (robotsMatch) {
    const content = robotsMatch[1];
    metadata.robots = {
      index: content.includes('index'),
      follow: content.includes('follow'),
    };
  }

  return metadata;
}

/**
 * Extracts JSON-LD scripts from Rank Math head string
 */
export function extractJsonLd(headString: string): any[] {
  if (!headString) return [];
  const scripts: any[] = [];
  const scriptRegex = /<script type="application\/ld\+json" class="rank-math-schema-pro">(.*?)<\/script>/g;
  let match;
  while ((match = scriptRegex.exec(headString)) !== null) {
    try {
      scripts.push(JSON.parse(match[1]));
    } catch (e) {
      console.error("Failed to parse JSON-LD from Rank Math", e);
    }
  }
  return scripts;
}
