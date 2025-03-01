import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import "./Login.css"
import Navbar from '../box/Navbar';
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
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
  <Navbar />

  <div className="login-container">
      <h2>Signup</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
    </>
    
  );
};

export default Signup;
