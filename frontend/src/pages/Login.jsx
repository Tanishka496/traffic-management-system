import { useState } from "react";
import { login, register } from "../services/authService";

function Login({ onLoginSuccess }) {
  const [mode, setMode] = useState("login");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (mode === "register" && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      if (mode === "login") {
        const response = await login(username, password);
        onLoginSuccess(response.data.user);
      } else {
        const response = await register(username, password, fullName);
        setSuccess(response.data.message || "Registration successful");
        setMode("login");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (mode === "login" ? "Unable to login" : "Unable to register"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
    setError("");
    setSuccess("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <main className="login-layout">
      <section className="login-card">
        <h2>
          {mode === "login" ? "Traffic System Login" : "Register New Member"}
        </h2>
        <p>
          {mode === "login"
            ? "Sign in to access dashboard and modules."
            : "Create an account for a new team member."}
        </p>

        <form onSubmit={handleSubmit} className="driver-form">
          {mode === "register" ? (
            <div className="field">
              <label htmlFor="full_name">Full Name</label>
              <input
                id="full_name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Member name"
              />
            </div>
          ) : null}

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

          {mode === "register" ? (
            <div className="field">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                id="confirm_password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          ) : null}

          <button className="submit-btn" type="submit" disabled={isLoading}>
            {isLoading
              ? mode === "login"
                ? "Signing in..."
                : "Creating account..."
              : mode === "login"
                ? "Login"
                : "Register"}
          </button>

          {error ? <p className="feedback error">{error}</p> : null}
          {success ? <p className="feedback success">{success}</p> : null}
        </form>

        <button className="mode-switch-btn" type="button" onClick={switchMode}>
          {mode === "login"
            ? "Need an account? Register"
            : "Already have an account? Login"}
        </button>
      </section>
    </main>
  );
}

export default Login;
