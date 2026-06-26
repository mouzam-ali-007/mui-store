import React, { useState } from "react";
import { signUpWithEmail, loginWithEmail } from "./../services/data.service";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (event) => {
    event.preventDefault();
    let data;

    try {
      if (isLogin) {
        data = await loginWithEmail(email, password);

        if (data.user) {
          setMessage("Logged in successfully!");
          sessionStorage.setItem("user", JSON.stringify(data.user));
          navigate("/");
        } else {
          setMessage("Something went wrong.");
        }
      } else {
        data = await signUpWithEmail(email, password);

        if (data.user) {
          setMessage("Sign up successful! Check your email to confirm.");
          navigate("/");
          sessionStorage.setItem("user", JSON.stringify(data.user));
        } else {
          setMessage("Something went wrong.");
        }
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className="auth-screen">
      <div className="auth-card">
        <p className="section-label">Member Access</p>
        <h1>{isLogin ? "Welcome Back" : "Create Account"}</h1>
        <p className="auth-card__copy">
          {isLogin ? "Login to continue your shopping journey." : "Sign up to save your favorites and orders."}
        </p>

        <form className="form-grid" onSubmit={handleAuth}>
          <label className="field">
            <span>Email</span>
            <input
              className="field-control"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              className="field-control"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <button type="submit" className="button button--primary button--full">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <button type="button" className="auth-card__switch" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>

        {message && <p className="form-error">{message}</p>}
      </div>
    </section>
  );
};

export default AuthPage;
