import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider, db } from "./firebase/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert("Please verify your email before logging in.");
        return;
      }

      // ✅ Check if profile is complete
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists() && !userSnap.data().isProfileComplete) {
        navigate("/complete-profile");
      } else {
        navigate("/users");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // ✅ Google Login Function
  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
  
      if (!user.emailVerified) {
        alert("Please verify your email before logging in.");
        return;
      }
  
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
  
      if (!userSnap.exists()) {
        // 🔹 Store user details if they don't exist
        await setDoc(userRef, {
          name: user.displayName || "", // Store name
          email: user.email || "", // Store email
          isProfileComplete: false,
        });
  
        navigate("/complete-profile", { state: { name: user.displayName, email: user.email } });
      } else {
        const userData = userSnap.data();
        if (userData.isProfileComplete) {
          navigate("/users");
        } else {
          navigate("/complete-profile", { state: { name: userData.name, email: userData.email } });
        }
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      alert(error.message);
    }
  };
  
  

  // ✅ Forgot Password Function
  const handleForgotPassword = async () => {
    const emailPrompt = prompt("Enter your email to reset your password:");
    if (!emailPrompt) return; // If user cancels the prompt

    try {
      await sendPasswordResetEmail(auth, emailPrompt);
      alert("Password reset email sent! Check your inbox.");
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
          Login with <FcGoogle className="google-logo" size={20} />
        </span>

        <p>
          <a href="#" onClick={handleForgotPassword}>
            Forgot Password?
          </a>
        </p>

        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </>
  );
};

export default Login;
