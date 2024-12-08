import yaml from "js-yaml";

export default function (eleventyConfig) {
  eleventyConfig.addDataExtension("yml,yaml", (contents) =>
    yaml.load(contents),
  );

  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("videos");
  eleventyConfig.addPassthroughCopy("sly");
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy(".well-known");

  eleventyConfig.addLayoutAlias("plain", "plain.liquid");
  eleventyConfig.addLayoutAlias("default", "default.liquid");
  eleventyConfig.setLayoutResolution(false);

  // Set global permalinks to resource.html style
  eleventyConfig.addGlobalData("permalink", () => {
    return (data) =>
      `${data.page.filePathStem}.${data.page.outputFileExtension}`;
  });

  // Remove .html from `page.url` entries
  eleventyConfig.addUrlTransform((page) => {
    if (page.url.endsWith(".html")) {
      return page.url.slice(0, -1 * ".html".length);
    }
  });
}