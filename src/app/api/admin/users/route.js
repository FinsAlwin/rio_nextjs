import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { Admin } from "@/models/Admin";

export async function GET(request) {
  try {
    const session = await getServerSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("rio_luxury_homes");

    const admins = await Admin.findAll(db);

    // Remove passwords from response
    const adminsWithoutPasswords = admins.map((admin) => {
      const { password, ...adminWithoutPassword } = admin;
      return adminWithoutPassword;
    });

    return NextResponse.json({ admins: adminsWithoutPasswords });
  } catch (error) {
    console.error("Get admins error:", error);
    return NextResponse.json(
      { error: "Failed to fetch admins" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { username, email, password, role } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("rio_luxury_homes");

    // Check if admin already exists
    const existingAdmin = await Admin.findByUsername(db, username);
    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin with this username already exists" },
        { status: 400 }
      );
    }

    const adminData = {
      username,
      email,
      password,
      role: role || "admin",
      isActive: true,
    };

    const admin = await Admin.create(adminData);
    await admin.save(db);

    return NextResponse.json(
      {
        message: "Admin created successfully",
        admin: admin.toJSON(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create admin error:", error);
    return NextResponse.json(
      { error: "Failed to create admin" },
      { status: 500 }
    );
  }
}
