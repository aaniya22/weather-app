function SkeletonLoader() {
  return (
    <div className="skeleton">
      <div className="skeleton-city" />
      <div className="skeleton-temp" />
      <div className="skeleton-condition" />
      <div className="divider" />
      <div className="skeleton-stats">
        <div className="skeleton-stat" />
        <div className="skeleton-stat" />
        <div className="skeleton-stat" />
        <div className="skeleton-stat" />
      </div>
    </div>
  );
}

export default SkeletonLoader;