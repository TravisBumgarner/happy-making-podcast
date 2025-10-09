import express, { Request, Response } from "express";
import fetch from "node-fetch";
import Parser from "rss-parser";
import path from "path";
import cors from "cors";
import fs from "fs";
import { fileURLToPath } from "url";

const FEED_URL = "https://feeds.captivate.fm/happy-making/";

const app = express();

// ---------- ESM dirname ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let frontendDist;
if (process.env.NODE_ENV === "production") {
  frontendDist = path.resolve(__dirname, "./frontend");
} else {
  frontendDist = path.resolve(__dirname, "../dist/frontend");
}
const indexPath = path.join(frontendDist, "index.html");

// ---------- RSS Parser ----------
const parser = new Parser({
  customFields: {
    item: [
      ["podcast:alternateEnclosure", "alternateEnclosure", { keepArray: true }],
      ["podcast:source", "podcast:source", { keepArray: true }],
    ],
  },
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://happymaking.art",
      "https://happymaking.nfshost.com",
    ],
  })
);

// ---------- Helper: OG injection ----------
function injectOg(
  html: string,
  meta: { title: string; description: string; image: string; url: string }
) {
  const tags = `
    <meta property="og:title" content="${meta.title}">
    <meta property="og:description" content="${meta.description}">
    <meta property="og:image" content="${meta.image}">
    <meta property="og:url" content="${meta.url}">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${meta.title}">
    <meta name="twitter:description" content="${meta.description}">
    <meta name="twitter:image" content="${meta.image}">
  `;
  return html.replace("</head>", `${tags}\n</head>`);
}

// ---------- Serve static assets ----------
app.use("/assets", express.static(path.join(frontendDist, "assets")));
app.use("/favicon.png", express.static(path.join(frontendDist, "favicon.png")));

// ---------- API ----------
app.get("/api/rss", async (_req: Request, res: Response) => {
  try {
    const response = await fetch(FEED_URL);
    const xml = await response.text();
    const feed = await parser.parseString(xml);
    res.json(feed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch RSS" });
  }
});

// ---------- Root route ----------
app.get("/", async (_req, res) => {
  const html = fs.readFileSync(indexPath, "utf8");

  try {
    // Fetch and parse once
    const response = await fetch(FEED_URL);
    const xml = await response.text();
    const feed = await parser.parseString(xml);

    // Pull real metadata from feed
    const title = feed.title ?? "Happy Making";
    const description =
      feed.description ??
      "Exploring the creative process, one maker at a time.";
    const image =
      feed.itunes?.image ??
      feed.image?.url ??
      "https://res.cloudinary.com/hqjbxtyku/image/upload/f_auto,q_auto/happymaking-og.jpg";
    const url = feed.link ?? "https://happymaking.art";

    const withOg = injectOg(html, { title, description, image, url });
    res.type("html").send(withOg);
  } catch (err) {
    console.error("❌ Root OG injection error:", err);
    res.type("html").send(html);
  }
});

// ---------- Episode OG route ----------
app.get("/episode/:slug", async (req, res) => {
  const slug = req.params.slug;
  const html = fs.readFileSync(indexPath, "utf8");

  try {
    const response = await fetch(FEED_URL);
    const xml = await response.text();
    const feed = await parser.parseString(xml);
    console.log(feed.items);
    const episode = feed.items.find(({ guid }) => guid === slug);

    const title = episode?.title ?? "Happy Making Episode";
    const description =
      ((episode as any)?.["content:encodedSnippet"] as string | undefined)
        ?.replace(/<[^>]+>/g, "")
        .slice(0, 180) ?? "Listen to the latest episode of Happy Making.";
    const image =
      (episode as any)?.itunes?.image ??
      "https://res.cloudinary.com/hqjbxtyku/image/upload/f_auto,q_auto/happymaking-og.jpg";
    const url = episode?.link ?? `https://happymaking.art/episode/${slug}`;

    const withOg = injectOg(html, { title, description, image, url });
    res.type("html").send(withOg);
  } catch (err) {
    console.error("❌ Episode OG injection error:", err);
    res.type("html").send(html);
  }
});

// ---------- Catch-all fallback ----------
app.get("*", (_req, res) => {
  res.sendFile(indexPath);
});

// ---------- Start ----------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Listening on http://localhost:${PORT}`));
