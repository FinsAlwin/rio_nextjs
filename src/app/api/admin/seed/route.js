import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Admin } from "@/models/Admin";

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("rio_luxury_homes");

    // Check if admin already exists
    const existingAdmin = await Admin.findByUsername(db, "riodadmin");
    if (existingAdmin) {
      return NextResponse.json(
        { message: "Admin user already exists" },
        { status: 400 }
      );
    }

    // Create new admin
    const adminData = {
      username: "riodadmin",
      email: "admin@rioluxuryhomes.in",
      password: "@Alwin143",
      role: "super_admin",
      isActive: true,
    };

    const admin = await Admin.create(adminData);
    await admin.save(db);

    return NextResponse.json(
      {
        message: "Admin user created successfully",
        admin: admin.toJSON(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Seed admin error:", error);
    return NextResponse.json(
      { error: "Failed to create admin user" },
      { status: 500 }
    );
  }
}
