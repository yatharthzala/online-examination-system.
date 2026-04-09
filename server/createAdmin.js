require("dotenv").config();
const mongoose = require("mongoose");
const User     = require("./models/User");

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin1234";

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB");

  const exists = await User.findOne({ username: ADMIN_USERNAME });
  if (exists) {
    console.log("⚠️  Admin already exists:", ADMIN_USERNAME);
    process.exit(0);
  }

  await User.create({
    username: ADMIN_USERNAME,
    password: ADMIN_PASSWORD,
    role:     "admin",
  });

  console.log("✅ Admin created!");
  console.log("   Username:", ADMIN_USERNAME);
  console.log("   Password:", ADMIN_PASSWORD);
  process.exit(0);
}

createAdmin().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
