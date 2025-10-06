const fs = require("fs");
const path = require("path");

// Read the API route file
const filePath = path.join(
  __dirname,
  "../src/app/api/get-property-details/route.js"
);
let content = fs.readFileSync(filePath, "utf8");

// Remove the getLocalImagePath helper function
content = content.replace(
  `// Helper function to convert external URLs to local paths
function getLocalImagePath(externalUrl) {
  if (!externalUrl) return "";
  const filename = externalUrl.split("/").pop();
  return \`/assets/properties/\${filename}\`;
}`,
  ""
);

// Replace all getLocalImagePath calls with direct local paths
content = content.replace(
  /getLocalImagePath\("https:\/\/rioluxuryhomes\.in\/files\/properties_images\/([^"]+)"\)/g,
  '"/assets/properties/$1"'
);

// Write the updated content back to the file
fs.writeFileSync(filePath, content, "utf8");

console.log(
  "Successfully simplified all image paths to direct local references!"
);
