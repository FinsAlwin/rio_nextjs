import useSWR from "swr";

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

// Custom hooks for admin data
export function useDashboardStats() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/admin/dashboard",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 30000, // Refresh every 30 seconds
    }
  );

  return {
    stats: data?.stats || null,
    recentActivities: data?.recentActivities || [],
    isLoading,
    isError: error,
    mutate,
  };
}

export function useAdminUsers() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/admin/users",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    users: data?.users || [],
    isLoading,
    isError: error,
    mutate,
  };
}

export function useContacts() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/career-contact",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    contacts: data?.contacts || [],
    isLoading,
    isError: error,
    mutate,
  };
}

export function useProperties() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/get-properties",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    properties: data?.properties || [],
    isLoading,
    isError: error,
    mutate,
  };
}

export function useBlogs() {
  const { data, error, isLoading, mutate } = useSWR("/api/get-blogs", fetcher, {
    revalidateOnFocus: false,
  });

  return {
    blogs: data?.blogs || [],
    isLoading,
    isError: error,
    mutate,
  };
}

// Generic hook for any API endpoint
export function useApiData<T>(endpoint: string, options?: any) {
  const { data, error, isLoading, mutate } = useSWR<T>(endpoint, fetcher, {
    revalidateOnFocus: false,
    ...options,
  });

  return {
    data: data || null,
    isLoading,
    isError: error,
    mutate,
  };
}
