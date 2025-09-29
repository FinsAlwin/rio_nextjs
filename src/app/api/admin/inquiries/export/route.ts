import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "csv";
    const status = searchParams.get("status");

    // Connect to database and fetch all inquiries
    const client = await clientPromise;
    const db = client.db("rio_luxury_homes");

    let inquiries;
    if (status) {
      inquiries = await Contact.findByStatus(db, status, { limit: 10000 });
    } else {
      inquiries = await Contact.findAll(db, { limit: 10000 });
    }

    if (format === "csv") {
      // Generate CSV
      const csvHeaders = [
        "ID",
        "Name",
        "Phone",
        "Email",
        "Investment",
        "Hear About Us",
        "Country Code",
        "Dialing Code",
        "GPS Coordinates",
        "Status",
        "Notes",
        "Source",
        "Created At",
        "Updated At",
      ];

      const csvRows = inquiries.map((inquiry) => [
        inquiry._id?.toString() || "",
        inquiry.name || "",
        inquiry.phone || "",
        inquiry.email || "",
        inquiry.investment || "",
        inquiry.hearAboutUs || "",
        inquiry.countryCode || "",
        inquiry.dialingCode || "",
        inquiry.gps_coordinates || "",
        inquiry.status || "",
        inquiry.notes || "",
        inquiry.source || "",
        inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleString() : "",
        inquiry.updatedAt ? new Date(inquiry.updatedAt).toLocaleString() : "",
      ]);

      const csvContent = [
        csvHeaders.join(","),
        ...csvRows.map((row) => row.map((field) => `"${field}"`).join(",")),
      ].join("\n");

      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="inquiries-${
            new Date().toISOString().split("T")[0]
          }.csv"`,
        },
      });
    }

    if (format === "excel") {
      // For Excel format, we'll return JSON that can be converted to Excel
      // In a real implementation, you might want to use a library like 'xlsx'
      return NextResponse.json({
        status: "success",
        message: "Excel export not implemented yet. Use CSV format.",
        data: {
          inquiries: inquiries,
          total: inquiries.length,
          format: "json",
        },
      });
    }

    // Default JSON response
    return NextResponse.json({
      status: "success",
      data: {
        inquiries: inquiries,
        total: inquiries.length,
        format: "json",
      },
    });
  } catch (error) {
    console.error("Export inquiries error:", error);
    return NextResponse.json(
      {
        status: "failed",
        message: "Failed to export inquiries",
      },
      { status: 500 }
    );
  }
}
