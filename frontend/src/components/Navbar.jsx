function Navbar({ user, onLogout }) {
  const initial = user?.username?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="nav-header">
      <div className="brand-block">
        <p className="eyebrow">Urban Flow Grid</p>
        <h1>Traffic Police Command</h1>
        <p>Real-time monitor and incident control center</p>
      </div>

      <div className="nav-actions">
        <div className="search-wrap">
          <span className="search-icon" aria-hidden="true">
            ⌕
          </span>
          <input
            className="nav-search"
            type="search"
            placeholder="Search vehicle, challan, driver..."
            aria-label="Search records"
          />
        </div>
        <button className="notif-btn" type="button" aria-label="Notifications">
          <span aria-hidden="true">◉</span>
          <em className="notif-dot" />
        </button>
        <span className="avatar-chip" aria-hidden="true">
          {initial}
        </span>
        <span className="nav-user">{user?.username}</span>
        <span className="role-pill">{user?.role || "member"}</span>
        <button className="logout-btn" type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
