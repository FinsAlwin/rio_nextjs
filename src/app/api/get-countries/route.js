import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Dummy data for countries
    const dummyData = {
      status: "success",
      response_data: {
        countries: [
          {
            country_code: "in",
            dialing_code: "+91",
            country_name: "India (भारत)",
          },
          {
            country_code: "us",
            dialing_code: "+1",
            country_name: "United States",
          },
          {
            country_code: "gb",
            dialing_code: "+44",
            country_name: "United Kingdom",
          },
          {
            country_code: "au",
            dialing_code: "+61",
            country_name: "Australia",
          },
          {
            country_code: "ca",
            dialing_code: "+1",
            country_name: "Canada",
          },
          {
            country_code: "de",
            dialing_code: "+49",
            country_name: "Germany",
          },
          {
            country_code: "fr",
            dialing_code: "+33",
            country_name: "France",
          },
          {
            country_code: "jp",
            dialing_code: "+81",
            country_name: "Japan",
          },
          {
            country_code: "sg",
            dialing_code: "+65",
            country_name: "Singapore",
          },
          {
            country_code: "ae",
            dialing_code: "+971",
            country_name: "United Arab Emirates",
          },
        ],
      },
    };

    return NextResponse.json(dummyData);
  } catch {
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
