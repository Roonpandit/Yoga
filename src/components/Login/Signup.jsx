import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Navbar from "../box/Navbar";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="login-container">
        <h2>Signup</h2>
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

<div className="password-container">
  <input 
    type={showPassword ? "text" : "password"} 
    placeholder="Confirm Password" 
    onChange={(e) => setConfirmPassword(e.target.value)} 
  />
  <span 
    type="button" 
    className="show-password-btn"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </span>
</div>


        <button onClick={handleSignup}>Signup</button>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </>
  );
};

export default Signup;
