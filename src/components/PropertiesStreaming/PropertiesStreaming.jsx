import { Suspense } from "react";
import "./PropertiesStreaming.css";

// Server Component for fetching properties data
async function PropertiesData() {
  // Simulate API call - replace with actual data fetching
  const properties = await fetch('http://localhost:3000/api/get-properties', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache', // Cache for 1 hour
    next: { revalidate: 3600 }
  }).then(res => res.json());

  return (
    <div className="properties-data">
      <h2>Properties Available</h2>
      <p>Total Properties: {properties?.response_data?.properties?.completed?.length || 0}</p>
    </div>
  );
}

// Loading component for properties data
function PropertiesLoading() {
  return (
    <div className="properties-loading">
      <div className="skeleton-line"></div>
      <div className="skeleton-line short"></div>
    </div>
  );
}

// Main component with streaming
export default function PropertiesStreaming() {
  return (
    <div className="properties-streaming">
      <h1>Properties</h1>
      <Suspense fallback={<PropertiesLoading />}>
        <PropertiesData />
      </Suspense>
    </div>
  );
}