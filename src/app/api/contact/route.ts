import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields only
    const { yourName, phone, email, investment, agreeToTerms } = body;

    if (!yourName || !phone || !email || !investment || !agreeToTerms) {
      return NextResponse.json(
        {
          status: "failed",
          message: "All required fields must be filled",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Please enter a valid email address",
        },
        { status: 400 }
      );
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Please enter a valid 10-digit phone number",
        },
        { status: 400 }
      );
    }

    // Create contact inquiry object
    const contactData = {
      name: yourName,
      phone: phone,
      email: email,
      investment: investment,
      hearAboutUs: body.hearAboutUs || "",
      countryCode: body.countryCode || "in",
      dialingCode: body.dialingCode || "+91",
      gps_coordinates: body.gps_coordinates || "",
      agreeToTerms: agreeToTerms,
      status: "new", // new, contacted, converted, closed
      notes: "",
      source: body.source || "contact-form", // Accept source from request or default to "contact-form"
      // Additional fields for invest form (optional)
      investment_time: body.investment_time || "",
      investment_type: body.investment_type || "",
      location_options: body.location_options || "",
    };

    // Save to database
    const client = await clientPromise;
    const db = client.db("rio_luxury_homes");

    const contact = await Contact.create(contactData);
    const result = await contact.save(db);

    console.log("New contact inquiry saved:", result.insertedId);

    return NextResponse.json({
      status: "success",
      message: "Thank you for your inquiry! We will contact you soon.",
      data: {
        inquiryId: result.insertedId.toString(),
        timestamp: contact.createdAt,
      },
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        status: "failed",
        message: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Connect to database and fetch real inquiries
    const client = await clientPromise;
    const db = client.db("rio_luxury_homes");

    const inquiries = await Contact.findAll(db, { limit: 100 });
    const total = await Contact.count(db);

    return NextResponse.json({
      status: "success",
      data: {
        inquiries: inquiries,
        total: total,
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
