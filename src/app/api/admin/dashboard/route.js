import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    const session = await getServerSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("rio_luxury_homes");

    // Get dashboard statistics
    const [totalAdmins, totalProperties, totalBlogs, totalContacts] =
      await Promise.all([
        db.collection("admins").countDocuments(),
        db.collection("properties").countDocuments(),
        db.collection("blogs").countDocuments(),
        db.collection("contacts").countDocuments(),
      ]);

    // Get recent activities (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentActivities = await db
      .collection("contacts")
      .find({ createdAt: { $gte: sevenDaysAgo } })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    const dashboardData = {
      stats: {
        totalAdmins,
        totalProperties,
        totalBlogs,
        totalContacts,
      },
      recentActivities,
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
