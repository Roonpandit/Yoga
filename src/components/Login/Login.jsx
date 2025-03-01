import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Navbar from "../box/Navbar";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/user");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/user");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="login-container">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            type="button"
            className="show-password-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <button onClick={handleLogin}>Login</button>

        <span className="google-login-btn" onClick={handleGoogleLogin}>
        Login with  <FcGoogle className="google-logo" size={20} />
  
</span>


        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </>
  );
};

export default Login;
