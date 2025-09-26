import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse request body with error handling
    let body = {};
    try {
      body = await request.json();
    } catch {
      // If no body or invalid JSON, use defaults
      body = {};
    }

    const {
      jobProfile,
      yourName,
      phone,
      email,
      message,
      countryCode,
      dialingCode,
    } = body;

    // Log the career application (in a real app, this would save to database)
    console.log("Career Application Received:", {
      jobProfile,
      yourName,
      phone,
      email,
      message,
      countryCode,
      dialingCode,
      timestamp: new Date().toISOString(),
    });

    // Simulate successful submission
    const response = {
      status: "success",
      message:
        "Your application has been submitted successfully. We will review your application and get back to you soon.",
      response_data: {
        application_id: `APP-${Date.now()}`,
        submitted_at: new Date().toISOString(),
        job_profile: jobProfile,
        applicant_name: yourName,
      },
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to submit application. Please try again later.",
      },
      { status: 500 }
    );
  }
}
