import React from "react";

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

interface InquiryCardProps {
  inquiry: Inquiry;
  isExpanded: boolean;
  onToggle: () => void;
  onStatusChange: (status: string) => void;
  onNotesEdit: () => void;
  editingInquiry: Inquiry | null;
  editNotes: string;
  editStatus: string;
  onEditNotesChange: (notes: string) => void;
  onEditStatusChange: (status: string) => void;
  onSaveNotes: () => void;
  onCancelEdit: () => void;
  formatDate: (date: string) => string;
  getStatusColor: (status: string) => string;
}

export default function InquiryCard({
  inquiry,
  isExpanded,
  onToggle,
  onStatusChange,
  onNotesEdit,
  editingInquiry,
  editNotes,
  editStatus,
  onEditNotesChange,
  onEditStatusChange,
  onSaveNotes,
  onCancelEdit,
  formatDate,
  getStatusColor,
}: InquiryCardProps) {
  return (
    <div
      className={`bg-white/5  rounded-xl overflow-hidden transition-all ${
        isExpanded ? "md:col-span-2 xl:col-span-3 ring-2 ring-blue-500/30" : ""
      }`}
      style={{ padding: "12px" }}
    >
      {/* Card Header - Always Visible */}
      <div
        onClick={onToggle}
        className="p-5 cursor-pointer hover:bg-white/5 transition-colors duration-200"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white mb-2 truncate">
              {inquiry.name}
            </h3>
            <p className="text-sm text-gray-400 truncate mb-1">
              {inquiry.email}
            </p>
            <p className="text-sm text-gray-400">
              {inquiry.dialingCode} {inquiry.phone}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getStatusColor(
                inquiry.status
              )}`}
            >
              {inquiry.status.toUpperCase()}
            </span>
            <button className="text-gray-400 hover:text-white transition-colors p-1.5">
              {isExpanded ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className="mt-4 pt-4 border-t border-gray-700/40 flex flex-wrap gap-2 text-xs"
          style={{ paddingBottom: "12px", paddingTop: "12px" }}
        >
          <span className="bg-gray-700/60 text-gray-300 px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1.5 font-medium border border-gray-600/50">
            <span>💰</span> {inquiry.investment}
          </span>
          <span className="bg-gray-700/60 text-gray-300 px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1.5 font-medium border border-gray-600/50">
            <span>📍</span> {inquiry.source}
          </span>
          <span className="bg-gray-700/60 text-gray-300 px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1.5 font-medium border border-gray-600/50">
            <span>🕐</span> {formatDate(inquiry.createdAt).split(",")[0]}
          </span>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t-2 border-gray-700/80 p-5 bg-gray-900/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4" style={{ padding: "12px" }}>
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                  Contact Information
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">
                    <span className="text-gray-500">Email:</span>{" "}
                    {inquiry.email}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-500">Phone:</span>{" "}
                    {inquiry.dialingCode} {inquiry.phone}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-500">Country:</span>{" "}
                    {inquiry.countryCode.toUpperCase()}
                  </p>
                </div>
              </div>

              <br />

              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                  Investment Details
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">
                    <span className="text-gray-500">Bracket:</span>{" "}
                    {inquiry.investment}
                  </p>
                  {inquiry.investment_time && (
                    <p className="text-gray-300">
                      <span className="text-gray-500">Timeline:</span>{" "}
                      {inquiry.investment_time}
                    </p>
                  )}
                  {inquiry.investment_type && (
                    <p className="text-gray-300">
                      <span className="text-gray-500">Type:</span>{" "}
                      {inquiry.investment_type}
                    </p>
                  )}
                  {inquiry.location_options && (
                    <p className="text-gray-300">
                      <span className="text-gray-500">Locations:</span>{" "}
                      {inquiry.location_options}
                    </p>
                  )}
                </div>
              </div>

              <br />

              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                  Source & Tracking
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">
                    <span className="text-gray-500">Form:</span>{" "}
                    {inquiry.source}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-500">Heard From:</span>{" "}
                    {inquiry.hearAboutUs || "N/A"}
                  </p>
                  {inquiry.gps_coordinates && (
                    <p className="text-gray-300">
                      <span className="text-gray-500">GPS:</span>{" "}
                      {inquiry.gps_coordinates}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4" style={{ padding: "12px" }}>
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                  Status Management
                </h4>
                <div className="flex gap-2 flex-wrap">
                  {["new", "contacted", "converted", "closed"].map((status) => (
                    <button
                      key={status}
                      onClick={() => onStatusChange(status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border-2 ${
                        inquiry.status === status
                          ? getStatusColor(status)
                          : "bg-gray-700/50 text-gray-400 hover:bg-gray-600/50 border-gray-600"
                      }`}
                      style={{ padding: "4px" }}
                    >
                      {status.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <br />
              <div style={{ padding: "12px", paddingTop: "0px" }}>
                <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                  Notes
                </h4>
                {editingInquiry?._id === inquiry._id ? (
                  <div className="space-y-3">
                    <textarea
                      value={editNotes}
                      onChange={(e) => onEditNotesChange(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/50 border-2 border-gray-600 rounded-lg text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="Add notes about this inquiry..."
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={onSaveNotes}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 border-2 border-blue-500"
                        style={{ padding: "8px" }}
                      >
                        Save
                      </button>
                      <button
                        style={{ padding: "8px" }}
                        onClick={onCancelEdit}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-medium rounded-lg transition-colors duration-200 border-2 border-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p
                      className="text-sm text-gray-300 mb-2 bg-gray-800/50 p-3 rounded-lg border border-gray-700/50"
                      style={{ padding: "8px" }}
                    >
                      {inquiry.notes || "No notes added yet."}
                    </p>
                    <button
                      onClick={onNotesEdit}
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
                    >
                      {inquiry.notes ? "✏️ Edit Notes" : "➕ Add Notes"}
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-700/50">
                <p className="text-xs text-gray-500">
                  <span className="font-medium">Created:</span>{" "}
                  {formatDate(inquiry.createdAt)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  <span className="font-medium">Updated:</span>{" "}
                  {formatDate(inquiry.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
