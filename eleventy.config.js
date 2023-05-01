const kram11ty = require("@cre.ative/kram-11ty");
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const fs = require("node:fs/promises");
const path = require("node:path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "src/scripts": "scripts",
    "src/styles": "styles",
  });
  eleventyConfig.addPassthroughCopy("projects/**/FILES/*.*");

  eleventyConfig.addPlugin(pluginWebc, {
    // (The default changed from `false` in Eleventy WebC v0.7.0)
    // components: "src/components/cre-ative/*.webc",

    // Adds an Eleventy WebC transform to process all HTML output
    useTransform: true,

    // Additional global data used in the Eleventy WebC transform
    transformData: {},
  });

  // Override Markdown parser to Kram
  eleventyConfig.addExtension(
    "md",
    kram11ty.configure({
      input: "./projects",
      output: "./posts",
      template: "./src/template/post.html",
      platforms: {
        "react-redux": "@cre.ative/kram-react-redux",
        "react-native": "@cre.ative/kram-react-native",
        elm: "@cre.ative/kram-elm",
      },
    })
  );

  // Return your Object options:
  return {
    dir: {
      input: "projects/",
      output: "posts",
    },
  };
};
