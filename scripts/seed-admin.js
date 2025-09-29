const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

const uri = process.env.AMPLIFY_MONGODB_URI;

async function seedAdmin() {
  if (!uri) {
    console.error("Please set AMPLIFY_MONGODB_URI environment variable");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("rio_luxury_homes");
    const collection = db.collection("admins");

    // Check if admin already exists
    const existingAdmin = await collection.findOne({ username: "riodadmin" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("@Alwin143", 12);

    // Create admin user
    const adminUser = {
      username: "riodadmin",
      email: "admin@rioluxuryhomes.in",
      password: hashedPassword,
      role: "super_admin",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(adminUser);
    console.log("Admin user created successfully:", result.insertedId);
  } catch (error) {
    console.error("Error seeding admin:", error);
  } finally {
    await client.close();
  }
}

seedAdmin();
