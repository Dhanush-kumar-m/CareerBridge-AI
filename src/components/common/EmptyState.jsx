export default function EmptyState({
  title = "No Data Found",
  message = "There is nothing to display.",
  icon = "📭",
}) {
  return (
    <div className="empty-state">

      <div className="empty-icon">
        {icon}
      </div>

      <h2>
        {title}
      </h2>

      <p>
        {message}
      </p>

    </div>
  );
}