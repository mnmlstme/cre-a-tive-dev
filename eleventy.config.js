const kram11ty = require("@cre.ative/kram-11ty");
const fs = require("node:fs/promises");
const path = require("node:path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "src/scripts": "scripts",
    "src/styles": "styles",
  });
  eleventyConfig.addPassthroughCopy("projects/**/FILES/*.*");

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
