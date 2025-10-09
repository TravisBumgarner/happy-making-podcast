import express, { Request, Response } from "express";
import fetch from "node-fetch";
import Parser from "rss-parser";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const FEED_URL = "https://feeds.captivate.fm/happy-making/";

/** ---------- Types ---------- **/

interface PodcastSource {
  $: {
    uri: string;
  };
}

interface AlternateEnclosure {
  $: {
    type: string;
    title: string;
  };
  "podcast:source"?: PodcastSource[];
}

interface FeedItem {
  [key: string]: any;
  title?: string;
  link?: string;
  pubDate?: string;
  alternateEnclosure?: AlternateEnclosure[]; // rss-parser custom field
  youtube?: {
    title: string;
    url: string;
  } | null;
}

interface Feed {
  [key: string]: any;
  items: FeedItem[];
}

/** ---------- Normalize feed ---------- **/

const normalizeFeed = (feed: Feed): Feed => ({
  ...feed,
  items: feed.items.map((item) => {
    const alt = item.alternateEnclosure?.[0];
    const sourceUri = alt?.["podcast:source"]?.[0]?.$?.uri;

    const youtube =
      alt?.$?.type === "video/youtube" && sourceUri
        ? {
            title: alt.$.title,
            url: sourceUri,
          }
        : null;

    return { ...item, youtube };
  }),
});

/** ---------- App setup ---------- **/

const app = express();

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

// Figure out __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to built React files
const frontendDist = path.resolve(__dirname, "../../frontend/dist");

// Serve frontend
app.use(express.static(frontendDist));

/** ---------- Routes ---------- **/

// Proxy RSS to JSON
app.get("/api/rss", async (_req: Request, res: Response) => {
  try {
    const response = await fetch(FEED_URL);
    if (!response.ok) throw new Error(`Fetch failed with ${response.status}`);

    const xml = await response.text();
    const feed = await parser.parseString(xml);
    const normalized = normalizeFeed(feed);

    res.json(normalized);
  } catch (err) {
    console.error("❌ RSS fetch/parse error:", err);
    res.status(500).json({ error: "Failed to fetch or parse RSS" });
  }
});

// Fallback for React Router
if (process.env.NODE_ENV === "production") {
  const frontendDist = path.join(__dirname, "frontend");

  app.use(express.static(frontendDist));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running: http://localhost:${PORT}`);
});
