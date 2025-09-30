"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import InquiryCard from "@/components/admin/InquiryCard";

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
  investment_time?: string;
  investment_type?: string;
  location_options?: string;
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
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [editingInquiry, setEditingInquiry] = useState<Inquiry | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [exportLoading, setExportLoading] = useState(false);

  const itemsPerPage = 12;

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
    setExpandedCard(null);
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
        return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case "contacted":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "converted":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      case "closed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
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

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  useEffect(() => {
    fetchInquiries(1, statusFilter);
  }, [statusFilter]);

  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div
      style={{ fontFamily: "Poppins, sans-serif" }}
      data-version="card-layout-v3"
    >
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                Contact Inquiries
              </h1>
              <p className="text-gray-400 text-sm">
                Manage and respond to customer inquiries • {total} total
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-gray-300 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200 border border-gray-600"
                style={{ padding: "12px" }}
              >
                ← Back to Dashboard
              </Link>
              <button
                onClick={() => exportInquiries("csv")}
                disabled={exportLoading}
                className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ padding: "12px" }}
              >
                {exportLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Export CSV
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Filter by Status:
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setStatusFilter("")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    statusFilter === ""
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                  }`}
                  style={{ padding: "8px" }}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter("new")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    statusFilter === "new"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                  }`}
                  style={{ padding: "8px" }}
                >
                  New
                </button>
                <button
                  onClick={() => setStatusFilter("contacted")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    statusFilter === "contacted"
                      ? "bg-yellow-600 text-white"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                  }`}
                  style={{ padding: "8px" }}
                >
                  Contacted
                </button>
                <button
                  onClick={() => setStatusFilter("converted")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    statusFilter === "converted"
                      ? "bg-green-600 text-white"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                  }`}
                  style={{ padding: "8px" }}
                >
                  Converted
                </button>
                <button
                  onClick={() => setStatusFilter("closed")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    statusFilter === "closed"
                      ? "bg-gray-600 text-white"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                  }`}
                  style={{ padding: "8px" }}
                >
                  Closed
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiries Cards */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-12 text-center border border-gray-700/50">
            <svg
              className="w-12 h-12 mx-auto text-gray-600 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-gray-400">No inquiries found</p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
            style={{ marginTop: "12px" }}
          >
            {inquiries.map((inquiry) => (
              <InquiryCard
                key={inquiry._id}
                inquiry={inquiry}
                isExpanded={expandedCard === inquiry._id}
                onToggle={() => toggleCard(inquiry._id)}
                onStatusChange={(status) => handleStatusChange(inquiry, status)}
                onNotesEdit={() => handleNotesEdit(inquiry)}
                editingInquiry={editingInquiry}
                editNotes={editNotes}
                editStatus={editStatus}
                onEditNotesChange={setEditNotes}
                onEditStatusChange={setEditStatus}
                onSaveNotes={handleSaveNotes}
                onCancelEdit={() => setEditingInquiry(null)}
                formatDate={formatDate}
                getStatusColor={getStatusColor}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => fetchInquiries(currentPage - 1, statusFilter)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm bg-gray-700/30 text-gray-300 rounded-lg hover:bg-gray-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-gray-700/50"
            >
              Previous
            </button>

            <div className="flex gap-1.5">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                return (
                  <button
                    key={page}
                    onClick={() => fetchInquiries(page, statusFilter)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 border ${
                      currentPage === page
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-700/30 text-gray-300 hover:bg-gray-600/30 border-gray-700/50"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => fetchInquiries(currentPage + 1, statusFilter)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-sm bg-gray-700/30 text-gray-300 rounded-lg hover:bg-gray-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-gray-700/50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
