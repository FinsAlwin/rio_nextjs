const fs = require("fs");
const path = require("path");

// Read the API route file
const filePath = path.join(
  __dirname,
  "../src/app/api/get-property-details/route.js"
);
let content = fs.readFileSync(filePath, "utf8");

// Helper function to convert external URLs to local paths
function getLocalImagePath(externalUrl) {
  if (!externalUrl) return "";
  const filename = externalUrl.split("/").pop();
  return `/assets/properties/${filename}`;
}

// Add the helper function at the top
content = content.replace(
  'import { NextResponse } from "next/server";',
  `import { NextResponse } from "next/server";

// Helper function to convert external URLs to local paths
function getLocalImagePath(externalUrl) {
  if (!externalUrl) return "";
  const filename = externalUrl.split('/').pop();
  return \`/assets/properties/\${filename}\`;
}`
);

// Replace all external image URLs with local paths
content = content.replace(
  /"https:\/\/rioluxuryhomes\.in\/files\/properties_images\/([^"]+)"/g,
  'getLocalImagePath("https://rioluxuryhomes.in/files/properties_images/$1")'
);

// Write the updated content back to the file
fs.writeFileSync(filePath, content, "utf8");

console.log("Successfully updated all image URLs to use local paths!");
