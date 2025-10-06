const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

// Create assets directory if it doesn't exist
const assetsDir = path.join(__dirname, "../public/assets/properties");
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// List of all image URLs from the API route
const imageUrls = [
  // The Hills Estate
  "https://rioluxuryhomes.in/files/properties_images/The_Hills_Estate_Project_View.webp",
  "https://rioluxuryhomes.in/files/properties_images/The_Hills_Estate_Living.webp",
  "https://rioluxuryhomes.in/files/properties_images/The_Hills_Estate_vertical.webp",
  "https://rioluxuryhomes.in/files/properties_images/The_Hills_Estate_ Villa_External_1.jpg",
  "https://rioluxuryhomes.in/files/properties_images/The_Hills_Estate_ bedroom.jpg",
  "https://rioluxuryhomes.in/files/properties_images/The_Hills_Estate_Villa_external.jpg",
  "https://rioluxuryhomes.in/files/properties_images/The_Hills_Estate_Kitchen.jpg",
  "https://rioluxuryhomes.in/files/properties_images/The_Hills_Estate_view.jpg",
  "https://rioluxuryhomes.in/files/properties_images/The_Hills_Estate_villa_close_up_2.jpg",
  "https://rioluxuryhomes.in/files/properties_images/The_Hills_Estate_Close_up.jpg",
  "https://rioluxuryhomes.in/files/properties_images/The_Hills_Estate_living.jpg",

  // The Village
  "https://rioluxuryhomes.in/files/properties_images/The_Village_Overview.jpg",
  "https://rioluxuryhomes.in/files/properties_images/The_Village_villa_entrance_view.jpg",
  "https://rioluxuryhomes.in/files/properties_images/The_Village_Vertical.jpg",
  "https://rioluxuryhomes.in/files/properties_images/1_The_Village_Villa_ outdoor.jpg",
  "https://rioluxuryhomes.in/files/properties_images/2_The_Village_Villa_ outdoor.jpg",
  "https://rioluxuryhomes.in/files/properties_images/3_The_Village_Villa_ outdoor.jpg",
  "https://rioluxuryhomes.in/files/properties_images/4_The_Village_Villa_outdoor.jpg",
  "https://rioluxuryhomes.in/files/properties_images/5_The_Village_Villa_outdoor.jpg",
  "https://rioluxuryhomes.in/files/properties_images/6_The_Village_Villa_outdoor.jpg",
  "https://rioluxuryhomes.in/files/properties_images/7_The_Village_Villa_outdoor.jpg",
  "https://rioluxuryhomes.in/files/properties_images/8_The_Village_Living.jpg",
  "https://rioluxuryhomes.in/files/properties_images/9_The_Village_Bathroom.jpg",
  "https://rioluxuryhomes.in/files/properties_images/10_The_Village_Bedroom.jpg",

  // Stone Wall
  "https://rioluxuryhomes.in/files/properties_images/9-Stone-Wall-scaled.jpg",
  "https://rioluxuryhomes.in/files/properties_images/Stone-Wall-scaled.jpg",

  // Casa Brilhante
  "https://rioluxuryhomes.in/files/properties_images/casa_b-aerial.jpg",
  "https://rioluxuryhomes.in/files/properties_images/casa_b-pool_deck.jpg",
  "https://rioluxuryhomes.in/files/properties_images/casa-brilhante-villa-c-facade-1200x1000-1.webp",
  "https://rioluxuryhomes.in/files/properties_images/casa_c-doors.jpg",
  "https://rioluxuryhomes.in/files/properties_images/Casa-Brilhante-Poolside.jpg",
  "https://rioluxuryhomes.in/files/properties_images/Casa-Brilhante-Foyer.jpg",
  "https://rioluxuryhomes.in/files/properties_images/Casa-Brilhante-Balcony.jpg",
  "https://rioluxuryhomes.in/files/properties_images/Casa-Brilhante-Bedroom.jpg",

  // Rumah Hutan
  "https://rioluxuryhomes.in/files/properties_images/rumah-hutan-gazebo-2000x15000-1.webp",
  "https://rioluxuryhomes.in/files/properties_images/rumah-hutan-facade-4-2000x1000-1.webp",
  "https://rioluxuryhomes.in/files/properties_images/rumah-aerial.jpg",
  "https://rioluxuryhomes.in/files/properties_images/rumah_1-living_room.jpg",
  "https://rioluxuryhomes.in/files/properties_images/rumah_1-pool_deck.jpg",
  "https://rioluxuryhomes.in/files/properties_images/rumah-hutan-master-bedroom-2000x1000-1.webp",
  "https://rioluxuryhomes.in/files/properties_images/rumah-kitchen.jpg",

  // RIO Estado
  "https://rioluxuryhomes.in/files/properties_images/rio-estado-cover.webp",
  "https://rioluxuryhomes.in/files/properties_images/Dining.jpg",
  "https://rioluxuryhomes.in/files/properties_images/Villa_3.jpg",
  "https://rioluxuryhomes.in/files/properties_images/Villa_11.jpg",

  // RIO Royale
  "https://rioluxuryhomes.in/files/properties_images/Royale-1-2000x1200-1.jpg",
  "https://rioluxuryhomes.in/files/properties_images/Royale-2-2000x1000-1.jpg",
  "https://rioluxuryhomes.in/files/properties_images/Royale-8-1200-x1000.jpg",
  "https://rioluxuryhomes.in/files/properties_images/Royale-5-750x1000-1.jpg",
  "https://rioluxuryhomes.in/files/properties_images/RIO-Royale-Living-Room.jpg",
  "https://rioluxuryhomes.in/files/properties_images/RIO-Royale-Bathroom.jpg",
  "https://rioluxuryhomes.in/files/properties_images/RIO-Royale-Kitchen.jpg",

  // Black Forest
  "https://rioluxuryhomes.in/files/properties_images/black_forest-exterior_5.jpg",
  "https://rioluxuryhomes.in/files/properties_images/black-forest-rooftop-2000x1000-1.webp",
  "https://rioluxuryhomes.in/files/properties_images/black-forest-exterior-2-1200x1000-1.webp",
  "https://rioluxuryhomes.in/files/properties_images/black_forest-common_area.jpg",

  // RIO Estilo
  "https://rioluxuryhomes.in/files/properties_images/RIO-Estilo-Main-Pool-Deck-1.jpg",
  "https://rioluxuryhomes.in/files/properties_images/RIO-Estilo-Main-Pool-Deck-2.jpg",
  "https://rioluxuryhomes.in/files/properties_images/RIO-Estilo-Tile-2.jpg",
  "https://rioluxuryhomes.in/files/properties_images/RIO-Estilo-Tile-1.jpg",
  "https://rioluxuryhomes.in/files/properties_images/RIO-Estilo-Living-Room.jpg",
  "https://rioluxuryhomes.in/files/properties_images/RIO-Estilo-Dining-Room.jpg",
  "https://rioluxuryhomes.in/files/properties_images/RIO-Estilo-Bathroom.jpg",

  // A Cappella
  "https://rioluxuryhomes.in/files/properties_images/A-Cappella_1-2000x1200-1.jpg",
  "https://rioluxuryhomes.in/files/properties_images/A-Cappella_Living-Room-2.jpg",
  "https://rioluxuryhomes.in/files/properties_images/A-Cappella_Living-Room-1",
  "https://rioluxuryhomes.in/files/properties_images/A-Cappella-4_1200x1000.jpg",
  "https://rioluxuryhomes.in/files/properties_images/A-Cappella-5_750x1000.jpg",

  // 6 Assagao
  "https://rioluxuryhomes.in/files/properties_images/6-Assagaon_1-2000x1200-2.jpg",
  "https://rioluxuryhomes.in/files/properties_images/6-Assagaon_2-2000x1000-1.jpg",
  "https://rioluxuryhomes.in/files/properties_images/6-Assagaon_3-2000x1000-1",
  "https://rioluxuryhomes.in/files/properties_images/6-Assagaon_7-1200x1000-1.jpg",
  "https://rioluxuryhomes.in/files/properties_images/6-Assagaon_4-750x1000-1.jpg",

  // Amanta
  "https://rioluxuryhomes.in/files/properties_images/amanta-4.jpg",
  "https://rioluxuryhomes.in/files/properties_images/amanta-2.jpg",

  // RIO Foresta
  "https://rioluxuryhomes.in/files/properties_images/rio-foresta-main.webp",
  "https://rioluxuryhomes.in/files/properties_images/rio-foresta-brief-cover.webp",
  "https://rioluxuryhomes.in/files/properties_images/rio-foresta-specs.webp",
];

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(path.join(assetsDir, filename));

    protocol
      .get(url, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            console.log(`Downloaded: ${filename}`);
            resolve();
          });
        } else {
          console.error(`Failed to download ${url}: ${response.statusCode}`);
          reject(new Error(`HTTP ${response.statusCode}`));
        }
      })
      .on("error", (err) => {
        console.error(`Error downloading ${url}:`, err.message);
        reject(err);
      });
  });
}

async function downloadAllImages() {
  console.log("Starting image downloads...");
  let successCount = 0;
  let errorCount = 0;

  for (const url of imageUrls) {
    try {
      const filename = path.basename(url);
      await downloadImage(url, filename);
      successCount++;
    } catch (error) {
      errorCount++;
      console.error(`Failed to download ${url}:`, error.message);
    }
  }

  console.log(`\nDownload complete!`);
  console.log(`Successfully downloaded: ${successCount} images`);
  console.log(`Failed downloads: ${errorCount} images`);
}

// Run the download
downloadAllImages().catch(console.error);
