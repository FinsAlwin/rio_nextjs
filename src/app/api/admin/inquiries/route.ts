import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = parseInt(searchParams.get("skip") || "0");

    // Connect to database and fetch real inquiries
    const client = await clientPromise;
    const db = client.db("rio_luxury_homes");

    let inquiries;
    let total;

    if (status) {
      inquiries = await Contact.findByStatus(db, status, { limit, skip });
      total = await Contact.count(db, { status });
    } else {
      inquiries = await Contact.findAll(db, { limit, skip });
      total = await Contact.count(db);
    }

    return NextResponse.json({
      status: "success",
      data: {
        inquiries: inquiries,
        total: total,
        limit: limit,
        skip: skip,
      },
    });
  } catch (error) {
    console.error("Get inquiries error:", error);
    return NextResponse.json(
      {
        status: "failed",
        message: "Failed to fetch inquiries",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Inquiry ID is required",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("rio_luxury_homes");

    const updateData: any = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const result = await Contact.updateById(db, id, updateData);

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Inquiry not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      message: "Inquiry updated successfully",
      data: {
        modifiedCount: result.modifiedCount,
      },
    });
  } catch (error) {
    console.error("Update inquiry error:", error);
    return NextResponse.json(
      {
        status: "failed",
        message: "Failed to update inquiry",
      },
      { status: 500 }
    );
  }
}
