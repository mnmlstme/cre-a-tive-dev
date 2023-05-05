const kram11ty = require("@cre.ative/kram-11ty");
const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const fs = require("node:fs/promises");
const path = require("node:path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "src/scripts": "scripts",
    "src/styles": "styles",
  });
  eleventyConfig.addPassthroughCopy("projects/**/FILES/*.*");

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      configFile: "./vite.config.js",
    },
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
        elm: "@cre.ative/kram-elm",
      },
    })
  );

  return {
    dir: {
      input: "projects/",
      output: "posts",
    },
  };
};
