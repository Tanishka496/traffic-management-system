import { useState } from "react";
import { login } from "../services/authService";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await login(username, password);
      onLoginSuccess(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="login-layout">
      <section className="login-card">
        <h2>Traffic System Login</h2>
        <p>Sign in to access dashboard and modules.</p>

        <form onSubmit={handleSubmit} className="driver-form">
          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin123"
              required
            />
          </div>

          <button className="submit-btn" type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Login"}
          </button>

          {error ? <p className="feedback error">{error}</p> : null}
        </form>
      </section>
    </main>
  );
}

export default Login;
