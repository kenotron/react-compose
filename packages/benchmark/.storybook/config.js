import { configure } from "@storybook/react";

console.log("hey!");
const req = require.context("../src", true, /\.stories\.tsx$/);

function loadStories() {
  console.log("loadStories");
  console.log(req);
  console.log(req.keys());
  req.keys().forEach(req);
}

configure(loadStories, module);
