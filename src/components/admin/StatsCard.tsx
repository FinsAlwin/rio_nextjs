interface StatsCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  color,
}: StatsCardProps) {
  return (
    <div className="admin-stats-card hover:bg-gray-800/70 transition-all duration-200 hover:transform hover:scale-105 hover:shadow-xl">
      <div className="admin-stats-card-icon">
        <div
          className={`${color} w-full h-full rounded-xl flex items-center justify-center shadow-lg`}
        >
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
      <div className="admin-stats-card-content">
        <p className="admin-stats-card-title">{title}</p>
        <p className="admin-stats-card-value">{value.toLocaleString()}</p>
      </div>
    </div>
  );
}
