function Navbar({ user, onLogout }) {
  return (
    <header className="nav-header">
      <div>
        <h1>Traffic Police System</h1>
        <p>Module-based team project workspace</p>
      </div>

      <div className="nav-actions">
        <span className="nav-user">Signed in: {user?.username}</span>
        <button className="logout-btn" type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
