interface RecentActivity {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface RecentActivitiesProps {
  activities: RecentActivity[];
}

export default function RecentActivities({
  activities,
}: RecentActivitiesProps) {
  return (
    <div className="admin-recent-activities overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-800/80">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">
            Recent Activities
          </h3>
          <span className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
            {activities.length} activities
          </span>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto admin-activities-scroll">
        {activities.length > 0 ? (
          <div className="divide-y divide-gray-700">
            {activities.map((activity, index) => (
              <div
                key={activity._id}
                className="admin-activity-item hover:bg-gray-700/30 transition-colors duration-150"
              >
                <div className="flex items-start">
                  <div className="admin-activity-avatar bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {activity.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="admin-activity-content">
                    <div className="flex items-center justify-between">
                      <p className="admin-activity-name">{activity.name}</p>
                      <p className="admin-activity-time">
                        {new Date(activity.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                    <p className="admin-activity-message">{activity.message}</p>
                    <div className="admin-activity-badge bg-blue-500/20 text-blue-400">
                      Contact Inquiry
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
              No Recent Activities
            </h4>
            <p className="text-sm text-gray-400">
              Activity data will appear here once users start interacting with
              the system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
