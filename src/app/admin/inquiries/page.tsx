"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

interface Inquiry {
  _id: string;
  name: string;
  phone: string;
  email: string;
  investment: string;
  hearAboutUs: string;
  countryCode: string;
  dialingCode: string;
  gps_coordinates: string;
  status: string;
  notes: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

interface InquiryData {
  inquiries: Inquiry[];
  total: number;
  limit: number;
  skip: number;
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [editingInquiry, setEditingInquiry] = useState<Inquiry | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [exportLoading, setExportLoading] = useState(false);

  const itemsPerPage = 10;

  const fetchInquiries = async (page = 1, status = "") => {
    setLoading(true);
    try {
      const skip = (page - 1) * itemsPerPage;
      const params = new URLSearchParams({
        limit: itemsPerPage.toString(),
        skip: skip.toString(),
      });

      if (status) {
        params.append("status", status);
      }

      const response = await fetch(`/api/admin/inquiries?${params}`);
      const data = await response.json();

      if (data.status === "success") {
        setInquiries(data.data.inquiries);
        setTotal(data.data.total);
        setCurrentPage(page);
      } else {
        toast.error("Failed to fetch inquiries");
      }
    } catch (error) {
      toast.error("Error fetching inquiries");
    } finally {
      setLoading(false);
    }
  };

  const updateInquiry = async (id: string, status?: string, notes?: string) => {
    try {
      const response = await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
          notes,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        toast.success("Inquiry updated successfully");
        setEditingInquiry(null);
        fetchInquiries(currentPage, statusFilter);
      } else {
        toast.error(data.message || "Failed to update inquiry");
      }
    } catch (error) {
      toast.error("Error updating inquiry");
    }
  };

  const handleStatusChange = (inquiry: Inquiry, newStatus: string) => {
    updateInquiry(inquiry._id, newStatus, inquiry.notes);
  };

  const handleNotesEdit = (inquiry: Inquiry) => {
    setEditingInquiry(inquiry);
    setEditNotes(inquiry.notes || "");
    setEditStatus(inquiry.status);
  };

  const handleSaveNotes = () => {
    if (editingInquiry) {
      updateInquiry(editingInquiry._id, editStatus, editNotes);
    }
  };

  const exportInquiries = async (format: string) => {
    setExportLoading(true);
    try {
      const params = new URLSearchParams({ format });
      if (statusFilter) {
        params.append("status", statusFilter);
      }

      const response = await fetch(`/api/admin/inquiries/export?${params}`);

      if (format === "csv") {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `inquiries-${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success("CSV exported successfully");
      } else {
        const data = await response.json();
        if (data.status === "success") {
          toast.success("Export completed");
        } else {
          toast.error("Export failed");
        }
      }
    } catch (error) {
      toast.error("Error exporting inquiries");
    } finally {
      setExportLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "contacted":
        return "bg-yellow-100 text-yellow-800";
      case "converted":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    fetchInquiries(1, statusFilter);
  }, [statusFilter]);

  return (
    <div className="admin-inquiries-container">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Contact Inquiries
            </h1>
            <p className="text-gray-400 text-sm lg:text-base">
              Manage and respond to customer inquiries ({total} total)
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
              ← Back to Dashboard
            </Link>
            <button
              onClick={() => exportInquiries("csv")}
              disabled={exportLoading}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              {exportLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Exporting...
                </>
              ) : (
                <>📊 Export CSV</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Filter by Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiries Table */}
      <div>
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-gray-400">Loading inquiries...</p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400">No inquiries found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Investment
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry._id} className="hover:bg-gray-750">
                      <td className="px-6 py-5">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-white">
                            {inquiry.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            {inquiry.dialingCode} {inquiry.phone}
                          </div>
                          <div className="text-sm text-gray-400">
                            {inquiry.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-300">
                            {inquiry.investment}
                          </div>
                          <div className="text-xs text-gray-500">
                            {inquiry.hearAboutUs}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-300">
                            {inquiry.source}
                          </div>
                          {inquiry.gps_coordinates && (
                            <div className="text-xs text-gray-500">
                              📍 GPS: {inquiry.gps_coordinates}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <select
                          value={inquiry.status}
                          onChange={(e) =>
                            handleStatusChange(inquiry, e.target.value)
                          }
                          className={`text-sm px-3 py-2 rounded-lg font-medium ${getStatusColor(
                            inquiry.status
                          )} border-0 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="converted">Converted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm text-gray-300">
                          {formatDate(inquiry.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <button
                          onClick={() => handleNotesEdit(inquiry)}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-400 bg-blue-400/10 hover:bg-blue-400/20 rounded-lg transition-colors duration-200 hover:text-blue-300"
                        >
                          {inquiry.notes ? "📝 Edit Notes" : "📝 Add Notes"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {total > itemsPerPage && (
          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, total)} of {total} inquiries
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => fetchInquiries(currentPage - 1, statusFilter)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-sm text-gray-300 bg-gray-800 rounded-lg">
                Page {currentPage} of {Math.ceil(total / itemsPerPage)}
              </span>
              <button
                onClick={() => fetchInquiries(currentPage + 1, statusFilter)}
                disabled={currentPage >= Math.ceil(total / itemsPerPage)}
                className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Notes Modal */}
      {editingInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-lg mx-4 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6">
              Edit Notes - {editingInquiry.name}
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Status
              </label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Notes
              </label>
              <textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                rows={5}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add notes about this inquiry..."
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSaveNotes}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingInquiry(null)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
