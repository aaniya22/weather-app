function StatItem({ label, value, isLast }) {
  return (
    <div className={`stat ${isLast ? 'stat--last' : ''}`}>
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}

export default StatItem;