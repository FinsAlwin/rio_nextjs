import React from "react";
import Link from "next/link";
import SkeletonLoader from "./SkeletonLoader";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  investment: string;
  hearAboutUs: string;
  createdAt: string;
  status: "new" | "contacted" | "converted" | "closed";
}

interface RecentInquiriesProps {
  inquiries: Inquiry[];
  loading?: boolean;
}

export default function RecentInquiries({
  inquiries,
  loading = false,
}: RecentInquiriesProps) {
  if (loading) {
    return <SkeletonLoader type="list" count={3} />;
  }

  const recentInquiries = inquiries.slice(0, 5); // Show only 5 most recent

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500";
      case "contacted":
        return "bg-yellow-500";
      case "converted":
        return "bg-green-500";
      case "closed":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return "Today";
    } else if (diffDays === 2) {
      return "Yesterday";
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="admin-recent-inquiries overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-800/80">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Recent Inquiries</h3>
          <Link
            href="/admin/inquiries"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            View All
          </Link>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto admin-activities-scroll">
        {recentInquiries.length > 0 ? (
          <div className="divide-y divide-gray-700">
            {recentInquiries.map((inquiry, index) => (
              <div
                key={inquiry.id}
                className="admin-activity-item hover:bg-gray-700/30 transition-colors duration-150"
              >
                <div className="flex items-start">
                  <div className="admin-activity-avatar bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {inquiry.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="admin-activity-content flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="admin-activity-name">{inquiry.name}</p>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(
                            inquiry.status
                          )}`}
                        >
                          {inquiry.status.charAt(0).toUpperCase() +
                            inquiry.status.slice(1)}
                        </span>
                        <p className="admin-activity-time text-xs text-gray-400">
                          {formatDate(inquiry.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="admin-activity-message text-sm text-gray-300 mb-1">
                      {inquiry.email}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="admin-activity-badge bg-green-500/20 text-green-400 text-xs">
                        {inquiry.investment}
                      </div>
                      <div className="admin-activity-badge bg-blue-500/20 text-blue-400 text-xs">
                        {inquiry.hearAboutUs}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h4 className="text-lg font-medium text-gray-300 mb-2">
              No Recent Inquiries
            </h4>
            <p className="text-sm text-gray-400">
              New inquiries will appear here once customers submit contact
              forms.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
