// Cloudflare Worker — Kirana Hisab Calculator
// Yeh script HTML file ko serve karta hai

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Serve the main page for any request
    return new Response(HTML, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
        "Cache-Control": "public, max-age=3600",
        "X-Content-Type-Options": "nosniff",
      },
    });
  },
};

// ── Inline HTML (auto-injected by GitHub Actions from index.html) ──
const HTML = `__HTML_CONTENT__`;
