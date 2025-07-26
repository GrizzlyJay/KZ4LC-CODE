const { DateTime } = require("luxon");
const fs = require("fs");
const slugify = require("slugify");

module.exports = function (eleventyConfig) {
  // ─── Always override `date` to the file’s last‐modified time ─────────
  eleventyConfig.addGlobalData("eleventyComputed", {
    date: data => {
      let stats = fs.statSync(data.page.inputPath);
      return stats.mtime;
    }
  });
  // ──────────────────────────────────────────────────────────────────────

  // Passthrough your CSS and Admin Panel
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");

  // Format dates as YYYY‑MM‑DD
  eleventyConfig.addFilter("dateOnly", dateObj =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-MM-dd")
  );

  // Utility filters
  eleventyConfig.addFilter("sortAlphabetically", arr =>
    (Array.isArray(arr) ? [...arr] : []).sort((a, b) => a.localeCompare(b))
  );
  eleventyConfig.addFilter("slug", str =>
    slugify(str || "", { lower: true, remove: /[*+~.()'"!:@]/g })
  );
  eleventyConfig.addFilter("capitalize", str =>
    typeof str === "string" && str.length
      ? str.charAt(0).toUpperCase() + str.slice(1)
      : str
  );

  // Latest 5 posts collection
  eleventyConfig.addCollection("latestPosts", collectionApi => {
    return collectionApi
      .getAllSorted()
      .filter(item => item.filePathStem.startsWith("/posts/"))
      .reverse()
      .slice(0, 5);
  });

  // Gather all unique tags
  eleventyConfig.addCollection("tagList", collectionApi => {
    let tags = new Set();
    collectionApi.getAll().forEach(item => {
      (item.data.tags || []).forEach(t => tags.add(t));
    });
    return [...tags];
  });

  return {
    dir: {
      input: ".",
      output: "KZ4LC-LIVE",
    },
  };
};
